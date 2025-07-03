# saju_analyzer/core.py
# 사주 분석에 필요한 핵심 데이터 계산 모듈

from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime
import json

@dataclass
class SajuData:
    """사주 기본 데이터 구조"""
    year_pillar: str
    month_pillar: str
    day_pillar: str
    hour_pillar: str
    birth_info: Dict
    elements: Dict[str, int]
    great_luck: Dict
    
    def to_dict(self) -> Dict:
        return {
            'year_pillar': self.year_pillar,
            'month_pillar': self.month_pillar,
            'day_pillar': self.day_pillar,
            'hour_pillar': self.hour_pillar,
            'birth_info': self.birth_info,
            'elements': self.elements,
            'great_luck': self.great_luck
        }

@dataclass
class ExtendedSajuData:
    """확장된 사주 분석 데이터"""
    basic_data: SajuData
    hidden_stems: Dict[str, List[str]]  # 지지장간
    ten_gods: Dict[str, str]  # 십신
    element_relations: Dict[str, List[str]]  # 오행 생극 관계
    seasonal_balance: Dict[str, any]  # 조후 분석
    conflicts: List[Dict]  # 형충파해
    day_master_strength: str  # 신강/신약
    
    def to_dict(self) -> Dict:
        return {
            'basic_data': self.basic_data.to_dict(),
            'hidden_stems': self.hidden_stems,
            'ten_gods': self.ten_gods,
            'element_relations': self.element_relations,
            'seasonal_balance': self.seasonal_balance,
            'conflicts': self.conflicts,
            'day_master_strength': self.day_master_strength
        }

