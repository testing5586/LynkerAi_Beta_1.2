from flask import Flask, render_template, request, jsonify
import os
import sys

# Add the current directory to the path so we can import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__, 
            template_folder='lynker_bazi_engine/templates', 
            static_folder='lynker_bazi_engine/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/birth-input', methods=['POST'])
def birth_input():
    data = request.form
    print("Received birth data:", data)
    
    # Try to import the calculator
    try:
        from lynker_bazi_engine.bazi_calculator import BaziCalculator
        # If successful, we could use it here. 
        # For now, just acknowledge receipt.
        return f"<h1>Received Data</h1><pre>{data}</pre><p>Calculator module found.</p>"
    except ImportError:
        return f"<h1>Received Data</h1><pre>{data}</pre><p>Calculator module NOT found.</p>"
    except Exception as e:
        return f"<h1>Error</h1><p>{str(e)}</p>"

if __name__ == '__main__':
    print("Starting Bazi Server on http://localhost:5001")
    app.run(debug=True, port=5001)
