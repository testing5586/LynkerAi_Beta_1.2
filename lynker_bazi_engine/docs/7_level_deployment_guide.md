# TimeMatch 7-Level Structure - Deployment Guide

## Current Status

✅ **Code Complete**: All backend and frontend code updated for 7-level structure  
⚠️ **Database Pending**: Supabase schema needs manual update  
📦 **Test Data Ready**: 13 seed users (3001-3013) prepared

---

## Deployment Steps

### Step 1: Update Supabase Schema (REQUIRED FIRST)

**File**: `sql/add_7_level_columns.sql`

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `sql/add_7_level_columns.sql`
4. Click "Run"
5. Verify output shows 3 columns added

**What this does**:
```sql
ALTER TABLE chart_time_layers_v2
ADD COLUMN chinese_shichen VARCHAR(2),  -- 时辰
ADD COLUMN minute INT,                  -- 分钟 (0-59)
ADD COLUMN quarter_15min INT;           -- 刻 (0-3)
```

---

### Step 2: Migrate Existing Users (Optional)

**File**: `scripts/migrate_to_7_layers.py`

Run this to populate new fields for existing users (chart_id 1-2051):

```bash
python scripts/migrate_to_7_layers.py
```

**What this does**:
- Calculates `chinese_shichen` from `hour`
- Copies `point_column` → `minute`
- Calculates `quarter_15min` from `minute // 15`

---

### Step 3: Generate Test Seed Users

**File**: `scripts/generate_test_seeds.py`

Run this to create 13 new test users (3001-3013):

```bash
python scripts/generate_test_seeds.py
```

**Test Users Created**:
| UID | Birth Time | Purpose |
|-----|------------|---------|
| 3001 | 2000-03-20 08:18 | Perfect match with #1 (100%) |
| 3002 | 2000-03-20 08:10 | Same 时辰, diff minute (85%) |
| 3003 | 2000-03-20 08:29 | Same hour, diff quarter (80%) |
| 3004 | 2000-03-20 07:59 | Diff 时辰 (卯→辰) (45%) |
| 3005 | 2000-03-20 09:00 | Diff 时辰 (辰→巳) (45%) |
| 3006 | 2000-03-20 08:45 | Same hour, diff quarter (80%) |
| 3007 | 2000-03-21 08:18 | Diff day (30%) |
| 3008 | 2000-03-19 08:18 | Diff day (30%) |
| 3009 | 1999-03-20 08:18 | Diff year (5%) |
| 3010 | 2001-03-20 08:18 | Diff year (5%) |
| 3011 | 2000-04-20 08:18 | Diff month (15%) |
| 3012 | 2000-03-20 23:50 | Diff 时辰 (子时) (45%) |
| 3013 | 2000-03-21 00:10 | Diff day + 子时 (30%) |

---

### Step 4: Test Frontend

1. Refresh TimeMatch page: `http://localhost:5000/samelife`
2. Check filter chips: Should show **7 levels**:
   - ✅ 同年
   - ✅ 同月
   - ✅ 同日
   - ✅ 同时辰 (NEW)
   - ✅ 同小时
   - ✅ 同刻
   - ✅ 同分

3. Search for matches at different precision levels
4. Verify scores match expected percentages

---

## Expected Matching Results

**Base User #1**: 2000-03-20 08:18 (辰时)

### 100% Matches (7/7 layers)
- User #3001: 2000-03-20 08:18

### High Matches (5-6/7 layers)
- User #3002: 2000-03-20 08:10 → 85% (同时辰, diff minute)
- User #3003: 2000-03-20 08:29 → 80% (同小时, diff quarter)
- User #3006: 2000-03-20 08:45 → 80% (同小时, diff quarter)

### Medium Matches (3-4/7 layers)
- User #3004: 2000-03-20 07:59 → 45% (diff 时辰)
- User #3005: 2000-03-20 09:00 → 45% (diff 时辰)
- User #3007: 2000-03-21 08:18 → 30% (diff day)
- User #3008: 2000-03-19 08:18 → 30% (diff day)
- User #3012: 2000-03-20 23:50 → 45% (same day, diff 时辰-子时)
- User #3013: 2000-03-21 00:10 → 30% (diff day)

### Low Matches (1-2/7 layers)
- User #3009: 1999-03-20 08:18 → 5% (diff year)
- User #3010: 2001-03-20 08:18 → 5% (diff year)
- User #3011: 2000-04-20 08:18 → 15% (diff month)

---

## Troubleshooting

### Error: "Could not find column 'chinese_shichen'"
**Solution**: You haven't run Step 1 (SQL schema update) yet

### Error: Migration script says "0 updated"
**Solution**: Either no users exist, or they already have the new fields

### Frontend still shows old labels (同点柱, 同刻柱)
**Solution**: Hard refresh browser (Ctrl+Shift+R or Ctrl+F5)

---

## File Checklist

- ✅ `sql/add_7_level_columns.sql` - Database schema update
- ✅ `scripts/migrate_to_7_layers.py` - Migrate existing users
- ✅ `scripts/generate_test_seeds.py` - Generate test users
- ✅ `engines/match_score_engine.py` - 7-level scoring
- ✅ `engines/time_match_agent.py` - 7-level filtering
- ✅ `static/js/samelife.js` - 7-level UI

---

## Test Scenarios

After deployment, test these scenarios:

1. **Perfect Match Test**: Search from User #1, should find #3001 at 100%
2. **时辰 Test**: Search "同时辰" mode, should find users 3001,3002 (both 辰时)
3. **小时 Test**: Search "同小时" mode, should find users 3001-3003,3006 (all 08:xx)
4. **Precision Test**: Try each filter level, verify correct users appear
5. **Privacy Test**: Verify `frequency_code` NOT displayed anywhere in UI

---

**Last Updated**: 2025-11-23 20:38
