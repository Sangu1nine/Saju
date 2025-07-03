# langgraph_workflow/workflow.py
# 8단계 실시간 스트리밍 사주 분석 워크플로우

from typing import Dict, List, TypedDict, Annotated
from langgraph.graph import StateGraph, END, START
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
import json
import asyncio
from datetime import datetime

import sys
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가 (상대 import 대신 절대 import 사용)
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from saju_analyzer.core import SajuAnalyzer, ExtendedSajuData, SajuData
from saju_analyzer.terms import SajuTermsExplainer
from langgraph_workflow.analysis_tools import *

class AnalysisState(TypedDict):
    """분석 상태 정의"""
    # 기본 정보
    saju_data: Dict
    extended_data: Dict
    
    # 분석 진행 상황
    current_step: int
    total_steps: int
    step_name: str
    
    # 각 단계별 결과
    step_results: Dict[str, Dict]
    
    # 메시지 히스토리
    messages: Annotated[List, add_messages]
    
    # 최종 결과
    final_analysis: Dict
    
    # 오류 정보
    error: str

class SajuAnalysisWorkflow:
    """8단계 실시간 스트리밍 사주 분석 워크플로우 클래스"""
    
    def __init__(self, openai_api_key: str, model: str = "gpt-4o"):
        self.llm = ChatOpenAI(
            api_key=openai_api_key,
            model=model,
            temperature=0.6,  # 자연스러운 결과를 위해 약간 높임
            max_tokens=1200   # 단계별로 적당한 길이
        )
        
        self.analyzer = SajuAnalyzer()
        self.terms_explainer = SajuTermsExplainer()
        
        # 워크플로우 구성
        self.workflow = self._create_workflow()
        
        # 8단계 분석 (간소화된 프롬프트로 속도 향상)
        self.analysis_steps = [
            {"step": 1, "name": "기초 명식 작성", "function": self._step1_basic_structure},
            {"step": 2, "name": "오행 균형 분석", "function": self._step2_element_balance},
            {"step": 3, "name": "용신과 조후", "function": self._step3_yongshin_johu},
            {"step": 4, "name": "십신 관계 해석", "function": self._step4_ten_gods},
            {"step": 5, "name": "대운과 세운", "function": self._step5_great_luck},
            {"step": 6, "name": "형충파해 분석", "function": self._step6_conflicts},
            {"step": 7, "name": "구체적 해석", "function": self._step7_specific_interpretation},
            {"step": 8, "name": "종합 평가", "function": self._step8_comprehensive_evaluation}
        ]
    
    def _create_workflow(self) -> StateGraph:
        """8단계 워크플로우 생성"""
        workflow = StateGraph(AnalysisState)
        
        # 노드 추가
        workflow.add_node("initialize", self._initialize_analysis)
        workflow.add_node("step1", self._step1_basic_structure)
        workflow.add_node("step2", self._step2_element_balance)
        workflow.add_node("step3", self._step3_yongshin_johu)
        workflow.add_node("step4", self._step4_ten_gods)
        workflow.add_node("step5", self._step5_great_luck)
        workflow.add_node("step6", self._step6_conflicts)
        workflow.add_node("step7", self._step7_specific_interpretation)
        workflow.add_node("step8", self._step8_comprehensive_evaluation)
        workflow.add_node("finalize", self._finalize_analysis)
        
        # 엣지 설정
        workflow.add_edge(START, "initialize")
        workflow.add_edge("initialize", "step1")
        workflow.add_edge("step1", "step2")
        workflow.add_edge("step2", "step3")
        workflow.add_edge("step3", "step4")
        workflow.add_edge("step4", "step5")
        workflow.add_edge("step5", "step6")
        workflow.add_edge("step6", "step7")
        workflow.add_edge("step7", "step8")
        workflow.add_edge("step8", "finalize")
        workflow.add_edge("finalize", END)
        
        return workflow.compile()
    
    async def analyze_saju(self, saju_data: SajuData) -> Dict:
        """사주 분석 실행"""
        
        # 확장 데이터 생성
        extended_data = self.analyzer.analyze_extended_saju(saju_data)
        
        # 초기 상태 설정
        initial_state = {
            "saju_data": saju_data.to_dict(),
            "extended_data": extended_data.to_dict(),
            "current_step": 0,
            "total_steps": len(self.analysis_steps),
            "step_name": "시작",
            "step_results": {},
            "messages": [],
            "final_analysis": {},
            "error": ""
        }
        
        # 워크플로우 실행
        result = await self.workflow.ainvoke(initial_state)
        
        return result
    
    async def _initialize_analysis(self, state: AnalysisState) -> AnalysisState:
        """분석 초기화"""
        
        state["current_step"] = 0
        state["step_name"] = "분석 준비"
        state["messages"].append(
            HumanMessage(content="8단계 전문 사주 분석을 시작합니다.")
        )
        
        return state
    
    async def _step1_basic_structure(self, state: AnalysisState) -> AnalysisState:
        """1단계: 기초 명식 작성"""
        
        state["current_step"] = 1
        state["step_name"] = "기초 명식 작성"
        
        # 기본 사주 정보 추출
        saju_data = state["saju_data"]
        extended_data = state["extended_data"]
        
        # 간소화된 프롬프트로 속도 향상
        prompt = f"""
사주명리학 전문가로서 다음 사주의 기초 명식을 작성해주세요.

**사주팔자:**
년주: {saju_data['year_pillar']} | 월주: {saju_data['month_pillar']} | 일주: {saju_data['day_pillar']} | 시주: {saju_data['hour_pillar']}

**분석 요청:**
1. 사주팔자 구성의 기본 특징
2. 각 기둥의 의미와 역할
3. 전체적인 사주 구조의 균형

**출력 형식 (간결하게):**
- 구조 특징: [핵심 특성 2-3가지]
- 기둥별 역할: [년/월/일/시주 각각의 특징]
- 전체 균형: [조화로운 부분과 주의점]

명확하고 핵심만 포함하여 작성해주세요.
        """
        
        # LLM 호출
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        # 결과 저장
        state["step_results"]["step1"] = {
            "title": "기초 명식 작성",
            "content": response.content,
            "data": {
                "pillars": [saju_data['year_pillar'], saju_data['month_pillar'], 
                           saju_data['day_pillar'], saju_data['hour_pillar']],
                "birth_info": saju_data['birth_info']
            }
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step2_element_balance(self, state: AnalysisState) -> AnalysisState:
        """2단계: 오행 균형 분석"""
        
        state["current_step"] = 2
        state["step_name"] = "오행 균형 분석"
        
        saju_data = state["saju_data"]
        
        prompt = f"""
사주의 오행 균형을 분석해주세요.

**사주:** {saju_data['year_pillar']} {saju_data['month_pillar']} {saju_data['day_pillar']} {saju_data['hour_pillar']}

**분석 요청:**
1. 목화토금수 각각의 강약
2. 상생상극 관계의 흐름
3. 균형 상태와 보완점

**출력 형식:**
- 오행 분포: [강한 오행 / 약한 오행]
- 생극 관계: [주요 흐름과 특징]
- 보완 방향: [필요한 오행과 주의점]

간결하고 실용적으로 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step2"] = {
            "title": "오행 균형 분석",
            "content": response.content,
            "data": {
                "elements": saju_data.get('elements', {})
            }
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step3_yongshin_johu(self, state: AnalysisState) -> AnalysisState:
        """3단계: 용신과 조후"""
        
        state["current_step"] = 3
        state["step_name"] = "용신과 조후"
        
        saju_data = state["saju_data"]
        
        prompt = f"""
사주의 용신과 조후를 분석해주세요.

**사주:** {saju_data['year_pillar']} {saju_data['month_pillar']} {saju_data['day_pillar']} {saju_data['hour_pillar']}

**분석 요청:**
1. 용신(가장 필요한 오행) 선택
2. 조후(계절 조화) 상태
3. 일간 강약 판단

**출력 형식:**
- 용신: [핵심 오행과 선택 이유]
- 조후: [계절적 특성과 조화]
- 일간: [강약 상태와 영향]

핵심 포인트만 명확하게 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step3"] = {
            "title": "용신과 조후",
            "content": response.content,
            "data": {}
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step4_ten_gods(self, state: AnalysisState) -> AnalysisState:
        """4단계: 십신 관계 해석"""
        
        state["current_step"] = 4
        state["step_name"] = "십신 관계 해석"
        
        saju_data = state["saju_data"]
        
        prompt = f"""
사주의 십신 관계를 통한 성격 분석을 해주세요.

**사주:** {saju_data['year_pillar']} {saju_data['month_pillar']} {saju_data['day_pillar']} {saju_data['hour_pillar']}

**분석 요청:**
1. 주요 십신과 그 의미
2. 성격 특성과 적성
3. 인간관계 패턴

**출력 형식:**
- 주요 십신: [강한 십신과 특징]
- 성격: [핵심 성격 3가지]
- 관계: [인간관계 패턴과 조언]

구체적이고 실용적으로 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step4"] = {
            "title": "십신 관계 해석",
            "content": response.content,
            "data": {}
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step5_great_luck(self, state: AnalysisState) -> AnalysisState:
        """5단계: 대운과 세운"""
        
        state["current_step"] = 5
        state["step_name"] = "대운과 세운"
        
        saju_data = state["saju_data"]
        current_year = datetime.now().year
        birth_year = int(saju_data['birth_info']['original_time'].split('-')[0])
        current_age = current_year - birth_year + 1
        
        prompt = f"""
현재 대운과 향후 운세 흐름을 분석해주세요.

**기본 정보:**
- 사주: {saju_data['year_pillar']} {saju_data['month_pillar']} {saju_data['day_pillar']} {saju_data['hour_pillar']}
- 현재 나이: {current_age}세

**분석 요청:**
1. 현재 대운의 특성
2. 향후 5-10년 운세 흐름
3. 중요한 전환점 시기

**출력 형식:**
- 현재 운세: [현재 대운의 특징과 영향]
- 향후 흐름: [앞으로의 변화 방향]
- 전환점: [주의할 시기와 기회]

실제적인 조언 중심으로 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step5"] = {
            "title": "대운과 세운",
            "content": response.content,
            "data": {
                "current_age": current_age,
                "current_year": current_year
            }
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step6_conflicts(self, state: AnalysisState) -> AnalysisState:
        """6단계: 형충파해 분석"""
        
        state["current_step"] = 6
        state["step_name"] = "형충파해 분석"
        
        saju_data = state["saju_data"]
        
        prompt = f"""
사주의 형충파해 요소와 대처방안을 분석해주세요.

**사주:** {saju_data['year_pillar']} {saju_data['month_pillar']} {saju_data['day_pillar']} {saju_data['hour_pillar']}

**분석 요청:**
1. 형충파해 발견 여부
2. 주의해야 할 영향
3. 해소 및 대처 방법

**출력 형식:**
- 충돌 요소: [발견된 형충파해와 영향]
- 주의사항: [건강, 인간관계 등 주의점]
- 대처법: [구체적인 해소 방안]

실생활에 도움되는 조언으로 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step6"] = {
            "title": "형충파해 분석",
            "content": response.content,
            "data": {}
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step7_specific_interpretation(self, state: AnalysisState) -> AnalysisState:
        """7단계: 구체적 해석"""
        
        state["current_step"] = 7
        state["step_name"] = "구체적 해석"
        
        saju_data = state["saju_data"]
        
        prompt = f"""
사주를 바탕으로 구체적인 삶의 영역별 해석을 해주세요.

**사주:** {saju_data['year_pillar']} {saju_data['month_pillar']} {saju_data['day_pillar']} {saju_data['hour_pillar']}

**분석 요청:**
1. 직업과 적성 방향
2. 재물운과 관리법
3. 건강 관리 포인트

**출력 형식:**
- 직업: [적합한 분야와 발전 방향]
- 재물: [재물운 특징과 관리 조언]
- 건강: [주의할 점과 관리법]

구체적이고 실행 가능한 조언으로 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step7"] = {
            "title": "구체적 해석",
            "content": response.content,
            "data": {}
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _step8_comprehensive_evaluation(self, state: AnalysisState) -> AnalysisState:
        """8단계: 종합 평가"""
        
        state["current_step"] = 8
        state["step_name"] = "종합 평가"
        
        # 이전 단계들의 핵심 내용 요약
        previous_insights = []
        for step_key in ["step1", "step2", "step3", "step4", "step5", "step6", "step7"]:
            if step_key in state["step_results"]:
                # 각 단계의 첫 100자만 요약으로 사용
                content = state["step_results"][step_key]["content"][:100] + "..."
                previous_insights.append(f"{state['step_results'][step_key]['title']}: {content}")
        
        prompt = f"""
모든 분석을 종합하여 최종 평가와 인생 조언을 해주세요.

**이전 분석 요약:**
{chr(10).join(previous_insights)}

**종합 평가 요청:**
1. 사주의 전체적 특징
2. 인생 전략과 방향성
3. 핵심 실천 사항

**출력 형식:**
- 전체 특징: [사주의 핵심 테마]
- 인생 전략: [장기적 방향과 목표]
- 실천 사항: [당장 시작할 수 있는 조언 3가지]

종합적이고 미래지향적으로 작성해주세요.
        """
        
        response = await self.llm.ainvoke([HumanMessage(content=prompt)])
        
        state["step_results"]["step8"] = {
            "title": "종합 평가",
            "content": response.content,
            "data": {
                "summary": "comprehensive_evaluation"
            }
        }
        
        state["messages"].append(response)
        
        return state
    
    async def _finalize_analysis(self, state: AnalysisState) -> AnalysisState:
        """분석 완료 처리"""
        
        state["current_step"] = state["total_steps"]
        state["step_name"] = "분석 완료"
        
        # 최종 결과 구성
        state["final_analysis"] = {
            "summary": "8단계 전문 사주 분석이 완료되었습니다.",
            "total_steps": state["total_steps"],
            "analysis_time": datetime.now().isoformat(),
            "step_results": state["step_results"],
            "recommendations": {
                "career": "직업 추천 내용",
                "relationships": "인간관계 조언",
                "wealth": "재물운 가이드",
                "health": "건강 관리법",
                "overall": "전체적인 인생 방향"
            }
        }
        
        return state
    
    async def get_analysis_stream(self, saju_data: SajuData):
        """실시간 분석 스트림 - 단계별 즉시 결과 반환"""
        
        # 확장 데이터 생성
        extended_data = self.analyzer.analyze_extended_saju(saju_data)
        
        # 초기 상태
        state = {
            "saju_data": saju_data.to_dict(),
            "extended_data": extended_data.to_dict(),
            "current_step": 0,
            "total_steps": len(self.analysis_steps),
            "step_name": "시작",
            "step_results": {},
            "messages": [],
            "final_analysis": {},
            "error": ""
        }
        
        # 분석 시작 알림
        yield {
            "type": "start",
            "message": "8단계 전문 사주 분석을 시작합니다.",
            "total_steps": len(self.analysis_steps)
        }
        
        # 각 단계를 순차적으로 실행하며 즉시 결과 스트리밍
        for step_info in self.analysis_steps:
            # 단계 시작 알림
            state["current_step"] = step_info["step"]
            state["step_name"] = step_info["name"]
            
            progress = (step_info["step"] / len(self.analysis_steps)) * 100
            
            yield {
                "type": "step_start",
                "step": step_info["step"],
                "total_steps": len(self.analysis_steps),
                "step_name": step_info["name"],
                "progress_percentage": progress,
                "message": f"{step_info['name']} 분석을 시작합니다..."
            }
            
            try:
                # 단계 실행
                state = await step_info["function"](state)
                
                # 완료 즉시 결과 스트리밍
                yield {
                    "type": "step_complete",
                    "step": step_info["step"],
                    "step_name": step_info["name"],
                    "result": state["step_results"][f"step{step_info['step']}"],
                    "progress_percentage": progress,
                    "message": f"{step_info['name']} 분석이 완료되었습니다."
                }
                
                # 잠깐의 딜레이로 자연스러운 진행감 제공
                await asyncio.sleep(0.5)
                
            except Exception as e:
                yield {
                    "type": "error",
                    "step": step_info["step"],
                    "step_name": step_info["name"],
                    "error": str(e),
                    "message": f"{step_info['name']} 분석 중 오류가 발생했습니다."
                }
                return
        
        # 최종 완료
        await self._finalize_analysis(state)
        
        yield {
            "type": "complete",
            "final_analysis": state["final_analysis"],
            "message": "모든 분석이 완료되었습니다!",
            "total_time": "약 5-7분"
        }