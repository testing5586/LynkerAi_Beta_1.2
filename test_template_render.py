
"""
Test script to identify the 500 error in bazi_unified.html
"""

import os
import sys

# Add the project root to the path
project_root = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2'
sys.path.insert(0, project_root)

try:
    from flask import Flask, render_template
    from lynker_bazi_engine.routes.birth_input_routes_v4 import bazi_bp
    
    app = Flask(__name__, 
                template_folder=r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates',
                static_folder=r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\static')
    
    app.register_blueprint(bazi_bp, url_prefix='/bazi')
    
    # Try to render the template
    with app.app_context():
        try:
            rendered = render_template('bazi_unified.html')
            print("✓ Template rendered successfully!")
            print(f"Rendered length: {len(rendered)} characters")
        except Exception as e:
            print(f"✗ TEMPLATE ERROR: {type(e).__name__}")
            print(f"Message: {str(e)}")
            import traceback
            traceback.print_exc()

except Exception as e:
    print(f"✗ IMPORT ERROR: {type(e).__name__}")
    print(f"Message: {str(e)}")
    import traceback
    traceback.print_exc()
