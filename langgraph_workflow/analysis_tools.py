# langgraph_workflow/analysis_tools.py
# 사주 분석을 위한 도구 모듈

from typing import Dict, List, Optional, Tuple
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
import json

class SajuCalculationTool(BaseTool):
    """사주 기본 계산 도구"""
    
    name: str = "saju_calculation"
    description: str = "사주팔자 기본 계산 및 검증을 위한 도구"
    
    def _run(self, query: str) -> str:
        """사주 계산 실행"""
        # 기본 사주 계산 로직
        return f"사주 계산 결과: {query}"
    
    async def _arun(self, query: str) -> str:
        """비동기 사주 계산 실행"""
        return self._run(query)

class ElementAnalysisTool(BaseTool):
    """오행 분석 도구"""
    
    name: str = "element_analysis"
    description: str = "오행 균형 및 상생상극 관계 분석 도구"
    
    def _run(self, elements: Dict[str, int]) -> str:
        """오행 분석 실행"""
        total = sum(elements.values())
        analysis = {
            "total_elements": total,
            "distribution": {k: f"{v}/{total} ({v/total*100:.1f}%)" for k, v in elements.items()},
            "dominant": max(elements.items(), key=lambda x: x[1])[0],
            "weak": min(elements.items(), key=lambda x: x[1])[0]
        }
        return json.dumps(analysis, ensure_ascii=False, indent=2)
    
    async def _arun(self, elements: Dict[str, int]) -> str:
        return self._run(elements)

class TenGodsAnalysisTool(BaseTool):
    """십신 분석 도구"""
    
    name: str = "ten_gods_analysis"
    description: str = "십신 관계 및 성격 분석 도구"
    
    def _run(self, ten_gods: Dict[str, str]) -> str:
        """십신 분석 실행"""
        
        # 십신 분류
        power_gods = ["정관", "편관", "칠살"]
        wealth_gods = ["정재", "편재"]
        support_gods = ["정인", "편인"]
        companion_gods = ["비견", "겁재"]
        expression_gods = ["식신", "상관"]
        
        analysis = {
            "power_influence": [god for god in ten_gods.values() if god in power_gods],
            "wealth_influence": [god for god in ten_gods.values() if god in wealth_gods],
            "support_influence": [god for god in ten_gods.values() if god in support_gods],
            "companion_influence": [god for god in ten_gods.values() if god in companion_gods],
            "expression_influence": [god for god in ten_gods.values() if god in expression_gods]
        }
        
        return json.dumps(analysis, ensure_ascii=False, indent=2)
    
    async def _arun(self, ten_gods: Dict[str, str]) -> str:
        return self._run(ten_gods)

