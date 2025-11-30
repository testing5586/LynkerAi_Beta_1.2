"""
Recalculate all match scores for 7-level structure
Clears old scores and recomputes with new scoring logic
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from supabase_client import get_supabase_client
from engines.match_score_engine import calculate_match_score

def recalculate_all_scores():
    """Recalculate match scores for all user pairs"""
    client = get_supabase_client()
    
    print("=" * 70)
    print("🔄 Recalculating Match Scores with 7-Level Structure")
    print("=" * 70)
    
    # Step 1: Delete all existing time match scores
    print("\n📝 Step 1: Clearing old time match scores...")
    try:
        res = client.table("match_scores").delete().eq("engine_type", "time").execute()
        print(f"✅ Old scores cleared")
    except Exception as e:
        print(f"⚠️  Could not clear old scores: {e}")
        print("   Continuing anyway...")
    
    # Step 2: Get all users
    print("\n📝 Step 2: Fetching all users...")
    res = client.table("chart_time_layers_v2").select("chart_id").execute()
    chart_ids = [r["chart_id"] for r in res.data] if res.data else []
    print(f"✅ Found {len(chart_ids)} users")
    
    # Step 3: Recalculate scores for base user #1 against all others
    base_id = 1
    print(f"\n📝 Step 3: Calculating scores for user #{base_id}...")
    
    calculated = 0
    for target_id in chart_ids:
        if target_id == base_id:
            continue
            
        try:
            # Calculate score using new 7-level engine
            score_result = calculate_match_score(base_id, target_id, engine='time')
            
            # Save to match_scores table
            from db.match_scores_db import save_match_score
            save_match_score(base_id, target_id, 'time', score_result)
            
            calculated += 1
            if calculated % 10 == 0:
                print(f"   ✅ Processed {calculated} pairs...")
                
        except Exception as e:
            print(f"   ❌ Error calculating {base_id} vs {target_id}: {e}")
    
    print(f"\n✅ Recalculation complete! {calculated} match scores saved")
    print("=" * 70)

if __name__ == "__main__":
    recalculate_all_scores()
