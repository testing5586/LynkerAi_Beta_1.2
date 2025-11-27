# -*- coding: utf-8 -*-
"""
NewChat 多话题持久化聊天系统
迁移至 Supabase - 不再使用 Neon PostgreSQL
"""
from flask import Blueprint, request, jsonify, render_template, Response, stream_with_context
from flask_login import login_required, current_user
import os
from datetime import datetime
import json
from openai import OpenAI
from supabase import create_client

newchat_bp = Blueprint('newchat', __name__, url_prefix='/newchat')

# OpenAI 客户端初始化
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Supabase 客户端
def get_supabase_client():
    """获取 Supabase 客户端"""
    url = os.environ.get('SUPABASE_URL')
    key = os.environ.get('SUPABASE_KEY')
    
    if not url or not key:
        raise ValueError("❌ 缺少 SUPABASE_URL 或 SUPABASE_KEY 环境变量")
    
    return create_client(url, key)

# ==================== 页面路由 ====================
@newchat_bp.route('/', methods=['GET'])
@login_required
def newchat_page():
    """NewChat 主页面"""
    # 准备用户数据传递到前端
    user_type = current_user.user_type or 'normal_user'  # 默认为普通用户
    user_data = {
        'nickname': current_user.first_name or current_user.email.split('@')[0],
        'email': current_user.email,
        'user_type': user_type,
        'created_at': current_user.created_at.isoformat() if current_user.created_at else None
    }
    return render_template('newchat.html', user_data=user_data)

