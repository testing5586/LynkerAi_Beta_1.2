import sys
import os
from flask import Flask

# Add admin_dashboard to sys.path so imports within app.py work
sys.path.append(os.path.join(os.getcwd(), 'admin_dashboard'))
sys.path.append(os.getcwd())

# Set dummy env var to bypass check
os.environ['MASTER_VAULT_KEY'] = 'dummy_key_for_verification'

try:
    from admin_dashboard.app import app
    print("Successfully imported app from admin_dashboard.app")
except ImportError as e:
    print(f"Failed to import app: {e}")
    sys.exit(1)

print("\nRegistered Routes:")
for rule in app.url_map.iter_rules():
    if rule.rule.startswith('/bazi'):
        print(f"{rule.endpoint}: {rule.rule}")

print("\nVerification Complete.")