class LuckAnalysisTool(BaseTool):
    """운세 분석 도구"""
    
    name: str = "luck_analysis"
    description: str = "대운과 세운 분석 도구"
    
    def _run(self, birth_info: Dict, current_year: int) -> str:
        """운세 분석 실행"""
        
        birth_year = int(birth_info['original_time'].split('-')[0])
        current_age = current_year - birth_year + 1
        
        # 대운 계산 (간단한 버전)
        great_luck_start = 3  # 기본 3세 시작
        current_great_luck_period = ((current_age - great_luck_start) // 10) + 1
        
        analysis = {
            "current_age": current_age,
            "great_luck_period": current_great_luck_period,
            "next_great_luck_age": great_luck_start + (current_great_luck_period * 10),
            "important_ages": [
                great_luck_start + (i * 10) for i in range(1, 8)
            ]
        }
        
        return json.dumps(analysis, ensure_ascii=False, indent=2)
    
    async def _arun(self, birth_info: Dict, current_year: int) -> str:
        return self._run(birth_info, current_year)

class ConflictAnalysisTool(BaseTool):
    """형충파해 분석 도구"""
    
    name: str = "conflict_analysis"
    description: str = "형충파해 및 지지 관계 분석 도구"
    
    def _run(self, conflicts: List[Dict]) -> str:
        """형충파해 분석 실행"""
        
        if not conflicts:
            return json.dumps({"message": "형충파해 없음", "conflicts": []}, ensure_ascii=False)
        
        analysis = {
            "total_conflicts": len(conflicts),
            "conflict_types": list(set(c['type'] for c in conflicts)),
            "severity_level": self._calculate_severity(conflicts),
            "affected_areas": self._get_affected_areas(conflicts)
        }
        
        return json.dumps(analysis, ensure_ascii=False, indent=2)
    
    def _calculate_severity(self, conflicts: List[Dict]) -> str:
        """충돌 심각도 계산"""
        if len(conflicts) >= 3:
            return "높음"
        elif len(conflicts) >= 2:
            return "보통"
        else:
            return "낮음"
    
    def _get_affected_areas(self, conflicts: List[Dict]) -> List[str]:
        """영향 받는 영역 분석"""
        areas = []
        
        for conflict in conflicts:
            if conflict['type'] == '沖':
                areas.append("급격한 변화")
            elif conflict['type'] == '刑':
                areas.append("법적 문제")
            elif conflict['type'] == '破':
                areas.append("관계 손상")
            elif conflict['type'] == '害':
                areas.append("숨은 적")
        
        return list(set(areas))
    
    async def _arun(self, conflicts: List[Dict]) -> str:
        return self._run(conflicts)

class YongshinAnalysisTool(BaseTool):
    """용신 분석 도구"""
    
    name: str = "yongshin_analysis"
    description: str = "용신 및 기신 분석 도구"
    
    def _run(self, elements: Dict[str, int], seasonal_balance: Dict, day_strength: str) -> str:
        """용신 분석 실행"""
        
        # 계절별 조후 필요 오행
        seasonal_needs = {
            '春': ['火', '土'],
            '夏': ['水', '金'],
            '秋': ['火', '木'],
            '冬': ['火', '木']
        }
        
        season = seasonal_balance.get('season', '春')
        needed_elements = seasonal_needs.get(season, [])
        
        # 용신 후보 분석
        yongshin_candidates = []
        
        # 조후 기준 용신
        for element in needed_elements:
            count = elements.get(element, 0)
            if count < 2:  # 부족한 경우
                yongshin_candidates.append(f"{element}(조후)")
        
        # 신강/신약 기준 용신
        if day_strength == "신약":
            # 신약이면 비겁, 인성이 용신
            if elements.get('木', 0) < 2:
                yongshin_candidates.append("木(比劫)")
            if elements.get('水', 0) < 2:
                yongshin_candidates.append("水(印星)")
        else:
            # 신강이면 관성, 식상, 재성이 용신
            if elements.get('金', 0) < 2:
                yongshin_candidates.append("金(官星)")
            if elements.get('火', 0) < 2:
                yongshin_candidates.append("火(食傷)")
            if elements.get('土', 0) < 2:
                yongshin_candidates.append("土(財星)")
        
        analysis = {
            "season": season,
            "day_strength": day_strength,
            "yongshin_candidates": yongshin_candidates[:3],  # 상위 3개
            "seasonal_needs": needed_elements,
            "current_elements": elements
        }
        
        return json.dumps(analysis, ensure_ascii=False, indent=2)
    
    async def _arun(self, elements: Dict[str, int], seasonal_balance: Dict, day_strength: str) -> str:
        return self._run(elements, seasonal_balance, day_strength)

class LifeAreaAnalysisTool(BaseTool):
    """생활 영역별 분석 도구"""
    
    name: str = "life_area_analysis"
    description: str = "직업, 재물, 인간관계 등 생활 영역별 분석 도구"
    
    def _run(self, ten_gods: Dict[str, str], elements: Dict[str, int]) -> str:
        """생활 영역별 분석 실행"""
        
        analysis = {
            "career": self._analyze_career(ten_gods, elements),
            "wealth": self._analyze_wealth(ten_gods, elements),
            "relationship": self._analyze_relationship(ten_gods, elements),
            "health": self._analyze_health(elements),
            "study": self._analyze_study(ten_gods, elements)
        }
        
        return json.dumps(analysis, ensure_ascii=False, indent=2)
    
    def _analyze_career(self, ten_gods: Dict[str, str], elements: Dict[str, int]) -> Dict:
        """직업 분석"""
        power_gods = ["정관", "편관", "칠살"]
        has_power = any(god in ten_gods.values() for god in power_gods)
        
        return {
            "leadership_potential": "높음" if has_power else "보통",
            "suitable_fields": self._get_suitable_fields(elements),
            "work_style": "조직" if has_power else "자유업"
        }
    
    def _analyze_wealth(self, ten_gods: Dict[str, str], elements: Dict[str, int]) -> Dict:
        """재물 분석"""
        wealth_gods = ["정재", "편재"]
        has_wealth = any(god in ten_gods.values() for god in wealth_gods)
        
        return {
            "wealth_potential": "높음" if has_wealth else "보통",
            "money_management": "안정적" if "정재" in ten_gods.values() else "투기적",
            "income_source": "정규직" if "정재" in ten_gods.values() else "사업"
        }
    
    def _analyze_relationship(self, ten_gods: Dict[str, str], elements: Dict[str, int]) -> Dict:
        """인간관계 분석"""
        support_gods = ["정인", "편인"]
        has_support = any(god in ten_gods.values() for god in support_gods)
        
        return {
            "social_support": "강함" if has_support else "보통",
            "marriage_timing": "이른 편" if has_support else "늦은 편",
            "family_relationship": "화목" if has_support else "독립적"
        }
    
    def _analyze_health(self, elements: Dict[str, int]) -> Dict:
        """건강 분석"""
        total = sum(elements.values())
        imbalance = max(elements.values()) - min(elements.values())
        
        return {
            "overall_health": "양호" if imbalance <= 2 else "주의",
            "weak_organs": self._get_weak_organs(elements),
            "health_advice": "균형잡힌 생활" if imbalance <= 2 else "스트레스 관리"
        }
    
    def _analyze_study(self, ten_gods: Dict[str, str], elements: Dict[str, int]) -> Dict:
        """학업 분석"""
        study_gods = ["정인", "편인", "식신"]
        has_study = any(god in ten_gods.values() for god in study_gods)
        
        return {
            "learning_ability": "높음" if has_study else "보통",
            "study_style": "체계적" if "정인" in ten_gods.values() else "창의적",
            "academic_field": self._get_academic_field(elements)
        }
    
    def _get_suitable_fields(self, elements: Dict[str, int]) -> List[str]:
        """적합한 직업 분야"""
        dominant = max(elements.items(), key=lambda x: x[1])[0]
        
        field_map = {
            '木': ['교육', '출판', '환경'],
            '火': ['IT', '광고', '연예'],
            '土': ['부동산', '건설', '농업'],
            '金': ['금융', '기계', '의료'],
            '水': ['유통', '운송', '수산업']
        }
        
        return field_map.get(dominant, ['일반'])
    
    def _get_weak_organs(self, elements: Dict[str, int]) -> List[str]:
        """약한 장기"""
        weak_element = min(elements.items(), key=lambda x: x[1])[0]
        
        organ_map = {
            '木': ['간', '담'],
            '火': ['심장', '소장'],
            '土': ['비장', '위'],
            '金': ['폐', '대장'],
            '水': ['신장', '방광']
        }
        
        return organ_map.get(weak_element, [])
    
    def _get_academic_field(self, elements: Dict[str, int]) -> str:
        """학문 분야"""
        dominant = max(elements.items(), key=lambda x: x[1])[0]
        
        field_map = {
            '木': '인문학',
            '火': '이공학',
            '土': '사회과학',
            '金': '의학',
            '水': '상경계열'
        }
        
        return field_map.get(dominant, '종합')
    
    async def _arun(self, ten_gods: Dict[str, str], elements: Dict[str, int]) -> str:
        return self._run(ten_gods, elements)

# 모든 도구를 리스트로 정리
ANALYSIS_TOOLS = [
    SajuCalculationTool(),
    ElementAnalysisTool(),
    TenGodsAnalysisTool(),
    LuckAnalysisTool(),
    ConflictAnalysisTool(),
    YongshinAnalysisTool(),
    LifeAreaAnalysisTool()
]