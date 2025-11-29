
import sys
import os

# Add the current directory to sys.path so we can import modules
sys.path.append(os.getcwd())

from engines.time_match_agent import find_time_matches

try:
    print("Attempting to find time matches for chart_id=1, mode='same_fen'...")
    matches = find_time_matches(1, "same_fen")
    print(f"Success! Found {len(matches)} matches.")
except Exception as e:
    print(f"Caught exception: {e}")
    import traceback
    traceback.print_exc()
