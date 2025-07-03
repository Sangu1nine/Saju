# api/main.py
# FastAPI 백엔드 서버

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Dict, List, Optional, Union
import json
import asyncio
from datetime import datetime
import os
from contextlib import asynccontextmanager

# LangSmith 설정
from langsmith import Client
from langsmith.evaluation import evaluate
from langsmith.schemas import Run, Example

# 내부 모듈 임포트 (절대 경로 사용)
import sys
import os
from pathlib import Path

# 프로젝트 루트를 Python 경로에 추가
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from saju_calculator import calculate_solar_saju, convert_lunar_to_solar
from saju_analyzer.core import SajuAnalyzer, SajuData
from saju_analyzer.terms import SajuTermsExplainer
from langgraph_workflow.workflow import SajuAnalysisWorkflow

# 환경 변수 설정
# .env 파일이 있다면 로드 (python-dotenv 패키지 사용 권장)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("⚠️  python-dotenv가 설치되지 않음. .env 파일을 수동으로 설정해주세요.")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
LANGCHAIN_API_KEY = os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_TRACING_V2 = os.getenv("LANGCHAIN_TRACING_V2", "true")
LANGCHAIN_PROJECT = os.getenv("LANGCHAIN_PROJECT", "saju-analysis")

# API 서버 설정
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", 8000))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# LangSmith 클라이언트 초기화
langsmith_client = Client(api_key=LANGCHAIN_API_KEY) if LANGCHAIN_API_KEY else None

# 글로벌 변수들
analyzer = None
terms_explainer = None
workflow = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """앱 시작/종료 시 실행되는 함수"""
    # 시작 시 초기화
    global analyzer, terms_explainer, workflow
    
    print("🚀 사주 분석 시스템 초기화 중...")
    
    # 분석 도구 초기화
    analyzer = SajuAnalyzer()
    terms_explainer = SajuTermsExplainer()
    
    # 워크플로우 초기화
    if OPENAI_API_KEY:
        model = os.getenv("OPENAI_MODEL", "gpt-4.1")
        workflow = SajuAnalysisWorkflow(
            openai_api_key=OPENAI_API_KEY,
            model=model
        )
        print("✅ LangGraph 워크플로우 초기화 완료")
    else:
        print("⚠️  OPENAI_API_KEY가 설정되지 않았습니다.")
    
    # LangSmith 설정 확인
    if langsmith_client:
        print("✅ LangSmith 추적 활성화")
    else:
        print("⚠️  LangSmith 추적이 비활성화되어 있습니다.")
    
    print("🎯 사주 분석 시스템 준비 완료!")
    
    yield
    
    # 종료 시 정리
    print("🔄 사주 분석 시스템 종료 중...")

def main():
    """API 서버 실행을 위한 메인 함수"""
    import uvicorn
    
    print(f"🚀 사주 분석 API 서버 시작")
    print(f"📍 서버 주소:")
    print(f"   🔗 로컬 접속: http://localhost:{API_PORT}")
    print(f"   🌐 네트워크 접속: http://{API_HOST}:{API_PORT}")
    print(f"📚 API 문서:")
    print(f"   📖 로컬: http://localhost:{API_PORT}/docs")
    print(f"   📖 네트워크: http://{API_HOST}:{API_PORT}/docs")
    print(f"")
    print(f"💡 브라우저에서 클릭하세요: http://localhost:{API_PORT}")
    print(f"💡 API 문서 보기: http://localhost:{API_PORT}/docs")
    
    # 필수 환경 변수 확인
    if not OPENAI_API_KEY:
        print("❌ OPENAI_API_KEY가 설정되지 않았습니다.")
        print("💡 env_example.txt를 참고하여 .env 파일을 생성하고 API 키를 설정해주세요.")
        return
    
    try:
        uvicorn.run(
            "api.main:app",
            host=API_HOST,
            port=API_PORT,
            reload=os.getenv("API_RELOAD", "false").lower() == "true",
            log_level=LOG_LEVEL.lower()
        )
    except Exception as e:
        print(f"❌ 서버 실행 오류: {e}")
        print("💡 requirements.txt의 모든 패키지가 설치되었는지 확인해주세요.")

if __name__ == "__main__":
    main()

