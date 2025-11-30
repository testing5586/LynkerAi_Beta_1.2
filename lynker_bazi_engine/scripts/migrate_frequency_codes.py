"""
Migration Script: Upgrade Time Frequency Codes
Upgrade time_layer_code to standard format: YYYYMMDDHHmm... (18 digits)
Ensures all records in chart_time_layers_v2 have the correct frequency code derived from their time columns.
"""

from supabase_client import get_supabase_client

def migrate_frequency_codes():
    client = get_supabase_client()
    
    print("=" * 70)
    print("🚀 MIGRATION: Upgrading Time Frequency Codes")
    print("=" * 70)
    
    # Fetch all records
    # We fetch in batches to be safe, though volume is likely low
    res = client.table("chart_time_layers_v2").select("*").execute()
    records = res.data if res.data else []
    
    print(f"Found {len(records)} records to process.")
    
    updated_count = 0
    
    for rec in records:
        try:
            # Extract fields with defaults
            year = rec.get("year") or 2000
            month = rec.get("month") or 1
            day = rec.get("day") or 1
            hour = rec.get("hour") or 0
            minute = rec.get("point_column") or 0  # Treat point_column as minute
            ke = rec.get("ke_column") or 0
            fen = rec.get("fen_column") or 0
            micro = rec.get("micro_fen_column") or 0
            
            # Construct 18-digit code
            # YYYY MM DD HH mm ke fen micro
            new_code = (
                f"{year:04d}"
                f"{month:02d}"
                f"{day:02d}"
                f"{hour:02d}"
                f"{minute:02d}"
                f"{ke:02d}"
                f"{fen:02d}"
                f"{micro:02d}"
            )
            
            # Update if different
            if rec.get("time_layer_code") != new_code:
                client.table("chart_time_layers_v2")\
                    .update({"time_layer_code": new_code})\
                    .eq("chart_id", rec["chart_id"])\
                    .execute()
                updated_count += 1
                # print(f"  Updated #{rec['chart_id']}: {new_code}")
                
        except Exception as e:
            print(f"  ❌ Error processing #{rec.get('chart_id')}: {e}")
            
    print("-" * 70)
    print(f"✅ Migration Complete. Updated {updated_count} records.")
    print("=" * 70)

if __name__ == "__main__":
    migrate_frequency_codes()
