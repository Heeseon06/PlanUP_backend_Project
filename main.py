import json
import sys
import os
import logging
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

sys.path.append(os.path.join(os.path.dirname(__file__), 'src', 'controllers'))

import scraper as scraper 

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

class URLRequest(BaseModel):
    url: str

def clear_webdriver_cache():
    cache_dirs = [
        os.path.expanduser("~/.wdm"),
        os.path.expanduser("~/.cache/selenium"),
        os.path.expanduser("~/webdriver_manager")
    ]
    for cache_dir in cache_dirs:
        if os.path.exists(cache_dir):
            for root, dirs, files in os.walk(cache_dir, topdown=False):
                for name in files:
                    os.remove(os.path.join(root, name))
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            os.rmdir(cache_dir)

def initialize_driver():
    from selenium.webdriver.chrome.options import Options
    options = Options()
    options.headless = True
    try:
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    except json.decoder.JSONDecodeError:
        logger.error("Failed to initialize driver, clearing cache and retrying...")
        clear_webdriver_cache()
        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    return driver

@app.post("/scrape")
async def scrape_job_details(request: URLRequest):
    url = request.url
    logger.info(f"Received URL: {url}")
    try:
        if "saramin" in url:
            job_details = scraper.get_saramin_job_details(url)
        elif "work.go.kr" in url:
            if "detail/retrivePriEmpDtlView.do" in url:
                job_details = scraper.get_worknet_job_details_v3(url)
            elif "empInfoSrch/detail/empDetailAuthView.do" in url:
                job_details = scraper.get_worknet_job_details(url)
            elif "empInfoSrch/list/dhsOpenEmpInfoDetail2.do" in url:
                job_details = scraper.get_worknet_job_details_v2(url)
            elif "regionJobsWorknet/jobDetailView2.do" in url:
                if "srchInfotypeNm=OEW" in url:
                    job_details = scraper.get_worknet_mob_job_details(url)
                elif "srchInfotypeNm=VALIDATION" in url:
                    job_details = scraper.get_worknet_mob_job_details_2(url)
            else:
                job_details = {"error": "지원되지 않는 Worknet URL입니다."}
        elif "wanted" in url:
            job_details = scraper.get_wanted_job_details(url)
        elif "jobkorea" in url:
            job_details = scraper.get_jobkorea_job_details(url)
        elif "jobplanet" in url:
            job_details = scraper.get_jobplanet_job_details(url)
        else:
            job_details = {"error": "지원되지 않는 URL입니다."}
            logger.warning(f"Unsupported URL: {url}")
        return job_details
    except Exception as e:
        logger.error(f"Error scraping job details: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="서버 오류가 발생했습니다.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
