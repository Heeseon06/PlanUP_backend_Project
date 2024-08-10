# 베이스 이미지로 Python 3 사용
FROM python:3.10

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 패키지 업데이트 및 필요한 패키지 설치
RUN apt-get update && \
    apt-get install -y wget unzip curl

# Chrome 설치
RUN wget -O /tmp/chrome-linux64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i /tmp/chrome-linux64.deb; apt-get -fy install && \
    rm /tmp/chrome-linux64.deb

# ChromeDriver 및 WebDriver Manager 설치
RUN pip install webdriver-manager
# 필요한 Python 패키지 설치
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir /.wdm && chmod 777 /.wdm


# 소스 코드 복사
COPY . .

# 환경 변수 설정 파일 복사
COPY .env .env

# 컨테이너 시작 명령어 설정
CMD ["python", "main.py"]
