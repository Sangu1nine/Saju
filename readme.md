# 전문 사주 분석 시스템

AI 기반 8단계 전문 사주 분석을 제공하는 종합 시스템입니다.

## 📋 시스템 개요

### 핵심 기능
- 🔢 **정확한 사주 계산**: 기존 `saju_calculator.py` 모듈 활용
- 🤖 **AI 기반 분석**: GPT-4.1 + LangGraph를 통한 8단계 전문 분석
- 📊 **실시간 스트리밍**: 분석 과정을 실시간으로 확인
- 📱 **멀티 플랫폼**: 웹/앱 공통 API 제공
- 🔍 **용어 해설**: 사주 용어별 상세 설명 제공

### 8단계 분석 프로세스
1. **기초 명식 작성** - 사주팔자 구성 및 지지장간 분석
2. **오행 균형 분석** - 상생상극 관계 및 균형 평가
3. **용신과 조후** - 핵심 오행 및 계절 조화 분석
4. **십신 관계 해석** - 성격과 적성 분석
5. **대운과 세운** - 10년/1년 주기 운세 변화
6. **형충파해 분석** - 충돌 요소 및 대처 방안
7. **구체적 해석** - 직업/재물/인간관계별 상세 분석
8. **종합 평가** - 전체적 인생 방향 제시

## 🏗️ 시스템 구조

```
saju-analysis-system/
├── saju_calculator.py          # 기존 사주 계산 모듈
├── saju_analyzer/              # 확장 분석 모듈
│   ├── core.py                # 핵심 분석 엔진
│   └── terms.py               # 용어 해설 모듈
├── langgraph_workflow/         # LangGraph 워크플로우
│   ├── workflow.py            # 8단계 분석 워크플로우
│   └── analysis_tools.py      # 분석 도구 모듈
├── api/                       # FastAPI 백엔드
│   └── main.py                # API 서버
├── frontend/                  # React 프론트엔드
└── mobile/                    # React Native 앱 (추후)
```

## 🚀 설치 및 실행

### 1. 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd saju_langgraph

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp env_example.txt .env
# .env 파일에서 API 키 설정 (최소한 OPENAI_API_KEY는 필수)

# 개발용 패키지 설치 (선택사항)
pip install -e .
```

### 2. Docker로 실행 (권장)

```bash
# 모든 서비스 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f api
```

### 3. 개발 모드 실행

```bash
# 방법 1: 편의 스크립트 사용
python run_api.py

# 방법 2: 직접 실행
python api/main.py

# 방법 3: uvicorn 사용
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

# 사주 계산기 단독 실행
python run_calculator.py
# 또는
python saju_calculator.py
```

## 📊 API 사용법

### 기본 사주 계산

```bash
curl -X POST "http://localhost:8000/api/v1/saju/calculate" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 14,
    "birth_minute": 30,
    "is_male": true,
    "city": "서울",
    "is_lunar": false
  }'
```

### 전문 분석 (완료 후 결과)

```bash
curl -X POST "http://localhost:8000/api/v1/saju/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 14,
    "birth_minute": 30,
    "is_male": true,
    "city": "서울"
  }'
```

### 스트리밍 분석

```bash
curl -X POST "http://localhost:8000/api/v1/saju/analyze/stream" \
  -H "Content-Type: application/json" \
  -d '{
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 14,
    "birth_minute": 30,
    "is_male": true,
    "city": "서울"
  }' \
  --no-buffer
```

### 용어 검색

```bash
# 전체 용어 목록
curl "http://localhost:8000/api/v1/terms"

# 특정 용어 설명
curl "http://localhost:8000/api/v1/terms/십신"

# 용어 검색
curl -X POST "http://localhost:8000/api/v1/terms/search" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "오행"}'
```

## 🔧 설정

### 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 | ✅ |
| `LANGCHAIN_API_KEY` | LangSmith 추적용 키 | ❌ |
| `LANGCHAIN_TRACING_V2` | LangSmith 추적 활성화 | ❌ |
| `LANGCHAIN_PROJECT` | LangSmith 프로젝트 명 | ❌ |

### LangSmith 추적 설정

```bash
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=your_api_key
export LANGCHAIN_PROJECT=saju-analysis
```

## 📱 프론트엔드 개발

### React 웹 앱

```bash
cd frontend
npm install
npm start
```

### React Native 앱 (추후)

```bash
cd mobile
npm install
npx react-native run-ios    # iOS
npx react-native run-android # Android
```

## 🧪 테스트

```bash
# 백엔드 테스트
pytest tests/

# API 테스트
curl "http://localhost:8000/api/v1/test/analyze"

# 헬스 체크
curl "http://localhost:8000/health"
```

## 📈 모니터링

### API 상태 확인

- 헬스 체크: `GET /health`
- 분석 목록: `GET /api/v1/analysis/list`
- LangSmith 대시보드: https://smith.langchain.com

### 로그 확인

```bash
# Docker 로그
docker-compose logs -f api

# 직접 실행 시 로그
tail -f logs/app.log
```

## 🔄 개발 워크플로우

### 1. 새로운 분석 단계 추가

```python
# langgraph_workflow/workflow.py에 새 단계 추가
async def _step9_new_analysis(self, state: AnalysisState) -> AnalysisState:
    """새로운 분석 단계"""
    # 분석 로직 구현
    pass

