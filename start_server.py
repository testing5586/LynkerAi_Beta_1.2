#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Simple server starter to keep Flask running"""

import sys
import os

# Change to the correct directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Import and run the app
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'admin_dashboard'))

from admin_dashboard.app import app

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Starting LynkerAI Server")
    print("=" * 60)
    print("Server will be available at:")
    print("  - http://localhost:5000")
    print("  - http://127.0.0.1:5000")
    print("\nPress CTRL+C to stop the server")
    print("=" * 60)
    print()
    
    try:
        # Run Flask directly (blocking call)
        app.run(
            host='0.0.0.0', 
            port=5000, 
            debug=False, 
            use_reloader=False, 
            threaded=True
        )
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
    except Exception as e:
        print(f"\n\n❌ Server error: {e}")
        import traceback
        traceback.print_exc()
        input("\nPress Enter to exit...")
