
import httpx
import inspect

print(f"httpx version: {httpx.__version__}")
try:
    sig = inspect.signature(httpx.Client)
    print(f"Client signature: {sig}")
except Exception as e:
    print(f"Could not get signature: {e}")

try:
    client = httpx.Client(proxy="http://test")
    print("Successfully created Client with proxy arg")
except Exception as e:
    print(f"Failed to create Client with proxy arg: {e}")

try:
    client = httpx.Client(proxies="http://test")
    print("Successfully created Client with proxies arg")
except Exception as e:
    print(f"Failed to create Client with proxies arg: {e}")