# 워크플로우에 노드 추가
workflow.add_node("step9", self._step9_new_analysis)
workflow.add_edge("step8", "step9")
```

### 2. 새로운 용어 추가

```python
# saju_analyzer/terms.py에 용어 추가
"새용어": TermExplanation(
    term="새용어",
    korean_name="新用語",
    short_description="새로운 용어 설명",
    detailed_description="상세한 설명...",
    related_terms=["관련용어1", "관련용어2"],
    examples=["예시1", "예시2"]
)
```

### 3. API 엔드포인트 추가

```python
# api/main.py에 새 엔드포인트 추가
@app.post("/api/v1/new-endpoint")
async def new_endpoint(request: NewRequest):
    """새로운 기능"""
    return {"result": "success"}
```

## 🏗️ 확장 계획

### Phase 1: 기본 기능 (현재)
- [x] 사주 계산 모듈 통합
- [x] 8단계 분석 워크플로우
- [x] FastAPI 백엔드
- [x] 용어 해설 시스템
- [x] 스트리밍 분석

### Phase 2: 웹 프론트엔드
- [ ] React 웹 애플리케이션
- [ ] 반응형 UI/UX
- [ ] 분석 결과 시각화
- [ ] 사용자 히스토리 관리

### Phase 3: 모바일 앱
- [ ] React Native 앱
- [ ] 푸시 알림
- [ ] 오프라인 모드
- [ ] 사용자 계정 시스템

### Phase 4: 고급 기능
- [ ] 사용자 인증/권한
- [ ] 분석 결과 DB 저장
- [ ] 캐싱 시스템
- [ ] 성능 최적화

### Phase 5: AI 고도화
- [ ] 맞춤형 분석 모델
- [ ] 사용자 피드백 학습
- [ ] 예측 정확도 향상
- [ ] 다국어 지원

## 🛠️ 트러블슈팅

### 자주 발생하는 문제

1. **OpenAI API 키 오류**
   ```bash
   # .env 파일 확인
   cat .env | grep OPENAI_API_KEY
   
   # 환경 변수 직접 설정
   export OPENAI_API_KEY=your_key_here
   ```

2. **KASI API 연결 실패**
   ```python
   # saju_calculator.py에서 API 키 확인
   # 네트워크 연결 상태 확인
   ```

3. **LangGraph 워크플로우 오류**
   ```bash
   # LangChain 버전 확인
   pip show langchain langgraph
   
   # 의존성 재설치
   pip install --upgrade langchain langgraph
   ```

4. **Docker 컨테이너 오류**
   ```bash
   # 컨테이너 재시작
   docker-compose down && docker-compose up -d
   
   # 로그 확인
   docker-compose logs api
   ```

### 성능 최적화

1. **분석 속도 향상**
   - OpenAI API 모델 변경 (gpt-3.5-turbo)
   - 병렬 처리 구현
   - 결과 캐싱

2. **메모리 사용량 최적화**
   - 분석 결과 주기적 정리
   - Redis 캐시 활용
   - 스트리밍 응답 크기 제한

## 📝 API 문서

### 전체 엔드포인트 목록

| 메소드 | 엔드포인트 | 설명 | 인증 |
|--------|------------|------|------|
| GET | `/` | 루트 정보 | ❌ |
| GET | `/health` | 헬스 체크 | ❌ |
| POST | `/api/v1/saju/calculate` | 기본 사주 계산 | ❌ |
| POST | `/api/v1/saju/analyze` | 전문 분석 | ❌ |
| POST | `/api/v1/saju/analyze/stream` | 스트리밍 분석 | ❌ |
| GET | `/api/v1/saju/analysis/{id}` | 분석 결과 조회 | ❌ |
| GET | `/api/v1/terms` | 용어 목록 | ❌ |
| GET | `/api/v1/terms/{term}` | 용어 설명 | ❌ |
| POST | `/api/v1/terms/search` | 용어 검색 | ❌ |
| GET | `/api/v1/analysis/list` | 분석 목록 | ❌ |
| DELETE | `/api/v1/analysis/{id}` | 분석 삭제 | ❌ |

### 응답 형식

모든 API는 JSON 형식으로 응답합니다:

```json
{
  "status": "success|error",
  "data": {...},
  "message": "설명 메시지",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 오류 코드

| 코드 | 설명 | 대응 방법 |
|------|------|-----------|
| 400 | 잘못된 요청 | 요청 데이터 확인 |
| 404 | 리소스 없음 | URL 경로 확인 |
| 500 | 서버 오류 | 로그 확인 후 재시도 |
| 503 | 서비스 불가 | 시스템 상태 확인 |

## 🤝 기여 방법

1. 이슈 등록 또는 기능 제안
2. Fork 후 개발 브랜치 생성
3. 코드 작성 및 테스트
4. Pull Request 생성
5. 코드 리뷰 및 머지

### 코딩 스타일

```bash
# 코드 포맷팅
black .

# 린팅
flake8 .

# 타입 체크
mypy .
```

## 📞 지원

- 이슈 등록: GitHub Issues
- 문서: [Wiki](링크)
- 이메일: support@saju-analysis.com

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- **사주 계산**: 기존 `saju_calculator.py` 모듈 활용
- **AI 기술**: OpenAI GPT-4.1, LangChain, LangGraph
- **API 프레임워크**: FastAPI
- **프론트엔드**: React, React Native
- **인프라**: Docker, Redis

---

**버전**: 1.0.0  
**최종 업데이트**: 2024년 1월  
**개발팀**: 사주 분석 시스템 개발팀