# FastAPI 앱 초기화
app = FastAPI(
    title="사주 분석 API",
    description="전문적인 사주 분석을 위한 API 서비스",
    version="1.0.0",
    lifespan=lifespan
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 프로덕션에서는 구체적인 도메인 지정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청/응답 모델 정의
class SajuRequest(BaseModel):
    """사주 분석 요청 모델"""
    birth_year: int
    birth_month: int
    birth_day: int
    birth_hour: int
    birth_minute: int = 0
    is_male: bool = True
    city: str = "서울"
    is_lunar: bool = False
    is_leap_month: bool = False

class SajuResponse(BaseModel):
    """사주 분석 응답 모델"""
    analysis_id: str
    saju_data: Dict
    extended_data: Dict
    analysis_results: Dict
    status: str
    created_at: str

class TermSearchRequest(BaseModel):
    """용어 검색 요청 모델"""
    keyword: str
    category: Optional[str] = None

class AnalysisProgressResponse(BaseModel):
    """분석 진행 상황 응답 모델"""
    type: str
    current_step: Optional[int] = None
    total_steps: Optional[int] = None
    step_name: Optional[str] = None
    progress_percentage: Optional[float] = None
    result: Optional[Dict] = None
    analysis: Optional[Dict] = None

# 메모리 내 분석 저장소 (실제 운영에서는 데이터베이스 사용)
analysis_storage = {}

@app.get("/")
async def root():
    """루트 엔드포인트"""
    return {
        "message": "사주 분석 API 서비스",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "calculate": "/api/v1/saju/calculate",
            "analyze": "/api/v1/saju/analyze",
            "stream": "/api/v1/saju/analyze/stream",
            "terms": "/api/v1/terms",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    """헬스 체크"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "analyzer": analyzer is not None,
            "terms_explainer": terms_explainer is not None,
            "workflow": workflow is not None,
            "langsmith": langsmith_client is not None
        }
    }

@app.post("/api/v1/saju/calculate")
async def calculate_saju(request: SajuRequest):
    """사주 기본 계산"""
    try:
        # 음력→양력 변환 (필요시)
        if request.is_lunar:
            solar_year, solar_month, solar_day = convert_lunar_to_solar(
                request.birth_year, request.birth_month, request.birth_day,
                request.is_leap_month
            )
            
            if solar_year is None:
                raise HTTPException(
                    status_code=400,
                    detail="음력→양력 변환에 실패했습니다. 날짜를 확인해주세요."
                )
            
            # 변환된 양력 날짜 사용
            birth_year, birth_month, birth_day = solar_year, solar_month, solar_day
        else:
            birth_year, birth_month, birth_day = request.birth_year, request.birth_month, request.birth_day
        
        # 사주 계산
        result = calculate_solar_saju(
            birth_year, birth_month, birth_day,
            request.birth_hour, request.birth_minute,
            male=request.is_male, city=request.city
        )
        
        # SajuData 객체 생성
        saju_data = SajuData(
            year_pillar=result['year_pillar'],
            month_pillar=result['month_pillar'],
            day_pillar=result['day_pillar'],
            hour_pillar=result['hour_pillar'],
            birth_info=result['birth_info'],
            elements=result['elements'],
            great_luck=result['great_luck']
        )
        
        return {
            "saju_data": saju_data.to_dict(),
            "calculated_at": datetime.now().isoformat(),
            "input_data": request.dict()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"사주 계산 중 오류 발생: {str(e)}")

@app.post("/api/v1/saju/analyze")
async def analyze_saju(request: SajuRequest):
    """사주 전문 분석 (완료 후 결과 반환)"""
    if not workflow:
        raise HTTPException(status_code=503, detail="분석 워크플로우가 초기화되지 않았습니다.")
    
    try:
        # 사주 기본 계산
        calculate_response = await calculate_saju(request)
        saju_data = SajuData(**calculate_response["saju_data"])
        
        # 전문 분석 실행
        analysis_result = await workflow.analyze_saju(saju_data)
        
        # 결과 저장
        analysis_id = analysis_result["final_analysis"]["analysis_id"]
        analysis_storage[analysis_id] = analysis_result
        
        # LangSmith 추적 (선택사항)
        if langsmith_client:
            try:
                langsmith_client.create_run(
                    name="saju_analysis",
                    inputs={"request": request.dict()},
                    outputs={"analysis_id": analysis_id},
                    run_type="chain"
                )
            except Exception as e:
                print(f"LangSmith 추적 오류: {e}")
        
        return SajuResponse(
            analysis_id=analysis_id,
            saju_data=calculate_response["saju_data"],
            extended_data=analysis_result["extended_data"],
            analysis_results=analysis_result["step_results"],
            status="completed",
            created_at=analysis_result["final_analysis"]["analysis_date"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"분석 중 오류 발생: {str(e)}")

@app.post("/api/v1/saju/analyze/stream")
async def analyze_saju_stream(request: SajuRequest):
    """8단계 실시간 스트리밍 사주 분석"""
    
    if not workflow:
        raise HTTPException(status_code=500, detail="워크플로우가 초기화되지 않았습니다.")
    
    # 사주 계산
    try:
        if request.is_lunar:
            solar_date = convert_lunar_to_solar(
                request.birth_year, request.birth_month, request.birth_day,
                request.is_leap_month
            )
            birth_year, birth_month, birth_day = solar_date
        else:
            birth_year, birth_month, birth_day = request.birth_year, request.birth_month, request.birth_day
        
        saju_data = calculate_solar_saju(
            birth_year, birth_month, birth_day, 
            request.birth_hour, request.birth_minute
        )
        
        saju_obj = SajuData(
            birth_info=saju_data['birth_info'],
            year_pillar=saju_data['year_pillar'],
            month_pillar=saju_data['month_pillar'],
            day_pillar=saju_data['day_pillar'],
            hour_pillar=saju_data['hour_pillar'],
            lunar_birth_info=saju_data.get('lunar_birth_info'),
            solar_birth_info=saju_data.get('solar_birth_info'),
            additional_info=saju_data.get('additional_info', {})
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"사주 계산 오류: {str(e)}")
    
    # 실시간 스트리밍 분석 생성기
    async def stream_analysis():
        try:
            # 분석 ID 생성
            analysis_id = f"analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{id(saju_obj)}"
            
            # 분석 스트림 시작
            async for stream_data in workflow.get_analysis_stream(saju_obj):
                
                # 각 단계별 데이터 스트리밍
                if stream_data["type"] == "start":
                    # 분석 시작 알림
                    yield f"data: {json.dumps({
                        'type': 'start',
                        'analysis_id': analysis_id,
                        'message': stream_data['message'],
                        'total_steps': stream_data['total_steps'],
                        'saju_data': {
                            'year_pillar': saju_obj.year_pillar,
                            'month_pillar': saju_obj.month_pillar,
                            'day_pillar': saju_obj.day_pillar,
                            'hour_pillar': saju_obj.hour_pillar,
                            'birth_info': saju_obj.birth_info
                        }
                    }, ensure_ascii=False)}\n\n"
                
                elif stream_data["type"] == "step_start":
                    # 단계 시작 알림
                    yield f"data: {json.dumps({
                        'type': 'step_start',
                        'step': stream_data['step'],
                        'total_steps': stream_data['total_steps'],
                        'step_name': stream_data['step_name'],
                        'progress_percentage': stream_data['progress_percentage'],
                        'message': stream_data['message'],
                        'timestamp': datetime.now().isoformat()
                    }, ensure_ascii=False)}\n\n"
                
                elif stream_data["type"] == "step_complete":
                    # 단계 완료 및 결과 스트리밍
                    yield f"data: {json.dumps({
                        'type': 'step_complete',
                        'step': stream_data['step'],
                        'step_name': stream_data['step_name'],
                        'result': stream_data['result'],
                        'progress_percentage': stream_data['progress_percentage'],
                        'message': stream_data['message'],
                        'timestamp': datetime.now().isoformat()
                    }, ensure_ascii=False)}\n\n"
                    
                    # 스트리밍 속도 조절 (너무 빠르면 읽기 어려움)
                    await asyncio.sleep(0.3)
                
                elif stream_data["type"] == "error":
                    # 에러 발생 시
                    yield f"data: {json.dumps({
                        'type': 'error',
                        'step': stream_data['step'],
                        'step_name': stream_data['step_name'],
                        'error': stream_data['error'],
                        'message': stream_data['message'],
                        'timestamp': datetime.now().isoformat()
                    }, ensure_ascii=False)}\n\n"
                    break
                
                elif stream_data["type"] == "complete":
                    # 분석 완료
                    final_analysis = stream_data['final_analysis']
                    
                    # 메모리에 결과 저장
                    analysis_storage[analysis_id] = {
                        'analysis_id': analysis_id,
                        'saju_data': saju_obj.to_dict(),
                        'analysis_results': final_analysis,
                        'status': 'completed',
                        'created_at': datetime.now().isoformat(),
                        'total_time': stream_data.get('total_time', '5-7분')
                    }
                    
                    yield f"data: {json.dumps({
                        'type': 'complete',
                        'analysis_id': analysis_id,
                        'final_analysis': final_analysis,
                        'message': stream_data['message'],
                        'total_time': stream_data.get('total_time', '5-7분'),
                        'timestamp': datetime.now().isoformat()
                    }, ensure_ascii=False)}\n\n"
                    break
        
        except Exception as e:
            # 전역 에러 처리
            error_message = f"분석 중 오류가 발생했습니다: {str(e)}"
            yield f"data: {json.dumps({
                'type': 'error',
                'error': error_message,
                'message': error_message,
                'timestamp': datetime.now().isoformat()
            }, ensure_ascii=False)}\n\n"
    
    # Server-Sent Events로 스트리밍 응답
    return StreamingResponse(
        stream_analysis(),
        media_type="text/plain; charset=utf-8",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/event-stream",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }
    )

@app.get("/api/v1/saju/analysis/{analysis_id}")
async def get_analysis(analysis_id: str):
    """분석 결과 조회"""
    if analysis_id not in analysis_storage:
        raise HTTPException(status_code=404, detail="분석 결과를 찾을 수 없습니다.")
    
    return analysis_storage[analysis_id]

@app.get("/api/v1/terms")
async def get_all_terms():
    """모든 용어 목록 조회"""
    if not terms_explainer:
        raise HTTPException(status_code=503, detail="용어 해설 서비스가 초기화되지 않았습니다.")
    
    return {
        "terms": terms_explainer.get_all_terms(),
        "categories": terms_explainer.get_categories()
    }

@app.get("/api/v1/terms/{term}")
async def get_term_explanation(term: str):
    """특정 용어 설명 조회"""
    if not terms_explainer:
        raise HTTPException(status_code=503, detail="용어 해설 서비스가 초기화되지 않았습니다.")
    
    explanation = terms_explainer.get_explanation(term)
    if not explanation:
        raise HTTPException(status_code=404, detail=f"용어 '{term}'을 찾을 수 없습니다.")
    
    return explanation.to_dict()

@app.post("/api/v1/terms/search")
async def search_terms(request: TermSearchRequest):
    """용어 검색"""
    if not terms_explainer:
        raise HTTPException(status_code=503, detail="용어 해설 서비스가 초기화되지 않았습니다.")
    
    if request.category:
        # 카테고리별 검색
        results = terms_explainer.get_terms_by_category(request.category)
    else:
        # 키워드 검색
        results = terms_explainer.search_terms(request.keyword)
    
    return {
        "query": request.dict(),
        "results": [term.to_dict() for term in results],
        "count": len(results)
    }

@app.get("/api/v1/terms/{term}/related")
async def get_related_terms(term: str):
    """관련 용어 조회"""
    if not terms_explainer:
        raise HTTPException(status_code=503, detail="용어 해설 서비스가 초기화되지 않았습니다.")
    
    related = terms_explainer.get_related_terms(term)
    return {
        "term": term,
        "related_terms": [term.to_dict() for term in related],
        "count": len(related)
    }

@app.get("/api/v1/analysis/list")
async def list_analyses():
    """분석 목록 조회"""
    return {
        "analyses": [
            {
                "analysis_id": aid,
                "created_at": data.get("final_analysis", {}).get("analysis_date", ""),
                "status": data.get("final_analysis", {}).get("status", "unknown")
            }
            for aid, data in analysis_storage.items()
        ],
        "count": len(analysis_storage)
    }

@app.delete("/api/v1/analysis/{analysis_id}")
async def delete_analysis(analysis_id: str):
    """분석 결과 삭제"""
    if analysis_id not in analysis_storage:
        raise HTTPException(status_code=404, detail="분석 결과를 찾을 수 없습니다.")
    
    del analysis_storage[analysis_id]
    return {"message": "분석 결과가 삭제되었습니다.", "analysis_id": analysis_id}

# 개발용 테스트 엔드포인트
@app.post("/api/v1/test/analyze")
async def test_analyze():
    """개발용 테스트 분석"""
    test_request = SajuRequest(
        birth_year=1990,
        birth_month=5,
        birth_day=15,
        birth_hour=14,
        birth_minute=30,
        is_male=True,
        city="서울",
        is_lunar=False
    )
    
    return await analyze_saju(test_request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )