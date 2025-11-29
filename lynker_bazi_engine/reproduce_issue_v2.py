
import sys
import os

# Add the current directory to sys.path so we can import modules
sys.path.append(os.getcwd())

from engines.time_match_agent import find_time_matches, build_criteria_text

def test(chart_id, mode):
    print(f"Testing chart_id={chart_id}, mode='{mode}'...")
    try:
        matches = find_time_matches(chart_id, mode)
        print(f"Matches found: {len(matches)}")
        text = build_criteria_text(mode)
        print(f"Criteria text: {text}")
        print("Success!")
    except Exception as e:
        print(f"FAILED with error: {e}")
        import traceback
        traceback.print_exc()
    print("-" * 20)

if __name__ == "__main__":
    # Test case 1: None chart_id (missing param)
    test(None, "same_hour")
    
    # Test case 2: Non-existent chart_id
    test(999999, "same_hour")
    
    # Test case 3: Invalid mode
    test(1, "invalid_mode")
