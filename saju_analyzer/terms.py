# saju_analyzer/terms.py
# 사주 용어 설명 및 해석 모듈

from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class TermExplanation:
    """용어 설명 데이터 구조"""
    term: str
    korean_name: str
    short_description: str
    detailed_description: str
    related_terms: List[str]
    examples: List[str]
    
    def to_dict(self) -> Dict:
        return {
            'term': self.term,
            'korean_name': self.korean_name,
            'short_description': self.short_description,
            'detailed_description': self.detailed_description,
            'related_terms': self.related_terms,
            'examples': self.examples
        }

class SajuTermsExplainer:
    """사주 용어 설명 클래스"""
    
    def __init__(self):
        self.terms_db = self._initialize_terms_database()
    
    def _initialize_terms_database(self) -> Dict[str, TermExplanation]:
        """용어 데이터베이스 초기화"""
        
        terms = {
            # 기본 개념
            "사주팔자": TermExplanation(
                term="사주팔자",
                korean_name="四柱八字",
                short_description="년, 월, 일, 시의 8글자로 이루어진 운명 정보",
                detailed_description="태어난 년, 월, 일, 시를 천간과 지지로 나타낸 8개의 글자입니다. 이는 개인의 타고난 성격, 운명, 적성 등을 파악하는 기본 틀이 됩니다.",
                related_terms=["천간", "지지", "사주명리학"],
                examples=["庚子年 丁亥月 甲寅日 乙丑時"]
            ),
            
            "천간": TermExplanation(
                term="천간",
                korean_name="天干",
                short_description="甲乙丙丁戊己庚辛壬癸의 10개 글자",
                detailed_description="하늘의 기운을 나타내는 10개의 글자입니다. 양간(甲丙戊庚壬)과 음간(乙丁己辛癸)으로 나뉘며, 각각 고유한 성질과 오행을 가집니다.",
                related_terms=["지지", "오행", "음양"],
                examples=["甲木 - 큰 나무", "丙火 - 태양의 불"]
            ),
            
            "지지": TermExplanation(
                term="지지",
                korean_name="地支",
                short_description="子丑寅卯辰巳午未申酉戌亥의 12개 글자",
                detailed_description="땅의 기운을 나타내는 12개의 글자입니다. 12지신과 연결되어 있으며, 각각 계절과 시간대를 나타냅니다.",
                related_terms=["천간", "지지장간", "십이지신"],
                examples=["子 - 쥐, 겨울", "午 - 말, 여름"]
            ),
            
            # 오행
            "오행": TermExplanation(
                term="오행",
                korean_name="五行",
                short_description="목화토금수의 5가지 기본 원소",
                detailed_description="만물의 근본이 되는 5가지 원소입니다. 서로 돕고(相生) 제어하는(相克) 관계를 통해 우주의 순환을 설명합니다.",
                related_terms=["상생", "상극", "조후"],
                examples=["木生火 - 나무가 불을 만든다", "水克火 - 물이 불을 끈다"]
            ),
            
            "상생": TermExplanation(
                term="상생",
                korean_name="相生",
                short_description="오행이 서로 돕는 관계",
                detailed_description="木→火→土→金→水→木의 순환으로 서로 도와주는 관계입니다. 부모가 자식을 돕듯이 생명력을 전해주는 긍정적인 관계입니다.",
                related_terms=["오행", "상극"],
                examples=["木生火: 나무가 불을 피운다", "火生土: 불이 타서 재(흙)가 된다"]
            ),
            
            "상극": TermExplanation(
                term="상극",
                korean_name="相克",
                short_description="오행이 서로 제어하는 관계",
                detailed_description="木→土→水→火→金→木의 순환으로 서로 견제하는 관계입니다. 적절한 상극은 균형을 만들지만, 과도하면 파괴적입니다.",
                related_terms=["오행", "상생"],
                examples=["木克土: 나무가 흙의 양분을 빼앗는다", "土克水: 흙이 물을 흡수한다"]
            ),
            
            # 십신
            "십신": TermExplanation(
                term="십신",
                korean_name="十神",
                short_description="일간을 기준으로 한 10가지 관계",
                detailed_description="일간(태어난 일의 천간)을 중심으로 다른 천간들과의 관계를 나타내는 10가지 유형입니다. 개인의 성격, 능력, 인간관계 등을 판단하는 핵심 요소입니다.",
                related_terms=["일간", "비겁", "인성", "관성", "재성", "식상"],
                examples=["비견 - 나와 같은 동료", "정관 - 나를 이끄는 상사"]
            ),
            
            "비겁": TermExplanation(
                term="비겁",
                korean_name="比劫",
                short_description="비견과 겁재, 나와 같은 오행",
                detailed_description="일간과 같은 오행을 가진 십신입니다. 비견은 같은 음양, 겁재는 다른 음양을 의미하며, 동료나 경쟁자를 나타냅니다.",
                related_terms=["십신", "비견", "겁재"],
                examples=["甲일간의 비견: 甲", "甲일간의 겁재: 乙"]
            ),
            
            "인성": TermExplanation(
                term="인성",
                korean_name="印星",
                short_description="정인과 편인, 나를 생해주는 오행",
                detailed_description="일간을 생해주는 오행의 십신입니다. 부모, 스승, 학문, 명예 등을 나타내며, 보호와 지원의 의미를 가집니다.",
                related_terms=["십신", "정인", "편인"],
                examples=["甲일간의 정인: 癸", "甲일간의 편인: 壬"]
            ),
            
            "관성": TermExplanation(
                term="관성",
                korean_name="官星",
                short_description="정관과 편관, 나를 극하는 오행",
                detailed_description="일간을 극하는 오행의 십신입니다. 권위, 직업, 책임, 배우자(여성의 경우) 등을 나타냅니다.",
                related_terms=["십신", "정관", "편관", "칠살"],
                examples=["甲일간의 정관: 辛", "甲일간의 편관: 庚"]
            ),
            
            "재성": TermExplanation(
                term="재성",
                korean_name="財星",
                short_description="정재와 편재, 내가 극하는 오행",
                detailed_description="일간이 극하는 오행의 십신입니다. 재물, 돈, 배우자(남성의 경우), 욕망 등을 나타냅니다.",
                related_terms=["십신", "정재", "편재"],
                examples=["甲일간의 정재: 己", "甲일간의 편재: 戊"]
            ),
            
            "식상": TermExplanation(
                term="식상",
                korean_name="食傷",
                short_description="식신과 상관, 내가 생하는 오행",
                detailed_description="일간이 생하는 오행의 십신입니다. 표현력, 재능, 자식, 창조성 등을 나타냅니다.",
                related_terms=["십신", "식신", "상관"],
                examples=["甲일간의 식신: 丙", "甲일간의 상관: 丁"]
            ),
            
            # 대운과 세운
            "대운": TermExplanation(
                term="대운",
                korean_name="大運",
                short_description="10년 주기로 변화하는 운세",
                detailed_description="출생 후 일정한 나이부터 시작하여 10년씩 변화하는 운세입니다. 인생의 큰 흐름과 전환점을 나타냅니다.",
                related_terms=["세운", "용신", "기신"],
                examples=["3세~12세: 丙寅대운", "13세~22세: 丁卯대운"]
            ),
            
            "세운": TermExplanation(
                term="세운",
                korean_name="歲運",
                short_description="매년 변화하는 운세",
                detailed_description="해마다 바뀌는 운세로, 그 해의 간지가 개인의 사주와 어떻게 작용하는지를 봅니다.",
                related_terms=["대운", "태세"],
                examples=["2024년 甲辰세운", "2025년 乙巳세운"]
            ),
            
            # 용신과 기신
            "용신": TermExplanation(
                term="용신",
                korean_name="用神",
                short_description="사주를 균형있게 만드는 핵심 오행",
                detailed_description="사주의 편중과 불균형을 조화롭게 만드는 가장 중요한 오행입니다. 용신이 강하면 길하고, 약하면 흉한 결과를 가져옵니다.",
                related_terms=["기신", "조후", "격국"],
                examples=["화가 많은 사주의 용신: 水", "금이 약한 사주의 용신: 土"]
            ),
            
            "기신": TermExplanation(
                term="기신",
                korean_name="忌神",
                short_description="사주에 해로운 영향을 주는 오행",
                detailed_description="사주의 균형을 깨뜨리거나 용신을 해치는 해로운 오행입니다. 기신이 강해지면 불길한 일이 생깁니다.",
                related_terms=["용신", "희신", "한신"],
                examples=["용신이 水인 사주의 기신: 土", "신약한 사주의 기신: 官殺"]
            ),
            
            # 조후
            "조후": TermExplanation(
                term="조후",
                korean_name="調候",
                short_description="계절의 기후에 따른 균형 조절",
                detailed_description="태어난 계절의 기후적 특성을 고려하여 사주의 한열조습을 조절하는 개념입니다. 여름에는 시원하게, 겨울에는 따뜻하게 하는 것이 원칙입니다.",
                related_terms=["용신", "계절", "한열조습"],
                examples=["여름 출생: 水로 조후", "겨울 출생: 火로 조후"]
            ),
            
            # 신강신약
            "신강": TermExplanation(
                term="신강",
                korean_name="身强",
                short_description="일간이 강한 상태",
                detailed_description="일간을 돕는 오행(비겁, 인성)이 많아서 일간이 강한 상태입니다. 적극적이고 주도적인 성격을 가지며, 관성이나 식상을 용신으로 합니다.",
                related_terms=["신약", "일간", "비겁", "인성"],
                examples=["甲일간에 寅卯木이 많은 경우", "비겫과 인성이 강한 사주"]
            ),
            
            "신약": TermExplanation(
                term="신약",
                korean_name="身弱",
                short_description="일간이 약한 상태",
                detailed_description="일간을 돕는 오행이 적어서 일간이 약한 상태입니다. 의존적이고 수동적인 성격을 가지며, 비겁이나 인성을 용신으로 합니다.",
                related_terms=["신강", "일간", "용신"],
                examples=["甲일간에 金이 많고 木이 적은 경우", "관살이 강하고 비겁이 약한 사주"]
            ),
            
            # 형충파해
            "형충파해": TermExplanation(
                term="형충파해",
                korean_name="刑沖破害",
                short_description="지지 간의 충돌과 손상 관계",
                detailed_description="지지들 사이의 불협화음을 나타내는 네 가지 관계입니다. 인연의 변화, 사건사고, 건강 문제 등을 예측하는 데 사용됩니다.",
                related_terms=["지지", "충", "형", "파", "해"],
                examples=["子午충 - 급한 변화", "寅巳申 삼형 - 복잡한 갈등"]
            ),
            
            "충": TermExplanation(
                term="충",
                korean_name="沖",
                short_description="정반대 방향의 지지가 충돌",
                detailed_description="정반대 방향에 있는 지지가 만나 충돌하는 관계입니다. 급작스러운 변화, 이동, 분리 등을 나타냅니다.",
                related_terms=["형충파해", "지지"],
                examples=["子午충", "卯酉충", "寅申충"]
            ),
            
            "형": TermExplanation(
                term="형",
                korean_name="刑",
                short_description="서로 해치는 지지의 관계",
                detailed_description="서로 상극하여 해를 끼치는 지지의 관계입니다. 법적 문제, 건강상의 어려움, 인간관계의 갈등 등을 의미합니다.",
                related_terms=["형충파해", "지지"],
                examples=["寅巳申 삼형", "丑戌未 삼형", "子卯 무례지형"]
            ),
            
            # 지지장간
            "지지장간": TermExplanation(
                term="지지장간",
                korean_name="地支藏干",
                short_description="지지 안에 숨어있는 천간들",
                detailed_description="각 지지마다 내부에 숨어있는 천간들이 있습니다. 본기, 중기, 말기로 나뉘며, 지지의 복합적인 성질을 나타냅니다.",
                related_terms=["지지", "천간", "본기", "중기", "말기"],
                examples=["子의 장간: 癸", "午의 장간: 丁, 己"]
            ),
            
            # 격국
            "격국": TermExplanation(
                term="격국",
                korean_name="格局",
                short_description="사주의 전체적인 구조와 패턴",
                detailed_description="사주팔자가 이루는 특별한 구조나 패턴을 말합니다. 각 격국마다 고유한 특성과 용신이 있습니다.",
                related_terms=["용신", "사주", "월령"],
                examples=["정관격", "편재격", "식신격", "건록격"]
            ),
            
            # 월령
            "월령": TermExplanation(
                term="월령",
                korean_name="月令",
                short_description="태어난 달의 지지",
                detailed_description="태어난 달의 지지로, 사주에서 가장 중요한 요소 중 하나입니다. 월령이 사주 전체의 기운을 주도하는 경우가 많습니다.",
                related_terms=["월주", "지지", "격국"],
                examples=["寅월 출생시 월령: 寅", "申월 출생시 월령: 申"]
            ),
            
            # 일간
            "일간": TermExplanation(
                term="일간",
                korean_name="日干",
                short_description="태어난 날의 천간, 나 자신을 나타냄",
                detailed_description="태어난 날의 천간으로, 사주명리학에서 '나'를 나타내는 가장 중요한 글자입니다. 모든 십신 관계는 일간을 기준으로 결정됩니다.",
                related_terms=["일주", "십신", "신강신약"],
                examples=["甲일간 - 큰 나무의 성격", "辛일간 - 보석의 성격"]
            ),
            
            # 특수 관계
            "삼합": TermExplanation(
                term="삼합",
                korean_name="三合",
                short_description="세 지지가 합쳐져 하나의 오행이 되는 관계",
                detailed_description="인묘진(木), 사오미(火), 신유술(金), 해자축(水)처럼 세 지지가 합쳐져 하나의 강한 오행을 만드는 관계입니다.",
                related_terms=["지지", "오행", "합"],
                examples=["寅卯辰 삼합: 木", "巳午未 삼합: 火"]
            ),
            
            "육합": TermExplanation(
                term="육합",
                korean_name="六合",
                short_description="두 지지가 합쳐지는 관계",
                detailed_description="두 지지가 만나 서로 도와주는 관계입니다. 화합, 협력, 인연의 의미를 가집니다.",
                related_terms=["지지", "합", "인연"],
                examples=["子丑합", "寅亥합", "卯戌합"]
            )
        }
        
        return terms
    
    def get_explanation(self, term: str) -> Optional[TermExplanation]:
        """특정 용어의 설명 반환"""
        return self.terms_db.get(term)
    
    def get_all_terms(self) -> List[str]:
        """모든 용어 목록 반환"""
        return list(self.terms_db.keys())
    
    def search_terms(self, keyword: str) -> List[TermExplanation]:
        """키워드로 용어 검색"""
        results = []
        keyword_lower = keyword.lower()
        
        for term, explanation in self.terms_db.items():
            if (keyword_lower in term.lower() or 
                keyword_lower in explanation.korean_name.lower() or
                keyword_lower in explanation.short_description.lower()):
                results.append(explanation)
        
        return results
    
    def get_related_terms(self, term: str) -> List[TermExplanation]:
        """관련 용어들 반환"""
        explanation = self.get_explanation(term)
        if not explanation:
            return []
        
        related = []
        for related_term in explanation.related_terms:
            related_explanation = self.get_explanation(related_term)
            if related_explanation:
                related.append(related_explanation)
        
        return related
    
    def get_terms_by_category(self, category: str) -> List[TermExplanation]:
        """카테고리별 용어 분류"""
        categories = {
            "기본": ["사주팔자", "천간", "지지", "일간", "월령"],
            "오행": ["오행", "상생", "상극", "조후"],
            "십신": ["십신", "비겁", "인성", "관성", "재성", "식상"],
            "운세": ["대운", "세운", "용신", "기신"],
            "강약": ["신강", "신약"],
            "충돌": ["형충파해", "충", "형", "파", "해"],
            "조화": ["삼합", "육합"],
            "고급": ["지지장간", "격국"]
        }
        
        if category not in categories:
            return []
        
        results = []
        for term in categories[category]:
            explanation = self.get_explanation(term)
            if explanation:
                results.append(explanation)
        
        return results
    
    def get_categories(self) -> List[str]:
        """모든 카테고리 목록 반환"""
        return ["기본", "오행", "십신", "운세", "강약", "충돌", "조화", "고급"]