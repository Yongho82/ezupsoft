// FIX: Export the HTML content as a string constant to prevent TypeScript parsing errors.
export const initialHtmlKo = `<!DOCTYPE html>
<html lang="ko"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>라이브 HTML 편집기 프레젠테이션</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&amp;display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    /* Global Styles */
    html, body {
        overflow: hidden !important; /* Prevent internal scrollbars; scrolling is handled by the parent frame */
    }
    body {
        margin: 0;
        background-color: #e5e7eb; /* Match the editor's preview pane background */
    }
    .slide-container {
        /* width is now controlled by individual slides */
        display: flex;
        flex-direction: column;
        align-items: center; /* Center the slides horizontally */
        gap: 32px; /* Add space BETWEEN slides */
        padding: 32px 0; /* Add space at the top and bottom of the whole set */
        margin: 0 auto;
    }

    /* --- SLIDE 1 STYLES --- */
    .slide-1 {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #FFFFFF;
        color: #333333;
        width: 1280px;
        height: 720px;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    .slide-1 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-1 .header { background-color: #FF6B35; color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; height: 60px; }
    .slide-1 .header-title { font-size: 25px; font-weight: 700; }
    .slide-1 .header-subtitle { font-size: 16px; font-weight: 500; }
    .slide-1 .main-content { display: flex; flex: 1; height: calc(100% - 60px); position: relative; }
    .slide-1 .left-column { width: 50%; height: 100%; padding: 30px; position: absolute; left: 0; top: 0; }
    .slide-1 .right-column { width: 50%; height: 100%; background-color: #F8F8F8; padding: 30px; position: absolute; left: 50%; top: 0; }
    .slide-1 .title { font-size: 26px; font-weight: 600; color: #333; line-height: 1.2; position: absolute; top: 40px; left: 40px; width: 90%; }
    .slide-1 .title span { color: #FF6B35; }
    .slide-1 .subtitle { font-size: 18px; color: #555; line-height: 1.5; position: absolute; top: 130px; left: 40px; width: 90%; }
    .slide-1 .problem-list { position: absolute; top: 280px; left: 40px; width: 90%; }
    .slide-1 .problem-item { display: flex; margin-bottom: 20px; align-items: center; }
    .slide-1 .problem-icon { background-color: #FF6B35; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
    .slide-1 .problem-text { font-size: 16px; line-height: 1.5; }
    .slide-1 .problem-title { font-weight: 700; margin-bottom: 5px; color: #444; }
    .slide-1 .comparison-table { width: 90%; border-collapse: collapse; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; position: absolute; top: 60px; left: 40px; }
    .slide-1 .comparison-table th { background-color: #FF6B35; color: white; text-align: left; padding: 12px 15px; font-weight: 500; }
    .slide-1 .comparison-table td { padding: 10px 15px; border-bottom: 1px solid #e0e0e0; }
    .slide-1 .comparison-table tr:last-child td { border-bottom: none; }
    .slide-1 .comparison-table tr:nth-child(even) { background-color: #f2f2f2; }
    .slide-1 .highlight { color: #FF6B35; font-weight: 700; }
    .slide-1 .chart-container { height: 200px; position: absolute; top: 380px; left: 40px; width: 90%; }
    .slide-1 .divider { height: 4px; width: 80px; background-color: #FF6B35; position: absolute; top: 100px; left: 40px; }
    
    /* --- SLIDE 2 STYLES --- */
    .slide-2 { font-family: 'Noto Sans KR', sans-serif; background-color: #121212; color: #ffffff; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-2 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-2 .header { background-color: #000000; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00d4ff; }
    .slide-2 .header-title { font-size: 24px; font-weight: 700; color: #00d4ff; }
    .slide-2 .header-subtitle { font-size: 16px; font-weight: 400; color: #888888; }
    .slide-2 .content { display: flex; flex: 1; padding: 30px; background-color: #121212; position: relative; }
    .slide-2 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-2 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-2 .title { font-size: 26px; font-weight: 700; color: #00d4ff; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-2 .feature-section { margin-bottom: 25px; position: absolute; width: 90%; }
    .slide-2 .feature-section.fs1 { top: 100px; left: 0px; }
    .slide-2 .feature-section.fs2 { top: 320px; left: 0px; }
    .slide-2 .feature-title { font-size: 22px; font-weight: 700; color: #00ff88; margin-bottom: 15px; }
    .slide-2 .feature-item { display: flex; align-items: flex-start; margin-bottom: 15px; }
    .slide-2 .feature-icon { color: #00d4ff; margin-right: 15px; font-size: 20px; padding-top: 3px; }
    .slide-2 .feature-text { flex: 1; font-size: 16px; line-height: 1.5; }
    .slide-2 .feature-text strong { color: #00ff88; }
    .slide-2 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #333333; position: absolute; top: 100px; left: 0; }
    .slide-2 .comparison-table th { background-color: #000000; color: #00d4ff; padding: 12px; text-align: left; font-size: 16px; font-weight: 500; border: 1px solid #333333; }
    .slide-2 .comparison-table td { padding: 10px 12px; border: 1px solid #333333; font-size: 15px; background-color: #1a1a1a; }
    .slide-2 .comparison-table tr:nth-child(even) td { background-color: #222222; }
    .slide-2 .chart-container { width: 90%; height: 250px; border-radius: 8px; padding: 15px; position: absolute; bottom: 0px; left: 0; }
    .slide-2 .section-title { font-size: 20px; font-weight: 700; color: #00d4ff; margin-bottom: 15px; text-align: center; }
    .slide-2 .highlight { color: #00ff88; }

    /* --- SLIDE 3 STYLES --- */
    .slide-3 { font-family: 'Noto Sans KR', sans-serif; background-color: #ffffff; color: #333333; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-3 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-3 .header { background-color: #9B59B6; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; }
    .slide-3 .header-title { font-size: 24px; font-weight: 700; }
    .slide-3 .header-subtitle { font-size: 16px; font-weight: 400; }
    .slide-3 .content { display: flex; flex: 1; padding: 30px; position: relative; }
    .slide-3 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-3 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-3 .title { font-size: 26px; font-weight: 700; color: #4A90E2; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-3 .subtitle { font-size: 20px; font-weight: 600; color: #E91E63; position: absolute; top: 130px; left: 0px; }
    .slide-3 .value-items { margin-top: 20px; position: absolute; top: 200px; left: 0px; width: 90%; }
    .slide-3 .value-item { display: flex; align-items: flex-start; margin-bottom: 20px; }
    .slide-3 .value-icon { margin-right: 15px; font-size: 28px; }
    .slide-3 .value-content { flex: 1; }
    .slide-3 .value-title { font-size: 18px; font-weight: 700; margin-bottom: 5px; line-height: 1.4; }
    .slide-3 .value-description { font-size: 15px; line-height: 1.5; }
    .slide-3 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #e0e0e0; position: absolute; top: 60px; left: 0px; }
    .slide-3 .comparison-table th { padding: 12px; text-align: left; font-size: 15px; font-weight: 500; border: 1px solid #e0e0e0; }
    .slide-3 .comparison-table td { padding: 10px 12px; border: 1px solid #e0e0e0; font-size: 14px; }
    .slide-3 .chart-container { width: 90%; height: 260px; position: absolute; bottom: 0px; left: 0px; }
    .slide-3 .section-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; text-align: center; }
    .slide-3 .icon-blue { color: #4A90E2; }
    .slide-3 .icon-purple { color: #9B59B6; }
    .slide-3 .icon-pink { color: #E91E63; }
    .slide-3 .th-blue { background-color: #4A90E2; color: white; }
    .slide-3 .th-purple { background-color: #9B59B6; color: white; }
    .slide-3 .th-green { background-color: #4CAF50; color: white; }
    .slide-3 .tr-blue { background-color: #EBF5FF; }
    .slide-3 .tr-purple { background-color: #F6EFFE; }
    .slide-3 .tr-green { background-color: #EEFBEE; }
</style>
</head>
<body>
<div class="slide-container">
    <!-- SLIDE 1: 무엇을, 왜 만들었는가? -->
    <div class="slide-1">
        <div class="header">
            <div class="header-title">라이브 HTML 편집기</div>
            <div class="header-subtitle">코딩과 디자인의 경계를 허물다</div>
        </div>
        <div class="main-content">
            <div class="left-column">
                <h1 class="title">무엇을 왜 만들었는가?</h1>
                <div class="divider"></div>
                <p class="subtitle">코드 편집기의 강력함과 디자인 툴의 직관성을 하나로 합쳐, 아이디어가 결과물이 되는 시간을 획기적으로 단축시키는 솔루션입니다.</p>
                <div class="problem-list">
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-code-branch"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">분리된 작업 환경</div>
                            <div>개발자는 코드를, 디자이너는 시안을, 기획자는 문서를 보며 발생하는 비효율과 반복적인 수정 작업.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-user-slash"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">높은 진입 장벽</div>
                            <div>코딩 지식이 없으면 간단한 웹 콘텐츠 수정조차 어려웠던 문제.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-file-export"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">변환 문제</div>
                            <div>HTML TO PPTX 정확도 높은 변환이 가능해 몇번의 수정으로 프리젠테이션 가능.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <table class="comparison-table">
                    <thead><tr><th>비교항목</th><th>기존 워크플로우</th><th>라이브 HTML 편집기</th></tr></thead>
                    <tbody>
                        <tr><td>제작 시간</td><td>평균 3시간</td><td><span class="highlight">평균 1시간</span></td></tr>
                        <tr><td>팀 협업</td><td>개별 툴 사용</td><td><span class="highlight">단일 플랫폼</span></td></tr>
                        <tr><td>수정 용이성</td><td>개발자 필요</td><td><span class="highlight">누구나 가능</span></td></tr>
                        <tr><td>내보내기</td><td>단일 포맷</td><td><span class="highlight">다중 포맷</span></td></tr>
                        <tr><td>학습 곡선</td><td>가파름</td><td><span class="highlight">완만함</span></td></tr>
                    </tbody>
                </table>
                <div class="chart-container"><canvas id="efficiencyChart"></canvas></div>
            </div>
        </div>
    </div>

    <!-- SLIDE 2: 어떻게 가능한가? -->
    <div class="slide-2">
        <div class="header">
            <div class="header-title">어떻게 가능한가? - 핵심 기능</div>
            <div class="header-subtitle">라이브 HTML 편집기 피치 덱</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">직관적인 편집, 혁신적인 재활용</h1>
                <div class="feature-section fs1">
                    <h2 class="feature-title">1. 실시간 시각적 편집 (WYSIWYG, 그 이상)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-hand-pointer"></i></div>
                        <div class="feature-text"><strong>다이렉트 핸들링:</strong> <br>미리보기 화면에서 마치 파워포인트처럼 요소를 클릭하여 선택하고, 드래그하여 옮기고, 더블클릭하여 텍스트를 바로 수정합니다.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-sliders-h"></i></div>
                        <div class="feature-text"><strong>상세 컨트롤 패널:</strong> <br>코드를 전혀 몰라도, 선택한 요소의 글꼴, 색상, 여백, 그림자 등 모든 디자인 속성을 전문가처럼 제어할 수 있습니다.</div>
                    </div>
                </div>
                <div class="feature-section fs2">
                    <h2 class="feature-title">2. 콘텐츠의 무한한 확장성 (One Source, Multi-Use)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="feature-text"><strong>PDF의 재탄생:</strong> <br>정적인 PDF 문서를 불러오면, AI가 배경과 텍스트를 자동으로 분리하여 편집 가능한 동적 HTML 콘텐츠로 완벽하게 변환합니다.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-powerpoint"></i></div>
                        <div class="feature-text"><strong>지능형 내보내기:</strong> <br>작업물을 단순 이미지가 아닌, 텍스트와 차트가 살아있는 네이티브 파워포인트(PPTX) 파일로 내보내 즉시 발표 자료로 활용할 수 있습니다. (PDF, 이미지, HTML은 기본)</div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title">기능 비교: 일반 편집기 vs <span class="highlight">라이브 HTML 편집기</span></h3>
                    <table class="comparison-table" style="position: absolute; top: 58px; left: 25px;">
                        <thead><tr><th>기능</th><th>일반 HTML 편집기</th><th>라이브 HTML 편집기</th></tr></thead>
                        <tbody>
                            <tr><td><strong>시각적 편집</strong></td><td>제한적</td><td>완전 통합</td></tr>
                            <tr><td><strong>코드 자동 생성</strong></td><td>부분적</td><td>지능형 생성</td></tr>
                            <tr><td><strong>PDF 변환</strong></td><td>불가능</td><td>AI 기반 변환</td></tr>
                            <tr><td><strong>PPTX 내보내기</strong></td><td>불가능</td><td>네이티브 지원</td></tr>
                            <tr><td><strong>비개발자 접근성</strong></td><td>낮음</td><td>매우 높음</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title">사용자 만족도 향상</h3>
                    <div class="chart-container" style="position: absolute; top: 333px; left: 20px;"><canvas id="satisfactionChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: 기대효과 및 비전 -->
    <div class="slide-3">
        <div class="header">
            <div class="header-title">우리에게 어떤 의미가 있는가? - 기대효과 및 비전</div>
            <div class="header-subtitle">라이브 HTML 편집기 피치 덱</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">콘텐츠 제작의<br>패러다임을 바꾸다</h1>
                <h2 class="subtitle">고객 가치</h2>
                <div class="value-items">
                    <div class="value-item">
                        <div class="value-icon icon-blue"><i class="fas fa-chart-line"></i></div>
                        <div class="value-content">
                            <div class="value-title">생산성 50% 향상</div>
                            <div class="value-description">웹 페이지, 보고서, 프레젠테이션 제작 워크플로우를 하나로 통합하여 작업 시간을 획기적으로 단축합니다.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-purple"><i class="fas fa-users"></i></div>
                        <div class="value-content">
                            <div class="value-title">역할의 확장</div>
                            <div class="value-description">비개발 직군(기획자, 디자이너, 마케터)도 직접 고품질의 디지털 콘텐츠를 제작하고 수정할 수 있습니다.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-pink"><i class="fas fa-coins"></i></div>
                        <div class="value-content">
                            <div class="value-title">비용 절감</div>
                            <div class="value-description">외주 개발이나 디자이너의 추가 작업 없이, 내부에서 신속하게 콘텐츠를 제작하고 배포할 수 있습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title" style="color: #4A90E2;">ROI 비교 분석</h3>
                    <table class="comparison-table" style="position: absolute; top: 43px; left: 35px; width: 556px; height: 231px;">
                        <thead><tr><th class="th-blue">항목</th><th class="th-purple">기존 방식</th><th class="th-green">라이브 HTML 편집기</th></tr></thead>
                        <tbody>
                            <tr class="tr-blue"><td><strong>초기 투자 비용</strong></td><td>중간</td><td>낮음</td></tr>
                            <tr class="tr-purple"><td><strong>유지보수 비용</strong></td><td>높음</td><td>매우 낮음</td></tr>
                            <tr class="tr-green"><td><strong>작업자 교육 비용</strong></td><td>높음</td><td>낮음</td></tr>
                            <tr class="tr-blue"><td><strong>콘텐츠 생산량</strong></td><td>월 10건</td><td>월 25건</td></tr>
                            <tr class="tr-purple"><td><strong>투자 회수 기간</strong></td><td>12개월</td><td>4개월</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title" style="color: #9B59B6;">시장 성장 예측</h3>
                    <div class="chart-container" style="position: absolute; top: 307px; left: 35px; width: 554px; height: 223px;"><canvas id="marketGrowthChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Chart for Slide 1
    if (document.getElementById('efficiencyChart')) {
        const ctx1 = document.getElementById('efficiencyChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['편집 속도', '배포 시간', '작업 효율성', '협업 용이성', '유지보수성'],
                datasets: [{
                    label: '기존 방식', data: [35, 40, 30, 25, 20], backgroundColor: '#AAAAAA',
                }, {
                    label: '라이브 HTML 편집기', data: [85, 90, 75, 80, 85], backgroundColor: '#FF6B35',
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } }, x: { grid: { display: false } } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Chart for Slide 2
    if (document.getElementById('satisfactionChart')) {
        const ctx2 = document.getElementById('satisfactionChart').getContext('2d');
        new Chart(ctx2, {
            type: 'radar',
            data: {
                labels: ['사용 편의성', '작업 속도', '결과물 품질', '기능 다양성', '확장성'],
                datasets: [{
                    label: '일반 HTML 편집기', data: [40, 35, 60, 50, 30], backgroundColor: 'rgba(136, 136, 136, 0.2)',
                    borderColor: '#888888', borderWidth: 2, pointBackgroundColor: '#888888'
                }, {
                    label: '라이브 HTML 편집기', data: [85, 90, 85, 80, 95], backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    borderColor: '#00d4ff', borderWidth: 2, pointBackgroundColor: '#00ff88'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif", size: 12 } },
                        ticks: { backdropColor: 'transparent', color: '#888888' }
                    }
                },
                plugins: { legend: { position: 'bottom', labels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif" } } } }
            }
        });
    }

    // Chart for Slide 3
    if (document.getElementById('marketGrowthChart')) {
        const ctx3 = document.getElementById('marketGrowthChart').getContext('2d');
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    { label: '전통적 도구 시장', data: [100, 105, 110, 112, 115, 117], backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: '#9B59B6', borderWidth: 3, tension: 0.3 },
                    { label: '통합 편집기 시장', data: [40, 80, 130, 190, 260, 350], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: '#4CAF50', borderWidth: 3, tension: 0.3 },
                    { label: '라이브 HTML 편집기 점유율', data: [5, 15, 30, 50, 75, 110], backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: '#FF9800', borderWidth: 3, tension: 0.3 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { family: "'Noto Sans KR', sans-serif", size: 12 } } } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: '시장 규모 (단위: 억원)', font: { family: "'Noto Sans KR', sans-serif" } }, ticks: { font: { family: "'Noto Sans KR', sans-serif" } } },
                    x: { ticks: { font: { family: "'Noto Sans KR', sans-serif" } } }
                }
            }
        });
    }
});
</script>



</body></html>
`;

