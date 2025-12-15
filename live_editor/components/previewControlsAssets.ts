export const previewControlsHtml = `
<div id="pc-top-bar">
    <div class="pc-group">
      <span class="pc-label">뷰포트</span>
      <button id="pc-desktop-btn" title="데스크탑 (1440x900)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
      </button>
      <button id="pc-tablet-btn" title="태블릿 (768x1024)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      </button>
      <button id="pc-mobile-btn" title="모바일 (375x812)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      </button>
    </div>
    <div class="pc-separator"></div>
    <div class="pc-group">
      <span class="pc-label">보기</span>
      <button id="pc-fullscreen-btn" title="전체 화면">
        <svg id="pc-fullscreen-enter-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
        <svg id="pc-fullscreen-exit-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
      </button>
      <button id="pc-print-btn" title="인쇄 미리보기">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      </button>
    </div>
    <div class="pc-separator" id="pc-slide-controls-separator" style="display: none;"></div>
    <div class="pc-group" id="pc-slide-nav-group" style="display: none;">
      <button id="pc-prev-slide-nav-btn" title="이전 슬라이드">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <span id="pc-slide-counter"></span>
      <button id="pc-next-slide-nav-btn" title="다음 슬라이드">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    <div class="pc-group pc-presentation-group" id="pc-presentation-group" style="display: none;">
       <button id="pc-presentation-btn" title="프레젠테이션 시작">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>발표 시작</span>
      </button>
    </div>
</div>
<div id="pc-on-screen-nav" class="pc-on-screen-nav">
  <button id="pc-prev-slide" title="이전 슬라이드 (←)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
  </button>
  <button id="pc-exit-presentation" title="프레젠테이션 종료 (Esc)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
  </button>
  <button id="pc-next-slide" title="다음 슬라이드 (→)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  </button>
</div>
`;

export const previewControlsCss = `
:root {
  --pc-bg-color: rgba(255, 255, 255, 0.9);
  --pc-text-color: #374151;
  --pc-border-color: #e5e7eb;
  --pc-shadow: 0 4px 12px rgba(0,0,0,0.1);
  --pc-accent-color: #3b82f6;
}
@supports (backdrop-filter: blur(10px)) {
  :root {
    --pc-bg-color: rgba(255, 255, 255, 0.8);
  }
}

body {
  padding-top: 60px; /* Make space for the top bar */
}
body .slide-container {
  padding-top: 0;
}

#pc-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--pc-bg-color);
  border-bottom: 1px solid var(--pc-border-color);
  box-shadow: var(--pc-shadow);
  z-index: 9999;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  backdrop-filter: blur(10px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: var(--pc-text-color);
}

.pc-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pc-group .pc-label {
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  color: #6b7280;
  white-space: nowrap;
}

.pc-group button {
  width: 38px;
  height: 38px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--pc-text-color);
}
.pc-group button:hover {
  background-color: rgba(0,0,0,0.05);
}
.pc-group button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: transparent;
}


.pc-separator {
  width: 1px;
  height: 28px;
  background-color: var(--pc-border-color);
}

#pc-slide-counter {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  padding: 0 4px;
  min-width: 50px;
  text-align: center;
}

.pc-presentation-group button {
  width: auto;
  padding: 0 12px;
  gap: 6px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
}
.pc-presentation-group button:hover {
  background-color: #e5e7eb;
}
.pc-presentation-group button span {
  font-size: 13px;
  font-weight: 500;
}

/* Slide-by-slide view */
body.pc-slide-view-active {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
body.pc-slide-view-active .slide-container {
    padding: 0 !important;
    width: auto !important; /* Allow container to shrink-wrap the slide */
}
body.pc-slide-view-active .slide-item, body.pc-slide-view-active [class*="slide-"] {
    display: none;
}
body.pc-slide-view-active .pc-active-slide {
    display: block !important;
}

/* Presentation Mode Styles */
html.pc-presentation-active, body.pc-presentation-active {
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
    margin: 0;
    padding: 0 !important;
    background-color: #222;
}
body.pc-presentation-active #pc-top-bar {
    display: none !important;
}
body.pc-presentation-active .slide-container {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    position: relative;
    display: block; /* Override flex */
}
/* Hide all slides by default, but keep them in the layout tree for size calculations */
body.pc-presentation-active .slide-container > * {
    visibility: hidden;
}
/* Show and style only the active slide */
body.pc-presentation-active .pc-active-presentation-slide {
    visibility: visible !important;
    display: block !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) scale(var(--slide-scale, 1));
    transform-origin: center center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.pc-on-screen-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10001;
  display: none;
  align-items: center;
  gap: 8px;
  background-color: var(--pc-bg-color);
  border: 1px solid var(--pc-border-color);
  border-radius: 24px;
  padding: 8px;
  box-shadow: var(--pc-shadow);
  backdrop-filter: blur(10px);
}
body.pc-presentation-active .pc-on-screen-nav {
  display: flex;
}
.pc-on-screen-nav button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--pc-text-color);
}
.pc-on-screen-nav button:hover {
  background-color: rgba(0,0,0,0.05);
}


/* Print styles */
@media print {
  body {
    padding-top: 0 !important;
    background-color: #fff !important;
  }
  #pc-top-bar, #pc-on-screen-nav {
    display: none !important;
  }
  @page {
    size: auto;
    margin: 0mm;
  }
  html, body {
      width: 100%;
      height: auto;
      overflow: visible !important;
  }
  .slide-container {
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
    width: auto !important;
    height: auto !important;
    gap: 0 !important;
  }
  .slide-item, [class*="slide-"] {
    page-break-after: always;
    page-break-inside: avoid;
    box-shadow: none !important;
    border: none !important;
    display: block !important;
    overflow: hidden !important;
    /* We don't force width/height, let the browser scale to fit the page */
  }
  .slide-item:last-child, [class*="slide-"]:last-child {
    page-break-after: avoid;
  }
}
`;