# ==================== 话题管理 API ====================
@newchat_bp.route('/api/topics', methods=['GET'])
@login_required
def get_topics():
    """获取当前用户的所有话题列表"""
    try:
        supabase = get_supabase_client()
        
        response = supabase.table('chat_topics')\
            .select('id, title, topic_type, binding_type, binding_id, created_at, updated_at')\
            .eq('user_id', current_user.id)\
            .order('updated_at', desc=True)\
            .execute()
        
        topics = []
        for row in response.data:
            topics.append({
                'id': row['id'],
                'title': row['title'],
                'topic_type': row['topic_type'],
                'binding_type': row.get('binding_type'),
                'binding_id': row.get('binding_id'),
                'created_at': row.get('created_at'),
                'updated_at': row.get('updated_at')
            })
        
        return jsonify({
            'success': True,
            'topics': topics
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@newchat_bp.route('/api/topics', methods=['POST'])
@login_required
def create_topic():
    """创建新话题"""
    try:
        data = request.json
        title = data.get('title', '新对话')
        topic_type = data.get('topic_type', 'general')
        binding_type = data.get('binding_type')
        binding_id = data.get('binding_id')
        
        supabase = get_supabase_client()
        
        response = supabase.table('chat_topics').insert({
            'user_id': current_user.id,
            'title': title,
            'topic_type': topic_type,
            'binding_type': binding_type,
            'binding_id': binding_id
        }).execute()
        
        if response.data and len(response.data) > 0:
            topic = response.data[0]
            return jsonify({
                'success': True,
                'topic': {
                    'id': topic['id'],
                    'title': topic['title'],
                    'topic_type': topic['topic_type'],
                    'binding_type': topic.get('binding_type'),
                    'binding_id': topic.get('binding_id'),
                    'created_at': topic.get('created_at'),
                    'updated_at': topic.get('updated_at')
                }
            })
        
        return jsonify({'success': False, 'error': '创建失败'}), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@newchat_bp.route('/api/topics/<int:topic_id>', methods=['PUT'])
@login_required
def update_topic(topic_id):
    """更新话题（重命名、修改绑定等）"""
    try:
        data = request.json
        title = data.get('title')
        binding_type = data.get('binding_type')
        binding_id = data.get('binding_id')
        
        supabase = get_supabase_client()
        
        # 验证话题所有权
        check_response = supabase.table('chat_topics')\
            .select('user_id')\
            .eq('id', topic_id)\
            .execute()
        
        if not check_response.data or len(check_response.data) == 0:
            return jsonify({'success': False, 'error': '话题不存在'}), 404
        
        if check_response.data[0]['user_id'] != current_user.id:
            return jsonify({'success': False, 'error': '无权限'}), 403
        
        # 构建更新数据
        update_data = {}
        if title is not None:
            update_data['title'] = title
        if binding_type is not None:
            update_data['binding_type'] = binding_type
        if binding_id is not None:
            update_data['binding_id'] = binding_id
        
        # 执行更新
        supabase.table('chat_topics')\
            .update(update_data)\
            .eq('id', topic_id)\
            .execute()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@newchat_bp.route('/api/topics/<int:topic_id>', methods=['DELETE'])
@login_required
def delete_topic(topic_id):
    """删除话题（级联删除所有消息）"""
    try:
        supabase = get_supabase_client()
        
        # 验证话题所有权
        check_response = supabase.table('chat_topics')\
            .select('user_id')\
            .eq('id', topic_id)\
            .execute()
        
        if not check_response.data or len(check_response.data) == 0:
            return jsonify({'success': False, 'error': '话题不存在'}), 404
        
        if check_response.data[0]['user_id'] != current_user.id:
            return jsonify({'success': False, 'error': '无权限'}), 403
        
        # 删除话题（CASCADE 会自动删除相关消息）
        supabase.table('chat_topics')\
            .delete()\
            .eq('id', topic_id)\
            .execute()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ==================== 消息管理 API ====================
@newchat_bp.route('/api/topics/<int:topic_id>/messages', methods=['GET'])
@login_required
def get_messages(topic_id):
    """获取指定话题的所有消息"""
    try:
        supabase = get_supabase_client()
        
        # 验证话题所有权
        check_response = supabase.table('chat_topics')\
            .select('user_id')\
            .eq('id', topic_id)\
            .execute()
        
        if not check_response.data or len(check_response.data) == 0:
            return jsonify({'success': False, 'error': '话题不存在'}), 404
        
        if check_response.data[0]['user_id'] != current_user.id:
            return jsonify({'success': False, 'error': '无权限'}), 403
        
        # 获取消息列表
        messages_response = supabase.table('chat_messages')\
            .select('id, role, content, created_at')\
            .eq('topic_id', topic_id)\
            .order('created_at', desc=False)\
            .execute()
        
        messages = []
        for row in messages_response.data:
            messages.append({
                'id': row['id'],
                'role': row['role'],
                'content': row['content'],
                'created_at': row.get('created_at')
            })
        
        return jsonify({
            'success': True,
            'messages': messages
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@newchat_bp.route('/api/topics/<int:topic_id>/messages', methods=['POST'])
@login_required
def save_message(topic_id):
    """保存消息到指定话题"""
    try:
        data = request.json
        role = data.get('role')
        content = data.get('content')
        
        if not role or not content:
            return jsonify({'success': False, 'error': '缺少必要参数'}), 400
        
        supabase = get_supabase_client()
        
        # 验证话题所有权
        check_response = supabase.table('chat_topics')\
            .select('user_id')\
            .eq('id', topic_id)\
            .execute()
        
        if not check_response.data or len(check_response.data) == 0:
            return jsonify({'success': False, 'error': '话题不存在'}), 404
        
        if check_response.data[0]['user_id'] != current_user.id:
            return jsonify({'success': False, 'error': '无权限'}), 403
        
        # 保存消息
        message_response = supabase.table('chat_messages').insert({
            'topic_id': topic_id,
            'role': role,
            'content': content
        }).execute()
        
        # 更新话题的 updated_at (Supabase 自动触发器会处理)
        supabase.table('chat_topics')\
            .update({'updated_at': datetime.utcnow().isoformat()})\
            .eq('id', topic_id)\
            .execute()
        
        if message_response.data and len(message_response.data) > 0:
            message = message_response.data[0]
            return jsonify({
                'success': True,
                'message': {
                    'id': message['id'],
                    'role': message['role'],
                    'content': message['content'],
                    'created_at': message.get('created_at')
                }
            })
        
        return jsonify({'success': False, 'error': '保存失败'}), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# ==================== AI 对话 API ====================
@newchat_bp.route('/api/topics/<int:topic_id>/chat', methods=['POST'])
@login_required
def chat_with_ai(topic_id):
    """AI 对话（流式输出）"""
    try:
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({'success': False, 'error': '消息不能为空'}), 400
        
        supabase = get_supabase_client()
        
        # 验证话题所有权
        check_response = supabase.table('chat_topics')\
            .select('user_id, binding_type, binding_id')\
            .eq('id', topic_id)\
            .execute()
        
        if not check_response.data or len(check_response.data) == 0:
            return jsonify({'success': False, 'error': '话题不存在'}), 404
        
        topic_data = check_response.data[0]
        if topic_data['user_id'] != current_user.id:
            return jsonify({'success': False, 'error': '无权限'}), 403
        
        binding_type = topic_data.get('binding_type')
        binding_id = topic_data.get('binding_id')
        
        # 获取历史消息作为上下文
        history_response = supabase.table('chat_messages')\
            .select('role, content')\
            .eq('topic_id', topic_id)\
            .order('created_at', desc=False)\
            .limit(20)\
            .execute()
        
        history = [{'role': row['role'], 'content': row['content']} for row in history_response.data]
        
        # 保存用户消息
        supabase.table('chat_messages').insert({
            'topic_id': topic_id,
            'role': 'user',
            'content': user_message
        }).execute()
        
        # 更新话题时间
        supabase.table('chat_topics')\
            .update({'updated_at': datetime.utcnow().isoformat()})\
            .eq('id', topic_id)\
            .execute()
        
        # 构建对话上下文
        messages = [
            {
                "role": "system",
                "content": "你是灵客 AI，一个专业的命理分析助手。你擅长紫微斗数、八字命理分析。请用专业且易懂的语言回答用户问题。"
            }
        ]
        
        # 添加历史对话
        messages.extend(history)
        
        # 添加当前用户消息
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        # 调用 OpenAI API（流式输出）
        def generate():
            try:
                stream = openai_client.chat.completions.create(
                    model="gpt-4o",
                    messages=messages,
                    stream=True,
                    temperature=0.7
                )
                
                full_response = ""
                
                for chunk in stream:
                    if chunk.choices[0].delta.content:
                        content = chunk.choices[0].delta.content
                        full_response += content
                        yield f"data: {json.dumps({'content': content})}\n\n"
                
                # 保存 AI 回复
                supabase = get_supabase_client()
                supabase.table('chat_messages').insert({
                    'topic_id': topic_id,
                    'role': 'assistant',
                    'content': full_response
                }).execute()
                
                yield f"data: {json.dumps({'done': True})}\n\n"
                
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
        
        return Response(
            stream_with_context(generate()),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'X-Accel-Buffering': 'no'
            }
        )
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
