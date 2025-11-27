# -*- coding: utf-8 -*-
"""
v5.8 四化增强（行内抓取 + 可选天干推算）
- 从 star_map 的星曜标签里抓取 [生年忌][↑忌] 等行内四化
- （可选）根据出生年天干推算生年四化（留表位按流派填写）
- 与现有 transformations 合并（不覆盖已有非空值）
"""

import re
from copy import deepcopy

# —— 行内四化关键词（繁简+同义）——
_INLINE_KEYS = {
    '禄': ('生年禄', '化禄', '禄', '祿'),
    '权': ('生年权', '化权', '权'),
    '科': ('生年科', '化科', '科'),
    '忌': ('生年忌', '化忌', '忌', '↑忌', '↑化忌'),
}

def _merge_fourhua(base, extra):
    """只填补空值，不覆盖已有非空值"""
    out = deepcopy(base) if base else {'生年四化': {'禄':'','权':'','科':'','忌':''},
                                       '流年四化': {'禄':'','权':'','科':'','忌':''}}
    for sec in ('生年四化', '流年四化'):
        if sec not in out:
            out[sec] = {'禄':'','权':'','科':'','忌':''}
        if sec in extra:
            for k in ('禄','权','科','忌'):
                if not out[sec].get(k):
                    out[sec][k] = extra[sec].get(k,'')
    return out

def extract_inline_fourhua_from_star_map(star_map):
    """
    遍历 12 宫 → 主/辅/小星 → 标签/状态，抓取四化线索：
    - 标签中若含 "生年忌 / 化忌 / ↑忌" 等，即认为该星=某四化
    - 结果写入 "生年四化" 优先，若标签含"流年忌/流年权/…"可写入"流年四化"
    """
    four = {'生年四化': {'禄':'','权':'','科':'','忌':''},
            '流年四化': {'禄':'','权':'','科':'','忌':''}}

    def _maybe_mark(sec, kind, star_name):
        if not four[sec][kind]:
            four[sec][kind] = star_name

    for palace, pdata in (star_map or {}).items():
        for group in ('主星','辅星','小星'):
            items = pdata.get(group, [])
            if not isinstance(items, list):
                continue
            for it in items:
                name = it.get('名') or ''
                # 标签与状态都看一眼
                tags = it.get('标签', []) or []
                status = it.get('状态', '')
                cand = [status] if status else []
                cand.extend(tags)

                # 标注"生年/流年"的优先归属，没写默认"生年"
                text = ' '.join([t for t in cand if isinstance(t, str)])
                text_norm = text.replace('年化', '化')  # 宽容处理
                for kind, keys in _INLINE_KEYS.items():
                    for kw in keys:
                        if kw in text_norm:
                            sec = '生年四化'
                            if '流年' in text_norm:
                                sec = '流年四化'
                            _maybe_mark(sec, kind, name)
                            break
    return four

# —— 可选：按天干推算（请按你的流派填表；默认留空不生效）——
# 示例：仅示例位，务必按你的派系补全后再启用
TIANGAN_FOURHUA = {
    # '甲': {'禄':'廉贞','权':'破军','科':'武曲','忌':'太阳'},
    # '乙': {'禄':'天机','权':'天梁','科':'紫微','忌':'文曲'},
    # …… 请补全 10 天干的四化表 ……
}

def compute_fourhua_by_tiangan(basic_info):
    """
    输入 basic_info，可从中传入：
    - basic_info['生年天干']  或  basic_info['干支年']（首字取天干）
    表内若没配置，返回空四化不改动。
    """
    tg = ''
    for key in ('生年天干','干支年'):
        if key in basic_info and basic_info[key]:
            tg = str(basic_info[key]).strip()[0]
            break
    if tg in TIANGAN_FOURHUA:
        return {'生年四化': TIANGAN_FOURHUA[tg], '流年四化': {'禄':'','权':'','科':'','忌':''}}
    return {'生年四化': {'禄':'','权':'','科':'','忌':''},
            '流年四化': {'禄':'','权':'','科':'','忌':''}}

def patch_transformations(base_result):
    """
    总入口：融合 行内四化 + （可选）天干四化 到 base_result['transformations']
    """
    star_map = base_result.get('star_map', {})
    base_trans = base_result.get('transformations', {})
    # 1) 行内抓取
    inline = extract_inline_fourhua_from_star_map(star_map)
    trans = _merge_fourhua(base_trans, inline)
    # 2) 天干推算（表未填则为空，不会覆盖已有非空）
    auto = compute_fourhua_by_tiangan(base_result.get('basic_info', {}))
    trans = _merge_fourhua(trans, auto)
    base_result['transformations'] = trans
    return base_result
