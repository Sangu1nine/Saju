# 🚀 빠른 시작 가이드

## 1. 즉시 실행 (1분 내)

```bash
# 의존성 설치
pip install -r requirements.txt

# 환경 설정
cp env_example.txt .env
# .env 파일을 열어서 OPENAI_API_KEY=your_api_key_here 설정

# API 서버 실행
python run_api.py
```

## 2. 문제 해결

### Pydantic 오류가 발생하는 경우:
```bash
pip install --upgrade pydantic langchain langgraph
```

### LangChain 버전 충돌:
```bash
pip uninstall langchain langchain-openai langgraph
pip install -r requirements.txt
```

### 완전 재설치:
```bash
# 가상환경 새로 생성
python -m venv fresh_env
# Windows: fresh_env\Scripts\activate
# Linux/Mac: source fresh_env/bin/activate
pip install -r requirements.txt
```

## 3. 테스트

### API 테스트:
- 브라우저에서 http://localhost:8000 접속
- API 문서: http://localhost:8000/docs

### 사주 계산기 테스트:
```bash
python run_calculator.py
```

## 4. 필수 환경 변수

`.env` 파일에 다음을 반드시 설정:
```
OPENAI_API_KEY=your_openai_api_key_here
```

기타는 선택사항입니다.

## 5. 지원 버전

- Python 3.8+
- LangChain 0.1.x ~ 0.2.x  
- Pydantic v2
- FastAPI 0.104+ 