from flask import Flask, jsonify
import os
import sys

# 添加父目录
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

app = Flask(__name__)

@app.route('/test')
def test():
    return jsonify({'status': 'ok', 'message': 'Flask is working!'})

if __name__ == '__main__':
    print("测试Flask基本功能...")
    print("访问 http://localhost:8888/test")
    app.run(host='127.0.0.1', port=8888, debug=False, use_reloader=False)
