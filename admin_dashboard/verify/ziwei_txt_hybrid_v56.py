"""
Ziwei AI v5.6 Hybrid外挂版
支持文墨天机树状格式 + 简化TXT格式双模式
不会影响v5.1主引擎
"""
import re

_PALACES = ["命宮","兄弟宮","夫妻宮","子女宮","財帛宮","疾厄宮","遷移宮",
            "交友宮","官祿宮","田宅宮","福德宮","父母宮",
            "命宫","兄弟宫","夫妻宫","子女宫","财帛宫","疾厄宫","迁移宫",
            "交友宫","官禄宫","田宅宫","福德宫","父母宫",
            "迁移宮","遷移宫"]
_PALACE_MAP = {p.replace("宮","宫"):p.replace("宫","宫") for p in _PALACES}

def _norm_line(s): return re.sub(r"^[\s│├└]+","",s).strip()

def _parse_tree(txt):
    lines = [_norm_line(x) for x in txt.splitlines() if x.strip()]
    data = {}
    i=0
    while i < len(lines):
        L=lines[i]
        m=re.match(r"^([\u4e00-\u9fa5]{2,3})\s*宫?\[?([^\]]*)\]?",L)
        if not m: i+=1; continue
        pal_raw = m.group(1)
        # 如果已经包含"宫"，不再添加
        pal = pal_raw if pal_raw.endswith("宫") else pal_raw+"宫"
        di=m.group(2)
        block=[]
        j=i+1
        while j<len(lines) and not re.match(r"^([\u4e00-\u9fa5]{2,3})\s*宫?",lines[j]):
            block.append(lines[j]); j+=1
        info={"地支":di,"主星":"","辅星":"","小星":"","大限":"","小限":"","流年":""}
        for b in block:
            if "主星" in b: info["主星"]=re.sub(r".*主星\s*[:：]","",b).strip()
            if "輔星" in b or "辅星" in b: info["辅星"]=re.sub(r".*輔星[:：]|.*辅星[:：]","",b).strip()
            if "小星" in b: info["小星"]=re.sub(r".*小星[:：]","",b).strip()
            if "大限" in b: info["大限"]=re.sub(r".*大限[:：]","",b).strip()
            if "小限" in b: info["小限"]=re.sub(r".*小限[:：]","",b).strip()
            if "流年" in b: info["流年"]=re.sub(r".*流年[:：]","",b).strip()
        data[pal]=info
        i=j
    return data

def _parse_simple(txt):
    data={}
    for line in txt.splitlines():
        line=_norm_line(line)
        m=re.match(r"^([\u4e00-\u9fa5]{2,3})\s*宫?\s+(.+)$",line)
        if not m: continue
        pal_raw = m.group(1)
        # 如果已经包含"宫"，不再添加
        pal = pal_raw if pal_raw.endswith("宫") else pal_raw+"宫"
        rest=m.group(2)
        data[pal]={"地支":"","主星":rest.strip(),"辅星":"","小星":"","大限":"","小限":"","流年":""}
    return data

def _parse_fourhua(txt):
    pat=r"[禄祿权科忌]\s*(?:[:：→])\s*([^\s\|｜,，;；]+)"
    segs=re.findall(pat,txt)
    keys=re.findall(r"(禄|祿|权|科|忌)",txt)
    res={"禄":"","权":"","科":"","忌":""}
    for k,v in zip(keys,segs):
        k="禄" if k in ["祿"] else k
        res[k]=v
    return {"生年四化":res,"流年四化":res}

def parse_wenmo_txt_v56(txt):
    if "│" in txt or "主星" in txt:
        star_map=_parse_tree(txt)
    else:
        star_map=_parse_simple(txt)
    trans=_parse_fourhua(txt)
    return {"meta":{"version":"v5.6"},"star_map":star_map,"transformations":trans}