export const previewControlsScript = `
document.addEventListener('DOMContentLoaded', () => {
    // Top Bar Controls
    const topBar = document.getElementById('pc-top-bar');
    const desktopBtn = document.getElementById('pc-desktop-btn');
    const tabletBtn = document.getElementById('pc-tablet-btn');
    const mobileBtn = document.getElementById('pc-mobile-btn');
    
    const fullscreenBtn = document.getElementById('pc-fullscreen-btn');
    const fullscreenEnterIcon = document.getElementById('pc-fullscreen-enter-icon');
    const fullscreenExitIcon = document.getElementById('pc-fullscreen-exit-icon');
    const printBtn = document.getElementById('pc-print-btn');

    // Slide Navigation (One-by-one view)
    const slideControlsSeparator = document.getElementById('pc-slide-controls-separator');
    const slideNavGroup = document.getElementById('pc-slide-nav-group');
    const prevSlideNavBtn = document.getElementById('pc-prev-slide-nav-btn');
    const nextSlideNavBtn = document.getElementById('pc-next-slide-nav-btn');
    const slideCounter = document.getElementById('pc-slide-counter');

    // Immersive Presentation Mode
    const presentationGroup = document.getElementById('pc-presentation-group');
    const presentationBtn = document.getElementById('pc-presentation-btn');
    const onScreenNav = document.getElementById('pc-on-screen-nav');
    const prevSlideBtn = document.getElementById('pc-prev-slide');
    const nextSlideBtn = document.getElementById('pc-next-slide');
    const exitPresentationBtn = document.getElementById('pc-exit-presentation');

    let isPresentationMode = false;
    let isSlideViewMode = false;
    let slides = [];
    let currentSlideIndex = 0;

    // --- FUNCTION DEFINITIONS ---

    const resizeWindow = (width, height) => window.resizeTo(width, height);
    
    const getSlides = () => {
        return Array.from(document.querySelectorAll('.slide-item, [class*="slide-"]'))
                    .filter(el => !el.classList.contains('slide-container'));
    };

    const updateSlideCounter = () => {
        if (slides.length > 0) {
            slideCounter.textContent = \`\${currentSlideIndex + 1} / \${slides.length}\`;
            prevSlideNavBtn.disabled = currentSlideIndex === 0;
            nextSlideNavBtn.disabled = currentSlideIndex === slides.length - 1;
        }
    };
    
    const changeSlide = (newIndex) => {
        if (newIndex < 0 || newIndex >= slides.length) return;

        if (!isSlideViewMode) {
            isSlideViewMode = true;
            document.body.classList.add('pc-slide-view-active');
        }

        slides.forEach((slide, idx) => {
            slide.classList.toggle('pc-active-slide', idx === newIndex);
        });

        currentSlideIndex = newIndex;
        updateSlideCounter();
    };
    
    const scrollToSlideForPresentation = (index) => {
        if (index >= 0 && index < slides.length) {
            slides.forEach((slide, idx) => {
                const isActive = idx === index;
                slide.classList.toggle('pc-active-presentation-slide', isActive);
                if (isActive) {
                    const slideWidth = slide.offsetWidth;
                    const slideHeight = slide.offsetHeight;
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    
                    const scaleX = viewportWidth / slideWidth;
                    const scaleY = viewportHeight / slideHeight;
                    const scale = Math.min(scaleX, scaleY) * 0.95; 

                    slide.style.setProperty('--slide-scale', scale);
                }
            });
            currentSlideIndex = index;
        }
    };
    
    const exitPresentationMode = () => {
        isPresentationMode = false;
        document.documentElement.classList.remove('pc-presentation-active');
        document.body.classList.remove('pc-presentation-active');
        slides.forEach(slide => {
            slide.classList.remove('pc-active-presentation-slide');
            slide.style.removeProperty('--slide-scale');
        });
        window.removeEventListener('keydown', handlePresentationKeys);
    };

    const handlePresentationKeys = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            scrollToSlideForPresentation(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToSlideForPresentation(currentSlideIndex - 1);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            exitPresentationMode();
        }
    };
    
    const enterPresentationMode = () => {
        if (slides.length < 1) return;

        if (isSlideViewMode) {
            isSlideViewMode = false;
            document.body.classList.remove('pc-slide-view-active');
            slides.forEach(s => s.classList.remove('pc-active-slide'));
        }

        isPresentationMode = true;
        document.documentElement.classList.add('pc-presentation-active');
        document.body.classList.add('pc-presentation-active');
        
        let startingSlideIndex = currentSlideIndex;
        if (!document.body.classList.contains('pc-slide-view-active')) {
            let maxVisibility = -1;
            slides.forEach((slide, index) => {
                const rect = slide.getBoundingClientRect();
                const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
                if (visibleHeight > maxVisibility) {
                    maxVisibility = visibleHeight;
                    startingSlideIndex = index;
                }
            });
        }
        
        scrollToSlideForPresentation(startingSlideIndex);
        window.addEventListener('keydown', handlePresentationKeys);
    };

    const setupSlideControls = () => {
        slides = getSlides();
        if (slides.length > 1) {
            presentationGroup.style.display = 'flex';
            slideNavGroup.style.display = 'flex';
            slideControlsSeparator.style.display = 'block';
            updateSlideCounter();
        } else {
            presentationGroup.style.display = 'none';
            slideNavGroup.style.display = 'none';
            slideControlsSeparator.style.display = 'none';
        }
    };

    // --- EVENT LISTENERS ---
    desktopBtn.addEventListener('click', () => resizeWindow(1440, 900));
    tabletBtn.addEventListener('click', () => resizeWindow(768, 1024));
    mobileBtn.addEventListener('click', () => resizeWindow(375, 812));

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error('Fullscreen request failed:', err));
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        const isFullscreen = !!document.fullscreenElement;
        fullscreenEnterIcon.style.display = isFullscreen ? 'none' : 'block';
        fullscreenExitIcon.style.display = isFullscreen ? 'block' : 'none';
    });

    printBtn.addEventListener('click', () => window.print());

    prevSlideNavBtn.addEventListener('click', () => changeSlide(currentSlideIndex - 1));
    nextSlideNavBtn.addEventListener('click', () => changeSlide(currentSlideIndex + 1));

    presentationBtn.addEventListener('click', enterPresentationMode);
    exitPresentationBtn.addEventListener('click', exitPresentationMode);
    prevSlideBtn.addEventListener('click', () => scrollToSlideForPresentation(currentSlideIndex - 1));
    nextSlideBtn.addEventListener('click', () => scrollToSlideForPresentation(currentSlideIndex + 1));
    
    // --- INITIAL SETUP ---
    setupSlideControls();
    
    const observer = new MutationObserver(setupSlideControls);
    observer.observe(document.body, { childList: true, subtree: true });
});
`