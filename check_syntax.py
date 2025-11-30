
try:
    from lynker_bazi_engine.routes.birth_input_routes_v4 import birth_input_bp
    print("Syntax check passed for birth_input_routes_v4.py")
except Exception as e:
    print(f"Syntax error in birth_input_routes_v4.py: {e}")
