"""
Regenerate Seed Users (2001-2051)
- Base: 2000-03-20 08:00 (Matches chart #1)
- #2001: Perfect Match (100%)
- #2002: High Frequency (80%)
- #2003-2051: Randomized with gradient
"""
from supabase_client import get_supabase_client
import random

BASE = {
    "year": 2000,
    "month": 3,
    "day": 20,
    "hour": 8,
    "point_column": 0,   # Minute
    "ke_column": 0,
    "fen_column": 0,
    "micro_fen_column": 0,
}

def build_time_code(rec):
    return (
        f"{rec['year']:04d}"
        f"{rec['month']:02d}"
        f"{rec['day']:02d}"
        f"{rec['hour']:02d}"
        f"{rec['point_column']:02d}"
        f"{rec['ke_column']:02d}"
        f"{rec['fen_column']:02d}"
        f"{rec['micro_fen_column']:02d}"
    )

def regenerate_seeds():
    client = get_supabase_client()
    print("=" * 70)
    print("🛠️  Regenerating 51 Seed Users (2001-2051)")
    print("=" * 70)

    updated = 0
    for cid in range(2001, 2052):
        # 1. Determine Target Data
        if cid == 2001:
            # Perfect Match (100%)
            rec = {**BASE}
        elif cid == 2002:
            # High Frequency (80%) - Differs at fen
            rec = {**BASE, "fen_column": 3}
        else:
            # Randomize others to create gradient
            rand_val = random.random()
            if rand_val < 0.1:
                # 10% match Year only (~5%)
                rec = {**BASE}
                rec["month"] = random.randint(1, 12)
                while rec["month"] == BASE["month"]: rec["month"] = random.randint(1, 12)
                rec["day"] = random.randint(1, 28)
                rec["hour"] = random.randint(0, 23)
                rec["point_column"] = random.randint(0, 59)
            elif rand_val < 0.2:
                # 10% match Year+Month (~15%)
                rec = {**BASE}
                rec["day"] = random.randint(1, 28)
                while rec["day"] == BASE["day"]: rec["day"] = random.randint(1, 28)
                rec["hour"] = random.randint(0, 23)
                rec["point_column"] = random.randint(0, 59)
            elif rand_val < 0.3:
                # 10% match Year+Month+Day (~30%)
                rec = {**BASE}
                rec["hour"] = random.randint(0, 23)
                while rec["hour"] == BASE["hour"]: rec["hour"] = random.randint(0, 23)
                rec["point_column"] = random.randint(0, 59)
            elif rand_val < 0.4:
                # 10% match Year+Month+Day+Hour (~50%)
                rec = {**BASE}
                rec["point_column"] = random.randint(0, 59)
                while rec["point_column"] == BASE["point_column"]: rec["point_column"] = random.randint(0, 59)
            else:
                # 60% Completely Random (0%)
                rec = {
                    "year": random.randint(1980, 2020),
                    "month": random.randint(1, 12),
                    "day": random.randint(1, 28),
                    "hour": random.randint(0, 23),
                    "point_column": random.randint(0, 59),
                    "ke_column": random.randint(0, 9),
                    "fen_column": random.randint(0, 9),
                    "micro_fen_column": random.randint(0, 9),
                }

        # 2. Build Code
        rec["time_layer_code"] = build_time_code(rec)
        rec["user_id"] = None

        # 3. Update DB
        # Check if exists first to decide insert vs update (though we know they exist from previous steps)
        # We'll just use upsert logic or update
        res = client.table("chart_time_layers_v2").select("chart_id").eq("chart_id", cid).execute()
        if res.data:
            client.table("chart_time_layers_v2").update(rec).eq("chart_id", cid).execute()
        else:
            rec["chart_id"] = cid
            client.table("chart_time_layers_v2").insert(rec).execute()
        
        updated += 1
        if cid % 10 == 0:
            print(f"✅ Processed up to {cid}")

    print("-" * 70)
    print(f"🔚 Complete: Regenerated {updated} users.")
    print("=" * 70)

if __name__ == "__main__":
    regenerate_seeds()