export const initialHtmlEn = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Live HTML Editor Presentation</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&amp;display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    /* Global Styles */
    html, body {
        overflow: hidden !important; /* Prevent internal scrollbars; scrolling is handled by the parent frame */
    }
    body {
        margin: 0;
        background-color: #e5e7eb; /* Match the editor's preview pane background */
    }
    .slide-container {
        /* width is now controlled by individual slides */
        display: flex;
        flex-direction: column;
        align-items: center; /* Center the slides horizontally */
        gap: 32px; /* Add space BETWEEN slides */
        padding: 32px 0; /* Add space at the top and bottom of the whole set */
        margin: 0 auto;
    }

    /* --- SLIDE 1 STYLES --- */
    .slide-1 {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #FFFFFF;
        color: #333333;
        width: 1280px;
        height: 720px;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    .slide-1 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-1 .header { background-color: #FF6B35; color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; height: 60px; }
    .slide-1 .header-title { font-size: 25px; font-weight: 700; }
    .slide-1 .header-subtitle { font-size: 16px; font-weight: 500; }
    .slide-1 .main-content { display: flex; flex: 1; height: calc(100% - 60px); position: relative; }
    .slide-1 .left-column { width: 50%; height: 100%; padding: 30px; position: absolute; left: 0; top: 0; }
    .slide-1 .right-column { width: 50%; height: 100%; background-color: #F8F8F8; padding: 30px; position: absolute; left: 50%; top: 0; }
    .slide-1 .title { font-size: 26px; font-weight: 600; color: #333; line-height: 1.2; position: absolute; top: 40px; left: 40px; width: 90%; }
    .slide-1 .title span { color: #FF6B35; }
    .slide-1 .subtitle { font-size: 18px; color: #555; line-height: 1.5; position: absolute; top: 130px; left: 40px; width: 90%; }
    .slide-1 .problem-list { position: absolute; top: 280px; left: 40px; width: 90%; }
    .slide-1 .problem-item { display: flex; margin-bottom: 20px; align-items: center; }
    .slide-1 .problem-icon { background-color: #FF6B35; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
    .slide-1 .problem-text { font-size: 16px; line-height: 1.5; }
    .slide-1 .problem-title { font-weight: 700; margin-bottom: 5px; color: #444; }
    .slide-1 .comparison-table { width: 90%; border-collapse: collapse; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; position: absolute; top: 60px; left: 40px; }
    .slide-1 .comparison-table th { background-color: #FF6B35; color: white; text-align: left; padding: 12px 15px; font-weight: 500; }
    .slide-1 .comparison-table td { padding: 10px 15px; border-bottom: 1px solid #e0e0e0; }
    .slide-1 .comparison-table tr:last-child td { border-bottom: none; }
    .slide-1 .comparison-table tr:nth-child(even) { background-color: #f2f2f2; }
    .slide-1 .highlight { color: #FF6B35; font-weight: 700; }
    .slide-1 .chart-container { height: 200px; position: absolute; top: 380px; left: 40px; width: 90%; }
    .slide-1 .divider { height: 4px; width: 80px; background-color: #FF6B35; position: absolute; top: 100px; left: 40px; }
    
    /* --- SLIDE 2 STYLES --- */
    .slide-2 { font-family: 'Noto Sans KR', sans-serif; background-color: #121212; color: #ffffff; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-2 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-2 .header { background-color: #000000; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00d4ff; }
    .slide-2 .header-title { font-size: 24px; font-weight: 700; color: #00d4ff; }
    .slide-2 .header-subtitle { font-size: 16px; font-weight: 400; color: #888888; }
    .slide-2 .content { display: flex; flex: 1; padding: 30px; background-color: #121212; position: relative; }
    .slide-2 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-2 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-2 .title { font-size: 26px; font-weight: 700; color: #00d4ff; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-2 .feature-section { margin-bottom: 25px; position: absolute; width: 90%; }
    .slide-2 .feature-section.fs1 { top: 100px; left: 0px; }
    .slide-2 .feature-section.fs2 { top: 320px; left: 0px; }
    .slide-2 .feature-title { font-size: 22px; font-weight: 700; color: #00ff88; margin-bottom: 15px; }
    .slide-2 .feature-item { display: flex; align-items: flex-start; margin-bottom: 15px; }
    .slide-2 .feature-icon { color: #00d4ff; margin-right: 15px; font-size: 20px; padding-top: 3px; }
    .slide-2 .feature-text { flex: 1; font-size: 16px; line-height: 1.5; }
    .slide-2 .feature-text strong { color: #00ff88; }
    .slide-2 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #333333; position: absolute; top: 100px; left: 0; }
    .slide-2 .comparison-table th { background-color: #000000; color: #00d4ff; padding: 12px; text-align: left; font-size: 16px; font-weight: 500; border: 1px solid #333333; }
    .slide-2 .comparison-table td { padding: 10px 12px; border: 1px solid #333333; font-size: 15px; background-color: #1a1a1a; }
    .slide-2 .comparison-table tr:nth-child(even) td { background-color: #222222; }
    .slide-2 .chart-container { width: 90%; height: 250px; border-radius: 8px; padding: 15px; position: absolute; bottom: 0px; left: 0; }
    .slide-2 .section-title { font-size: 20px; font-weight: 700; color: #00d4ff; margin-bottom: 15px; text-align: center; }
    .slide-2 .highlight { color: #00ff88; }

    /* --- SLIDE 3 STYLES --- */
    .slide-3 { font-family: 'Noto Sans KR', sans-serif; background-color: #ffffff; color: #333333; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-3 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-3 .header { background-color: #9B59B6; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; }
    .slide-3 .header-title { font-size: 24px; font-weight: 700; }
    .slide-3 .header-subtitle { font-size: 16px; font-weight: 400; }
    .slide-3 .content { display: flex; flex: 1; padding: 30px; position: relative; }
    .slide-3 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-3 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-3 .title { font-size: 26px; font-weight: 700; color: #4A90E2; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-3 .subtitle { font-size: 20px; font-weight: 600; color: #E91E63; position: absolute; top: 130px; left: 0px; }
    .slide-3 .value-items { margin-top: 20px; position: absolute; top: 200px; left: 0px; width: 90%; }
    .slide-3 .value-item { display: flex; align-items: flex-start; margin-bottom: 20px; }
    .slide-3 .value-icon { margin-right: 15px; font-size: 28px; }
    .slide-3 .value-content { flex: 1; }
    .slide-3 .value-title { font-size: 18px; font-weight: 700; margin-bottom: 5px; line-height: 1.4; }
    .slide-3 .value-description { font-size: 15px; line-height: 1.5; }
    .slide-3 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #e0e0e0; position: absolute; top: 60px; left: 0px; }
    .slide-3 .comparison-table th { padding: 12px; text-align: left; font-size: 15px; font-weight: 500; border: 1px solid #e0e0e0; }
    .slide-3 .comparison-table td { padding: 10px 12px; border: 1px solid #e0e0e0; font-size: 14px; }
    .slide-3 .chart-container { width: 90%; height: 260px; position: absolute; bottom: 0px; left: 0px; }
    .slide-3 .section-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; text-align: center; }
    .slide-3 .icon-blue { color: #4A90E2; }
    .slide-3 .icon-purple { color: #9B59B6; }
    .slide-3 .icon-pink { color: #E91E63; }
    .slide-3 .th-blue { background-color: #4A90E2; color: white; }
    .slide-3 .th-purple { background-color: #9B59B6; color: white; }
    .slide-3 .th-green { background-color: #4CAF50; color: white; }
    .slide-3 .tr-blue { background-color: #EBF5FF; }
    .slide-3 .tr-purple { background-color: #F6EFFE; }
    .slide-3 .tr-green { background-color: #EEFBEE; }
</style>
</head>
<body>
<div class="slide-container">
    <!-- SLIDE 1: What and Why -->
    <div class="slide-1">
        <div class="header">
            <div class="header-title">Live HTML Editor</div>
            <div class="header-subtitle">Breaking the Boundary Between Code and Design</div>
        </div>
        <div class="main-content">
            <div class="left-column">
                <h1 class="title">What & Why?</h1>
                <div class="divider"></div>
                <p class="subtitle">A solution that dramatically reduces the time from idea to result by combining the power of a code editor with the intuitiveness of a design tool.</p>
                <div class="problem-list">
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-code-branch"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">Separated Work Environments</div>
                            <div>Inefficiencies and repetitive revisions arising from developers viewing code, designers viewing mockups, and planners viewing documents.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-user-slash"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">High Entry Barrier</div>
                            <div>The difficulty of making even simple web content modifications without coding knowledge.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-file-export"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">Conversion Issues</div>
                            <div>High-accuracy conversion from HTML to PPTX allows for presentations with just a few edits.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <table class="comparison-table">
                    <thead><tr><th>Comparison</th><th>Traditional Workflow</th><th>Live HTML Editor</th></tr></thead>
                    <tbody>
                        <tr><td>Production Time</td><td>Avg. 3 hours</td><td><span class="highlight">Avg. 1 hour</span></td></tr>
                        <tr><td>Team Collaboration</td><td>Separate Tools</td><td><span class="highlight">Single Platform</span></td></tr>
                        <tr><td>Ease of Modification</td><td>Developer Needed</td><td><span class="highlight">Anyone Can Do It</span></td></tr>
                        <tr><td>Export</td><td>Single Format</td><td><span class="highlight">Multiple Formats</span></td></tr>
                        <tr><td>Learning Curve</td><td>Steep</td><td><span class="highlight">Gentle</span></td></tr>
                    </tbody>
                </table>
                <div class="chart-container"><canvas id="efficiencyChart"></canvas></div>
            </div>
        </div>
    </div>

    <!-- SLIDE 2: How is it possible? -->
    <div class="slide-2">
        <div class="header">
            <div class="header-title">How It's Possible - Core Features</div>
            <div class="header-subtitle">Live HTML Editor Pitch Deck</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">Intuitive Editing, Innovative Reusability</h1>
                <div class="feature-section fs1">
                    <h2 class="feature-title">1. Real-time Visual Editing (Beyond WYSIWYG)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-hand-pointer"></i></div>
                        <div class="feature-text"><strong>Direct Manipulation:</strong> <br>Select elements by clicking, move them by dragging, and edit text directly by double-clicking on the preview screen, just like in PowerPoint.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-sliders-h"></i></div>
                        <div class="feature-text"><strong>Detailed Control Panel:</strong> <br>Control all design properties of a selected element like font, color, margins, and shadows like a pro, without any coding knowledge.</div>
                    </div>
                </div>
                <div class="feature-section fs2">
                    <h2 class="feature-title">2. Infinite Content Scalability (One Source, Multi-Use)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="feature-text"><strong>Rebirth of PDFs:</strong> <br>When you import a static PDF document, AI automatically separates the background and text, perfectly converting it into editable, dynamic HTML content.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-powerpoint"></i></div>
                        <div class="feature-text"><strong>Intelligent Exporting:</strong> <br>Export your work not just as an image, but as a native PowerPoint (PPTX) file with live text and charts, ready for immediate presentation. (PDF, image, HTML are standard).</div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title">Feature Comparison: Standard vs <span class="highlight">Live Editor</span></h3>
                    <table class="comparison-table" style="position: absolute; top: 58px; left: 25px;">
                        <thead><tr><th>Feature</th><th>Standard HTML Editor</th><th>Live HTML Editor</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Visual Editing</strong></td><td>Limited</td><td>Fully Integrated</td></tr>
                            <tr><td><strong>Code Generation</strong></td><td>Partial</td><td>Intelligent</td></tr>
                            <tr><td><strong>PDF Conversion</strong></td><td>Impossible</td><td>AI-Based</td></tr>
                            <tr><td><strong>PPTX Export</strong></td><td>Impossible</td><td>Native Support</td></tr>
                            <tr><td><strong>Non-developer Access</strong></td><td>Low</td><td>Very High</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title">User Satisfaction Improvement</h3>
                    <div class="chart-container" style="position: absolute; top: 333px; left: 20px;"><canvas id="satisfactionChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: Expected Effects & Vision -->
    <div class="slide-3">
        <div class="header">
            <div class="header-title">What It Means for Us - Expected Effects & Vision</div>
            <div class="header-subtitle">Live HTML Editor Pitch Deck</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">Changing the Paradigm<br>of Content Creation</h1>
                <h2 class="subtitle">Customer Value</h2>
                <div class="value-items">
                    <div class="value-item">
                        <div class="value-icon icon-blue"><i class="fas fa-chart-line"></i></div>
                        <div class="value-content">
                            <div class="value-title">50% Productivity Increase</div>
                            <div class="value-description">Drastically reduces production time by integrating web page, report, and presentation creation workflows into one.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-purple"><i class="fas fa-users"></i></div>
                        <div class="value-content">
                            <div class="value-title">Role Expansion</div>
                            <div class="value-description">Non-developers (planners, designers, marketers) can directly create and modify high-quality digital content.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-pink"><i class="fas fa-coins"></i></div>
                        <div class="value-content">
                            <div class="value-title">Cost Reduction</div>
                            <div class="value-description">Rapidly produce and deploy content in-house without the need for outsourcing development or additional designer work.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title" style="color: #4A90E2;">ROI Comparative Analysis</h3>
                    <table class="comparison-table" style="position: absolute; top: 43px; left: 35px; width: 556px; height: 231px;">
                        <thead><tr><th class="th-blue">Item</th><th class="th-purple">Traditional</th><th class="th-green">Live HTML Editor</th></tr></thead>
                        <tbody>
                            <tr class="tr-blue"><td><strong>Initial Investment</strong></td><td>Medium</td><td>Low</td></tr>
                            <tr class="tr-purple"><td><strong>Maintenance Cost</strong></td><td>High</td><td>Very Low</td></tr>
                            <tr class="tr-green"><td><strong>Training Cost</strong></td><td>High</td><td>Low</td></tr>
                            <tr class="tr-blue"><td><strong>Content Output</strong></td><td>10/month</td><td>25/month</td></tr>
                            <tr class="tr-purple"><td><strong>Payback Period</strong></td><td>12 months</td><td>4 months</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title" style="color: #9B59B6;">Market Growth Forecast</h3>
                    <div class="chart-container" style="position: absolute; top: 307px; left: 35px; width: 554px; height: 223px;"><canvas id="marketGrowthChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Chart for Slide 1
    if (document.getElementById('efficiencyChart')) {
        const ctx1 = document.getElementById('efficiencyChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Editing Speed', 'Deployment Time', 'Efficiency', 'Collaboration', 'Maintenance'],
                datasets: [{
                    label: 'Traditional', data: [35, 40, 30, 25, 20], backgroundColor: '#AAAAAA',
                }, {
                    label: 'Live HTML Editor', data: [85, 90, 75, 80, 85], backgroundColor: '#FF6B35',
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } }, x: { grid: { display: false } } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Chart for Slide 2
    if (document.getElementById('satisfactionChart')) {
        const ctx2 = document.getElementById('satisfactionChart').getContext('2d');
        new Chart(ctx2, {
            type: 'radar',
            data: {
                labels: ['Usability', 'Speed', 'Quality', 'Features', 'Scalability'],
                datasets: [{
                    label: 'Standard HTML Editor', data: [40, 35, 60, 50, 30], backgroundColor: 'rgba(136, 136, 136, 0.2)',
                    borderColor: '#888888', borderWidth: 2, pointBackgroundColor: '#888888'
                }, {
                    label: 'Live HTML Editor', data: [85, 90, 85, 80, 95], backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    borderColor: '#00d4ff', borderWidth: 2, pointBackgroundColor: '#00ff88'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif", size: 12 } },
                        ticks: { backdropColor: 'transparent', color: '#888888' }
                    }
                },
                plugins: { legend: { position: 'bottom', labels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif" } } } }
            }
        });
    }

    // Chart for Slide 3
    if (document.getElementById('marketGrowthChart')) {
        const ctx3 = document.getElementById('marketGrowthChart').getContext('2d');
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    { label: 'Traditional Tool Market', data: [100, 105, 110, 112, 115, 117], backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: '#9B59B6', borderWidth: 3, tension: 0.3 },
                    { label: 'Integrated Editor Market', data: [40, 80, 130, 190, 260, 350], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: '#4CAF50', borderWidth: 3, tension: 0.3 },
                    { label: 'Live HTML Editor Share', data: [5, 15, 30, 50, 75, 110], backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: '#FF9800', borderWidth: 3, tension: 0.3 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { family: "'Noto Sans KR', sans-serif", size: 12 } } } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Market Size (in millions)', font: { family: "'Noto Sans KR', sans-serif" } }, ticks: { font: { family: "'Noto Sans KR', sans-serif" } } },
                    x: { ticks: { font: { family: "'Noto Sans KR', sans-serif" } } }
                }
            }
        });
    }
});
</script>



</body></html>
`;