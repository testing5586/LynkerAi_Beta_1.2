"""
BirthEngine - 排盘总控器
负责协调三套命盘的生成：TimeMatchAgent, BaziMatchAgent, ZiweiMatchAgent
"""

from ..normalizer import normalize_birth_data
from .time_engine.time_engine import TimeEngine
from .bazi_engine.bazi_engine import BaziEngine
from .ziwei_engine.ziwei_wrapper import ZiweiEngine


class BirthEngine:
    def __init__(self):
        self.time_engine = TimeEngine()
        self.bazi_engine = BaziEngine()
        self.ziwei_engine = ZiweiEngine()

    def generate_all(self, date, time, gender, location):
        """
        生成所有命盘数据
        Args:
            date: "YYYY-MM-DD"
            time: "HH:MM"
            gender: "male" or "female"
            location: location key (e.g. "beijing")
        """
        # 1. Normalize Data
        form_data = {
            "birth_date": date,
            "birth_time": time,
            "gender": gender,
            "location": location,
            "calendar_type": "solar", # Default
            "use_true_solar_time": True # Default
        }
        birth_data = normalize_birth_data(form_data)

        # 2. Generate Charts
        return {
            "birth_data": birth_data,
            "modern": self.time_engine.generate(birth_data),
            "bazi": self.bazi_engine.generate(birth_data),
            "ziwei": self.ziwei_engine.generate(birth_data)
        }