class SajuAnalyzer:
    """사주 분석 핵심 엔진"""
    
    # 상수 정의
    STEMS = '甲乙丙丁戊己庚辛壬癸'
    BRANCHES = '子丑寅卯辰巳午未申酉戌亥'
    ELEMENTS = {
        '甲':'木','乙':'木','丙':'火','丁':'火','戊':'土',
        '己':'土','庚':'金','辛':'金','壬':'水','癸':'水',
        '子':'水','丑':'土','寅':'木','卯':'木','辰':'土',
        '巳':'火','午':'火','未':'土','申':'金','酉':'金','戌':'土','亥':'水'
    }
    
    # 지지장간 (각 지지 안에 숨어있는 천간들)
    HIDDEN_STEMS = {
        '子': ['癸'],
        '丑': ['己', '癸', '辛'],
        '寅': ['甲', '丙', '戊'],
        '卯': ['乙'],
        '辰': ['戊', '乙', '癸'],
        '巳': ['丙', '庚', '戊'],
        '午': ['丁', '己'],
        '未': ['己', '丁', '乙'],
        '申': ['庚', '壬', '戊'],
        '酉': ['辛'],
        '戌': ['戊', '辛', '丁'],
        '亥': ['壬', '甲']
    }
    
    # 십신 관계 (일간 기준)
    TEN_GODS_MAP = {
        '甲': {'甲':'比肩','乙':'劫財','丙':'食神','丁':'傷官','戊':'偏財','己':'正財','庚':'七殺','辛':'正官','壬':'偏印','癸':'正印'},
        '乙': {'甲':'劫財','乙':'比肩','丙':'傷官','丁':'食神','戊':'正財','己':'偏財','庚':'正官','辛':'七殺','壬':'正印','癸':'偏印'},
        '丙': {'甲':'偏印','乙':'正印','丙':'比肩','丁':'劫財','戊':'食神','己':'傷官','庚':'偏財','辛':'正財','壬':'七殺','癸':'正官'},
        '丁': {'甲':'正印','乙':'偏印','丙':'劫財','丁':'比肩','戊':'傷官','己':'食神','庚':'正財','辛':'偏財','壬':'正官','癸':'七殺'},
        '戊': {'甲':'七殺','乙':'正官','丙':'偏印','丁':'正印','戊':'比肩','己':'劫財','庚':'食神','辛':'傷官','壬':'偏財','癸':'正財'},
        '己': {'甲':'正官','乙':'七殺','丙':'正印','丁':'偏印','戊':'劫財','己':'比肩','庚':'傷官','辛':'食神','壬':'正財','癸':'偏財'},
        '庚': {'甲':'偏財','乙':'正財','丙':'七殺','丁':'正官','戊':'偏印','己':'正印','庚':'比肩','辛':'劫財','壬':'食神','癸':'傷官'},
        '辛': {'甲':'正財','乙':'偏財','丙':'正官','丁':'七殺','戊':'正印','己':'偏印','庚':'劫財','辛':'比肩','壬':'傷官','癸':'食神'},
        '壬': {'甲':'食神','乙':'傷官','丙':'偏財','丁':'正財','戊':'七殺','己':'正官','庚':'偏印','辛':'正印','壬':'比肩','癸':'劫財'},
        '癸': {'甲':'傷官','乙':'食神','丙':'正財','丁':'偏財','戊':'正官','己':'七殺','庚':'正印','辛':'偏印','壬':'劫財','癸':'比肩'}
    }
    
    # 형충파해 관계
    CONFLICTS = {
        '沖': [('子','午'), ('丑','未'), ('寅','申'), ('卯','酉'), ('辰','戌'), ('巳','亥')],
        '刑': [('寅','巳','申'), ('丑','戌','未'), ('子','卯'), ('午','午'), ('酉','酉'), ('亥','亥')],
        '破': [('子','酉'), ('午','卯'), ('巳','申'), ('寅','亥'), ('辰','丑'), ('戌','未')],
        '害': [('子','未'), ('丑','午'), ('寅','巳'), ('卯','辰'), ('申','亥'), ('酉','戌')]
    }
    
    def __init__(self):
        pass
    
    def analyze_extended_saju(self, basic_saju: SajuData) -> ExtendedSajuData:
        """기본 사주 데이터를 확장 분석"""
        
        # 사주팔자 추출
        pillars = [basic_saju.year_pillar, basic_saju.month_pillar, 
                  basic_saju.day_pillar, basic_saju.hour_pillar]
        
        # 지지장간 분석
        hidden_stems = self._analyze_hidden_stems(pillars)
        
        # 십신 분석
        day_stem = basic_saju.day_pillar[0]
        ten_gods = self._analyze_ten_gods(pillars, day_stem)
        
        # 오행 생극 관계 분석
        element_relations = self._analyze_element_relations(pillars)
        
        # 조후 분석
        seasonal_balance = self._analyze_seasonal_balance(basic_saju.birth_info, pillars)
        
        # 형충파해 분석
        conflicts = self._analyze_conflicts(pillars)
        
        # 신강/신약 분석
        day_master_strength = self._analyze_day_master_strength(pillars, day_stem)
        
        return ExtendedSajuData(
            basic_data=basic_saju,
            hidden_stems=hidden_stems,
            ten_gods=ten_gods,
            element_relations=element_relations,
            seasonal_balance=seasonal_balance,
            conflicts=conflicts,
            day_master_strength=day_master_strength
        )
    
    def _analyze_hidden_stems(self, pillars: List[str]) -> Dict[str, List[str]]:
        """지지장간 분석"""
        hidden_stems = {}
        
        for pillar in pillars:
            if len(pillar) >= 2:
                branch = pillar[1]
                if branch in self.HIDDEN_STEMS:
                    hidden_stems[branch] = self.HIDDEN_STEMS[branch]
        
        return hidden_stems
    
    def _analyze_ten_gods(self, pillars: List[str], day_stem: str) -> Dict[str, str]:
        """십신 분석"""
        ten_gods = {}
        
        if day_stem not in self.TEN_GODS_MAP:
            return ten_gods
        
        day_map = self.TEN_GODS_MAP[day_stem]
        
        for i, pillar in enumerate(['year', 'month', 'day', 'hour']):
            if i < len(pillars) and len(pillars[i]) >= 2:
                stem = pillars[i][0]
                branch = pillars[i][1]
                
                # 천간 십신
                if stem in day_map:
                    ten_gods[f'{pillar}_stem'] = day_map[stem]
                
                # 지지의 본기 십신
                if branch in self.HIDDEN_STEMS:
                    main_hidden = self.HIDDEN_STEMS[branch][0]
                    if main_hidden in day_map:
                        ten_gods[f'{pillar}_branch'] = day_map[main_hidden]
        
        return ten_gods
    
    def _analyze_element_relations(self, pillars: List[str]) -> Dict[str, List[str]]:
        """오행 생극 관계 분석"""
        elements = []
        
        for pillar in pillars:
            if len(pillar) >= 2:
                stem_element = self.ELEMENTS.get(pillar[0], '')
                branch_element = self.ELEMENTS.get(pillar[1], '')
                if stem_element:
                    elements.append(stem_element)
                if branch_element:
                    elements.append(branch_element)
        
        # 생극 관계 계산
        generation_cycle = ['木', '火', '土', '金', '水']  # 상생
        destruction_cycle = ['木', '土', '水', '火', '金']  # 상극
        
        relations = {
            'generation': [],  # 상생
            'destruction': [],  # 상극
            'element_count': {}
        }
        
        # 오행 개수 계산
        for element in elements:
            relations['element_count'][element] = relations['element_count'].get(element, 0) + 1
        
        # 상생/상극 관계 찾기
        for i in range(len(elements)):
            for j in range(i+1, len(elements)):
                elem1, elem2 = elements[i], elements[j]
                
                # 상생 관계
                if (generation_cycle.index(elem1) + 1) % 5 == generation_cycle.index(elem2):
                    relations['generation'].append(f"{elem1}生{elem2}")
                elif (generation_cycle.index(elem2) + 1) % 5 == generation_cycle.index(elem1):
                    relations['generation'].append(f"{elem2}生{elem1}")
                
                # 상극 관계
                if (destruction_cycle.index(elem1) + 1) % 5 == destruction_cycle.index(elem2):
                    relations['destruction'].append(f"{elem1}克{elem2}")
                elif (destruction_cycle.index(elem2) + 1) % 5 == destruction_cycle.index(elem1):
                    relations['destruction'].append(f"{elem2}克{elem1}")
        
        return relations
    
    def _analyze_seasonal_balance(self, birth_info: Dict, pillars: List[str]) -> Dict[str, any]:
        """조후 분석 (계절별 균형)"""
        
        # 출생 월에서 계절 판단
        birth_month = int(birth_info.get('original_time', '2000-01-01 00:00').split('-')[1])
        
        seasons = {
            '春': [2, 3, 4],    # 봄
            '夏': [5, 6, 7],    # 여름
            '秋': [8, 9, 10],   # 가을
            '冬': [11, 12, 1]   # 겨울
        }
        
        current_season = None
        for season, months in seasons.items():
            if birth_month in months:
                current_season = season
                break
        
        # 계절별 필요한 조후 오행
        seasonal_needs = {
            '春': ['火', '土'],  # 봄 - 화토로 따뜻하게
            '夏': ['水', '金'],  # 여름 - 수금으로 시원하게
            '秋': ['火', '木'],  # 가을 - 화목으로 따뜻하게
            '冬': ['火', '木']   # 겨울 - 화목으로 따뜻하게
        }
        
        # 현재 사주의 오행 분포
        current_elements = {}
        for pillar in pillars:
            if len(pillar) >= 2:
                stem_elem = self.ELEMENTS.get(pillar[0], '')
                branch_elem = self.ELEMENTS.get(pillar[1], '')
                current_elements[stem_elem] = current_elements.get(stem_elem, 0) + 1
                current_elements[branch_elem] = current_elements.get(branch_elem, 0) + 1
        
        # 조후 균형 평가
        needed_elements = seasonal_needs.get(current_season, [])
        balance_score = 0
        
        for elem in needed_elements:
            if elem in current_elements:
                balance_score += current_elements[elem]
        
        return {
            'season': current_season,
            'needed_elements': needed_elements,
            'current_elements': current_elements,
            'balance_score': balance_score,
            'balance_level': 'good' if balance_score >= 2 else 'needs_improvement'
        }
    
    def _analyze_conflicts(self, pillars: List[str]) -> List[Dict]:
        """형충파해 분석"""
        conflicts = []
        
        # 지지만 추출
        branches = [pillar[1] for pillar in pillars if len(pillar) >= 2]
        
        for conflict_type, conflict_pairs in self.CONFLICTS.items():
            for pair in conflict_pairs:
                if len(pair) == 2:  # 2개 조합 (충, 파, 해)
                    if pair[0] in branches and pair[1] in branches:
                        conflicts.append({
                            'type': conflict_type,
                            'branches': list(pair),
                            'positions': [i for i, b in enumerate(branches) if b in pair]
                        })
                elif len(pair) == 3:  # 3개 조합 (삼형)
                    found_branches = [b for b in pair if b in branches]
                    if len(found_branches) >= 2:
                        conflicts.append({
                            'type': conflict_type,
                            'branches': found_branches,
                            'positions': [i for i, b in enumerate(branches) if b in found_branches]
                        })
        
        return conflicts
    
    def _analyze_day_master_strength(self, pillars: List[str], day_stem: str) -> str:
        """신강/신약 분석"""
        
        # 일간을 돕는 오행과 해치는 오행 계산
        day_element = self.ELEMENTS.get(day_stem, '')
        
        # 같은 오행 (비겁) 개수
        same_element_count = 0
        
        # 일간을 생하는 오행 (인성) 개수
        generation_cycle = ['木', '火', '土', '金', '水']
        helping_element = generation_cycle[(generation_cycle.index(day_element) - 1) % 5]
        helping_count = 0
        
        # 일간을 극하는 오행 (관살) 개수
        destroying_element = generation_cycle[(generation_cycle.index(day_element) + 2) % 5]
        destroying_count = 0
        
        # 일간이 생하는 오행 (식상) 개수
        produced_element = generation_cycle[(generation_cycle.index(day_element) + 1) % 5]
        produced_count = 0
        
        # 일간이 극하는 오행 (재성) 개수
        destroyed_element = generation_cycle[(generation_cycle.index(day_element) + 3) % 5]
        destroyed_count = 0
        
        # 모든 천간지지 확인
        for pillar in pillars:
            if len(pillar) >= 2:
                stem_elem = self.ELEMENTS.get(pillar[0], '')
                branch_elem = self.ELEMENTS.get(pillar[1], '')
                
                for elem in [stem_elem, branch_elem]:
                    if elem == day_element:
                        same_element_count += 1
                    elif elem == helping_element:
                        helping_count += 1
                    elif elem == destroying_element:
                        destroying_count += 1
                    elif elem == produced_element:
                        produced_count += 1
                    elif elem == destroyed_element:
                        destroyed_count += 1
        
        # 신강/신약 판단
        support_score = same_element_count + helping_count
        pressure_score = destroying_count + produced_count + destroyed_count
        
        if support_score >= pressure_score:
            return "신강"
        else:
            return "신약"