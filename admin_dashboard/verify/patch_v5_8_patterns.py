# -*- coding: utf-8 -*-
"""
v5.8 格局与风险增强（含迁移宫优先）
- 格局标签：紫府朝垣 / 武杀同宫 / 日月并明（基础版规则）
- 迁移宫重点：遇 忌/陷/劫空/铃羊火陀 等 → 风险因子上提
"""

from copy import deepcopy

def _star_names(palace_dict, group):
    items = palace_dict.get(group, [])
    if isinstance(items, list):
        return [x.get('名','') for x in items]
    return []

def _has(stars, *keys):
    s = set(stars)
    return all(k in s for k in keys)

def _has_any(stars, *keys):
    s = set(stars)
    return any(k in s for k in keys)

def detect_patterns(star_map):
    tags = []

    # —— 紫府朝垣（简化判定：同宫同时见「紫微」「天府」）——
    for pal, pd in (star_map or {}).items():
        main_names = _star_names(pd, '主星')
        if _has(main_names, '紫微', '天府'):
            tags.append('紫府朝垣')
            break

    # —— 武杀同宫（同宫见「武曲」「七殺/七杀」）——
    for pal, pd in (star_map or {}).items():
        main_names = _star_names(pd, '主星')
        if ('武曲' in main_names) and (_has_any(main_names, '七殺','七杀')):
            tags.append('武杀同宫')
            break

    # —— 日月并明（同宫见「太陽/太阳」「太陰/太阴」）——
    for pal, pd in (star_map or {}).items():
        main = set(_star_names(pd, '主星'))
        if _has_any(main, '太陽','太阳') and _has_any(main, '太陰','太阴'):
            tags.append('日月并明')
            break

    return list(dict.fromkeys(tags))  # 去重保序

# —— 迁移宫风险因子（权重×2）——
_BAD_STATUS = {'忌','陷','不'}  # "不"=不利
_BAD_MINOR = {'地劫','地空','旬空','大耗','铃星','擎羊','火星','陀羅','陀罗'}

def build_risk_profile(star_map):
    risk = {'overall': 0, 'factors': []}
    def push(score, reason):
        risk['overall'] += score
        risk['factors'].append({'score': score, 'reason': reason})

    # 迁移宫重点检查
    mig = star_map.get('迁移宫', {}) or star_map.get('遷移宮', {}) or {}
    for grp in ('主星','辅星','小星'):
        items = mig.get(grp, [])
        if not isinstance(items, list):
            continue
        for it in items:
            nm = it.get('名','')
            st = it.get('状态','')
            tags = set(it.get('标签', []) or [])
            # 状态不良
            if st in _BAD_STATUS or (tags & _BAD_STATUS):
                push(2, f'迁移宫 {nm} 状态{st or list(tags & _BAD_STATUS)}')
            # 凶星
            if nm in _BAD_MINOR:
                push(2, f'迁移宫 凶星 {nm}')

    # 其他宫位（基础版，轻权重）
    for pal, pd in (star_map or {}).items():
        if pal in ('迁移宫','遷移宮'):
            continue
        for grp in ('主星','辅星','小星'):
            items = pd.get(grp, [])
            if not isinstance(items, list):
                continue
            for it in items:
                nm = it.get('名','')
                st = it.get('状态','')
                if st in _BAD_STATUS:
                    push(1, f'{pal} {nm} 状态{st}')

    return risk

def patch_patterns_and_risk(base_result):
    base_result = deepcopy(base_result)
    sm = base_result.get('star_map', {})
    # 格局标签
    tags = base_result.get('tags', []) or []
    tags_ext = detect_patterns(sm)
    base_result['tags'] = list(dict.fromkeys(tags + tags_ext))

    # 风险（强调迁移宫）
    base_result['risk'] = build_risk_profile(sm)
    return base_result
