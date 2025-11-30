
import os

def read_file(path):
    print(f"\n{'='*20} {path} {'='*20}")
    try:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                print(f.read())
        else:
            print(f"File not found: {path}")
    except Exception as e:
        print(f"Error reading {path}: {e}")
    print(f"{'='*50}\n")

base_dir = os.path.dirname(os.path.abspath(__file__))
read_file(os.path.join(base_dir, 'lynker_bazi_engine', 'static', 'js', 'modernmatch.js'))
