export type Translation = {
  [key: string]: string | Translation;
};

export const translations: { [key: string]: Translation } = {
  ko: {
    header: {
      title: "라이브 HTML 스튜디오",
      languageChange: "언어 변경",
      languageToggleTooltip: "영어/한국어 전환",
      manual: "설명서",
      layers: "레이어",
      extractText: "문자추출",
      newFile: "새 파일",
      import: "불러오기",
      importHtml: "html",
      importPdf: "pdf",
      importPptx: "pptx",
      importImg: "img",
      previewSize: "미리보기 크기 조정",
      previewScale: "미리보기 확대/축소",
      editControls: "편집",
      showAllText: "모든 텍스트 표시",
      hideAllText: "모든 텍스트 숨기기",
      splitView: "HTML + 미리보기",
      editorView: "HTML",
      previewView: "미리보기",
      newTabView: "새탭미리보기",
      download: "다운로드",
      downloadHtml: "html",
      downloadPdf: "pdf",
      downloadPptx: "pptx",
      downloadImage: "img",
      downloadPptxLoading: "PPTX 다운로드 (로딩 중...)",
      downloadPptxError: "PPTX 다운로드 (오류)",
      downloadPdfLoading: "PDF 다운로드 (로딩 중...)",
      downloadPdfError: "PDF 다운로드 (오류)",
    },
    controls: {
        history: { title: "작업 내역", undo: "실행 취소", redo: "다시 실행" },
        pageSize: { title: "페이지 크기", width: "W", height: "H", apply: "적용" },
        insert: { 
            title: "삽입",
            layoutBox: "레이아웃 박스", text: "텍스트", button: "기본 버튼", loginForm: "로그인 폼",
            table: "표", chart: "차트", image: "이미지", video: "동영상", icon: "아이콘", shape: "도형"
        },
        interaction: { title: "인터랙션", hoverEdit: "호버 효과 편집" },
        alignment: { title: "정렬", left: "왼쪽 맞춤", center: "가운데 맞춤", right: "오른쪽 맞춤" },
        layout: { 
            title: "레이아웃", 
            zIndex: "Z-Index", 
            position: "위치 기준",
            positions: {
                static: "기본",
                relative: "맞춤",
                absolute: "자유형",
                fixed: "고정",
                sticky: "스티키"
            }
        },
        format: {
            title: "서식", font: "글꼴", fontSize: "글꼴 크기", selectFontSize: "글꼴 크기 선택",
            color: "글자 색", bold: "굵게", italic: "기울임꼴", underline: "밑줄", strikethrough: "취소선",
            link: "링크 삽입/편집", alignLeft: "왼쪽 정렬", alignCenter: "가운데 정렬", alignRight: "오른쪽 정렬",
            alignTop: "위쪽 정렬", alignMiddle: "중간 정렬", alignBottom: "아래쪽 정렬", lineHeight: "줄 간격"
        },
        background: { title: "배경", elementBg: "요소 배경색", pageBg: "페이지 배경색" },
        multiSelect: { title: "다중 선택", mode: "다중 선택 모드" },
        spacing: { title: "간격", marginPadding: "여백 편집" },
        effects: { title: "크기 및 효과" },
        style: {
            title: "꾸미기", border: "테두리:", corner: "모서리:",
            borderColor: "테두리 색",
            borderStyles: {
                solid: "실선", dashed: "파선", dotted: "점선", double: "이중선", groove: "홈 파인",
                ridge: "융기", inset: "안쪽", outset: "바깥쪽", none: "없음"
            }
        },
        buttonStyle: {
            title: "버튼 스타일",
            presets: { basic: "기본", outline: "외곽선", text: "텍스트" }
        },
        shadow: {
            title: "그림자",
            presets: { none: "없음", sm: "작게", md: "중간", lg: "크게" }
        },
        animation: {
            title: "애니메이션",
            presets: {
                fadeIn: "나타나기",
                slideUp: "올라오기",
                slideInLeft: "왼쪽에서",
                slideDown: "위쪽에서",
                slideInRight: "오른쪽에서",
                remove: "애니메이션 제거"
            }
        },
        speed: { title: "속도", duration: "애니메이션 속도 (초)", slower: "더 느리게", faster: "더 빠르게" },
        distance: {
            title: "진입 거리",
            pixels: "픽셀",
            more: "더 멀리",
            less: "더 가깝게"
        }
    },
    editor: {
      clearCode: "전체 {{tab}} 코드 삭제",
      clearCodeShort: "전체코드삭제",
    },
    layers: {
      title: "레이어",
      show: "보이기",
      hide: "숨기기",
      empty: "표시할 레이어가 없습니다."
    },
    adLoading: {
      titleDownload: "작업 처리 중",
      titleImport: "파일 변환 중",
      preparing: "다운로드 준비 중...",
      generating: "{{fileType}} 파일 생성 중...",
      finalizing: "최종 확인 중... 잠시만 기다려 주세요.",
      almostDone: "거의 완료되었습니다!",
      downloadComplete: "변환 완료되어 다운로드완료 되었습니다.",
      footerDownload: "광고가 표시되는 동안 다운로드가 백그라운드에서 준비됩니다.",
      footerImport: "광고가 표시되는 동안 파일 변환이 백그라운드에서 준비됩니다.",
    },
    importLoading: {
      complete: "변환이 완료 되었습니다.",
    },
    loading: {
      pdf: "PDF 파일 변환 중...",
      pptx: "PPTX 파일 변환 중...",
      imageImport: "이미지 파일 불러오는 중...",
      pdfAnalysis: "PDF 파일을 분석하는 중...",
      pdfPage: "페이지 {{current}}/{{total}} 변환 중...",
      pptxAnalysis: "PPTX 파일 분석 중...",
      pptxGenerate: "PPTX 파일 생성 중...",
      pdfGenerate: "PDF 파일 생성 중...",
      imageGenerate: "이미지 생성 중...",
    },
    errors: {
      unknown: "알 수 없는 오류가 발생했습니다.",
      pdfLibrary: "PDF 라이브러리를 로드할 수 없습니다. 잠시 후 다시 시도해주세요.",
      pdfProcess: "PDF 처리 실패: {{message}}",
      pptxProcess: "PPTX 처리 실패: {{message}}",
      pptxGenerate: "PPTX 생성에 실패했습니다:\n{{message}}",
      pdfGenerate: "PDF 생성에 실패했습니다:\n{{message}}",
      imageLibrary: "Image generation library not loaded.",
      imageDownload: "이미지 다운로드에 실패했습니다.",
      imageProcessError: "이미지 파일 처리 중 오류가 발생했습니다.",
      slideElementNotFound: "PPTX로 변환할 슬라이드 요소를 찾을 수 없습니다. (예: <div class='slide-1'>, <div class='slide-item'>, 또는 <div class='slide-container'>)",
      ocrPreviewError: "미리보기 내용을 찾을 수 없어 텍스트를 추출할 수 없습니다.",
      ocrLibraryError: "텍스트 추출 라이브러리(Tesseract, Canvas)를 로드하지 못했습니다.",
      ocrProcessError: "텍스트 추출 과정에서 오류가 발생했습니다.",
    },
    ocr: {
        title: "텍스트 추출 결과",
        loading: "이미지에서 텍스트를 추출하는 중입니다...",
        copy: "클립보드로 복사",
        copied: "복사됨!",
        noTextFound: "추출할 수 있는 텍스트를 찾지 못했습니다.",
    },
    pptxConverter: {
        slideProcess: "슬라이드 {{current}}/{{total}} 변환 중...",
    },
    manual: {
        title: "라이브 HTML 편집기 사용 설명서",
        // Sections
        intro: "소개",
        layout: "화면 구성",
        gettingStarted: "시작하기",
        coreFeatures: "핵심 편집 기능",
        controlsGuide: "컨트롤 패널 상세 가이드",
        advanced: "고급 기능",
        shortcuts: "단축키",
    },
    newFilePopover: {
        title: "템플릿으로 시작하기",
        customSize: "사용자 지정 크기",
        create: "생성",
    },
    templates: {
        blankCanvas: { name: "빈 캔버스", description: "1280x720px", content: '<h1 style="font-family: sans-serif; color: #333;">여기에 콘텐츠를 추가하세요</h1>' },
        presentation: { name: "프레젠테이션 (16:9)", description: "1280x720px", content: '<div style="width: 90%; text-align: center;"><h1 style="font-family: sans-serif; font-size: 48px; color: #333;">제목 슬라이드</h1><p style="font-family: sans-serif; font-size: 24px; color: #666;">부제목을 입력하세요</p></div>' },
        a4: { name: "A4 문서 (세로)", description: "794x1123px", content: '<div style="width: 90%; padding: 40px; box-sizing: border-box; text-align: left; font-family: serif;"><h1 style="font-size: 28px;">문서 제목</h1><p style="line-height: 1.6;">문서 내용을 여기에 작성하세요.</p></div>' },
        mobile: { name: "모바일 화면 (세로)", description: "375x667px", content: '<div style="width: 100%; height: 100%; display: flex; flex-direction: column; font-family: sans-serif; background: #f8f9fa;"><div style="padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; font-weight: 500;">헤더</div><div style="flex-grow: 1; padding: 16px;">콘텐츠 영역</div></div>' },
        social: { name: "소셜 미디어 (1:1)", description: "1080x1080px", content: '<div style="text-align: center;"><h2 style="font-family: sans-serif; font-size: 80px; color: #333;">주목받는 콘텐츠</h2><p style="font-family: sans-serif; font-size: 32px; color: #666;">#해시태그 #라이브에디터</p></div>' },
        banner: { name: "웹 배너 (가로)", description: "728x90px", content: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-around; font-family: sans-serif; background: #e9ecef;"><strong style="font-size: 20px;">놀라운 제품!</strong><button style="padding: 8px 16px; font-size: 14px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">더 알아보기</button></div>' },
        custom: { name: "사용자 지정", description: "{{width}}x{{height}}px", content: '<h1 style="font-family: sans-serif; color: #333;">사용자 지정 캔버스</h1>' }
    },
    colorPicker: {
        custom: "사용자 지정..."
    },
    interactionPopover: {
        title: "호버 (Hover) 스타일",
        hoverTextColor: "Hover 글자 색",
        hoverBgColor: "Hover 배경 색"
    },
    linkPopover: {
        title: "링크 편집",
        urlLabel: "URL",
        targetLabel: "열기 방식",
        currentTab: "현재 탭",
        newTab: "새 탭",
        parentFrame: "부모 프레임",
        topFrame: "최상위 프레임",
        remove: "링크 제거",
        apply: "적용"
    },
    effectsPopover: {
        size: "크기",
        width: "너비",
        height: "높이",
        effects: "효과",
        opacity: "투명도",
        reset: "효과 초기화"
    },
    iconPopover: {
        search: "아이콘 검색..."
    },
    imagePopover: {
        title: "이미지 URL로 삽입",
        insert: "삽입",
        or: "또는",
        upload: "로컬 파일에서 업로드"
    },
    videoPopover: {
        title: "동영상 URL로 삽입",
        placeholder: "Youtube, Vimeo, .mp4 URL",
        insert: "삽입",
        or: "또는",
        upload: "로컬 파일에서 업로드"
    },
    tablePopover: {
        title: "표 크기 설정",
        rows: "행 (Rows)",
        cols: "열 (Columns)",
        insert: "삽입"
    },
    shapePopover: {
        title: "도형 삽입",
        rectangle: "사각형",
        circle: "원",
        oval: "타원",
        triangle: "삼각형",
        line: "선"
    },
    layoutPresetPopover: {
        title: "레이아웃 프리셋",
        singleBox: "단일 박스",
        twoCol: "2단 (50/50)",
        threeCol: "3단",
        contentSidebar: "콘텐츠+사이드바",
        headerFooter: "헤더/푸터",
        imageText: "이미지+텍스트",
        custom: "사용자 지정",
        rows: "행",
        cols: "열",
        gap: "간격",
        create: "생성"
    },
    chartPopover: {
        title: "차트 삽입",
        bar: "막대",
        line: "선",
        pie: "파이",
        doughnut: "도넛",
        chartTitle: "차트 제목",
        chartTitlePlaceholder: "예: 월별 매출",
        dataLabels: "데이터 라벨 (쉼표로 구분)",
        dataLabelsPlaceholder: "예: 1월, 2월, 3월",
        datasets: "데이터 계열",
        seriesName: "계열 {{index}} 이름",
        dataValues: "데이터 값",
        addSeries: "+ 데이터 계열 추가",
        removeSeries: "계열 삭제",
        colorTheme: "색상 테마",
        customColors: "사용자 지정 색상",
        insert: "삽입",
        themes: {
            vivid: "선명하게",
            pastel: "파스텔",
            office: "오피스",
            black: "블랙",
            primary: "원색",
            simple: "심플",
            custom: "사용자 지정"
        },
        colorN: "색상 {{index}}"
    },
    lineHeightPopover: {
      title: "줄 간격",
      default: "기본값으로"
    }
  },
  en: {
    header: {
      title: "Live HTML Studio",
      languageChange: "Language",
      languageToggleTooltip: "Switch to English/Korean",
      manual: "Manual",
      layers: "Layers",
      extractText: "OCR",
      newFile: "New File",
      import: "Import",
      importHtml: "html",
      importPdf: "pdf",
      importPptx: "pptx",
      importImg: "img",
      previewSize: "Adjust Preview Size",
      previewScale: "Preview Zoom",
      editControls: "Edit",
      showAllText: "Show All Text",
      hideAllText: "Hide All Text",
      splitView: "HTML + Preview",
      editorView: "HTML",
      previewView: "Preview",
      newTabView: "Preview in New Tab",
      download: "Download",
      downloadHtml: "html",
      downloadPdf: "pdf",
      downloadPptx: "pptx",
      downloadImage: "img",
      downloadPptxLoading: "Download PPTX (Loading...)",
      downloadPptxError: "Download PPTX (Error)",
      downloadPdfLoading: "Download PDF (Loading...)",
      downloadPdfError: "Download PDF (Error)",
    },
    controls: {
        history: { title: "History", undo: "Undo", redo: "Redo" },
        pageSize: { title: "Page Size", width: "W", height: "H", apply: "Apply" },
        insert: { 
            title: "Insert",
            layoutBox: "Layout Box", text: "Text", button: "Button", loginForm: "Login Form",
            table: "Table", chart: "Chart", image: "Image", video: "Video", icon: "Icon", shape: "Shape"
        },
        interaction: { title: "Interaction", hoverEdit: "Edit Hover Effects" },
        alignment: { title: "Alignment", left: "Align Left", center: "Align Center", right: "Align Right" },
        layout: { 
            title: "Layout", 
            zIndex: "Z-Index", 
            position: "Position",
            positions: {
                static: "Static",
                relative: "Relative",
                absolute: "Absolute",
                fixed: "Fixed",
                sticky: "Sticky"
            }
        },
        format: {
            title: "Format", font: "Font", fontSize: "Font Size", selectFontSize: "Select Font Size",
            color: "Text Color", bold: "Bold", italic: "Italic", underline: "Underline", strikethrough: "Strikethrough",
            link: "Insert/Edit Link", alignLeft: "Align Left", alignCenter: "Align Center", alignRight: "Align Right",
            alignTop: "Align Top", alignMiddle: "Align Middle", alignBottom: "Align Bottom", lineHeight: "Line Height"
        },
        background: { title: "Background", elementBg: "Element Background", pageBg: "Page Background" },
        multiSelect: { title: "Multi-Select", mode: "Multi-Select Mode" },
        spacing: { title: "Spacing", marginPadding: "Edit Spacing" },
        effects: { title: "Size & Effects" },
        style: {
            title: "Style", border: "Border:", corner: "Corner:",
            borderColor: "Border Color",
            borderStyles: {
                solid: "Solid", dashed: "Dashed", dotted: "Dotted", double: "Double", groove: "Groove",
                ridge: "Ridge", inset: "Inset", outset: "Outset", none: "None"
            }
        },
        buttonStyle: {
            title: "Button Style",
            presets: { basic: "Basic", outline: "Outline", text: "Text" }
        },
        shadow: {
            title: "Shadow",
            presets: { none: "None", sm: "Small", md: "Medium", lg: "Large" }
        },
        animation: {
            title: "Animation",
            presets: {
                fadeIn: "Fade In",
                slideUp: "Slide Up",
                slideInLeft: "Slide In Left",
                slideDown: "Slide Down",
                slideInRight: "Slide In Right",
                remove: "Remove Animation"
            }
        },
        speed: { title: "Speed", duration: "Animation Duration (s)", slower: "Slower", faster: "Faster" },
        distance: {
            title: "Entry Distance",
            pixels: "pixels",
            more: "More",
            less: "Less"
        }
    },
    editor: {
      clearCode: "Clear all {{tab}} code",
      clearCodeShort: "Clear All",
    },
    layers: {
      title: "Layers",
      show: "Show",
      hide: "Hide",
      empty: "No layers to display."
    },
    adLoading: {
      titleDownload: "Processing Task",
      titleImport: "Converting File",
      preparing: "Preparing download...",
      generating: "Generating {{fileType}} file...",
      finalizing: "Finalizing... please wait.",
      almostDone: "Almost done!",
      downloadComplete: "Conversion and download complete.",
      footerDownload: "Download is being prepared in the background while the ad is displayed.",
      footerImport: "File conversion is being prepared in the background while the ad is displayed.",
    },
    importLoading: {
      complete: "Conversion is complete.",
    },
    loading: {
      pdf: "Converting PDF file...",
      pptx: "Converting PPTX file...",
      imageImport: "Importing image file...",
      pdfAnalysis: "Analyzing PDF file...",
      pdfPage: "Converting page {{current}}/{{total}}...",
      pptxAnalysis: "Analyzing PPTX file...",
      pptxGenerate: "Generating PPTX file...",
      pdfGenerate: "Generating PDF file...",
      imageGenerate: "Generating image...",
    },
    errors: {
      unknown: "An unknown error occurred.",
      pdfLibrary: "Could not load the PDF library. Please try again later.",
      pdfProcess: "PDF processing failed: {{message}}",
      pptxProcess: "PPTX processing failed: {{message}}",
      pptxGenerate: "Failed to generate PPTX:\n{{message}}",
      pdfGenerate: "Failed to generate PDF:\n{{message}}",
      imageLibrary: "Image generation library not loaded.",
      imageDownload: "Failed to download image.",
      imageProcessError: "An error occurred while processing the image file.",
      slideElementNotFound: "Could not find slide elements to convert to PPTX. (e.g., <div class='slide-1'>, <div class='slide-item'>, or <div class='slide-container'>)",
      ocrPreviewError: "Cannot extract text because the preview content could not be found.",
      ocrLibraryError: "Failed to load text extraction libraries (Tesseract, Canvas).",
      ocrProcessError: "An error occurred during the text extraction process.",
    },
    ocr: {
        title: "Text Extraction Result",
        loading: "Extracting text from image...",
        copy: "Copy to Clipboard",
        copied: "Copied!",
        noTextFound: "Could not find any text to extract.",
    },
    pptxConverter: {
        slideProcess: "Converting slide {{current}}/{{total}}...",
    },
    manual: {
        title: "Live HTML Editor Manual",
        // Sections
        intro: "Introduction",
        layout: "Screen Layout",
        gettingStarted: "Getting Started",
        coreFeatures: "Core Editing Features",
        controlsGuide: "Controls Panel Guide",
        advanced: "Advanced Features",
        shortcuts: "Keyboard Shortcuts",
    },
    newFilePopover: {
        title: "Start with a Template",
        customSize: "Custom Size",
        create: "Create",
    },
    templates: {
        blankCanvas: { name: "Blank Canvas", description: "1280x720px", content: '<h1 style="font-family: sans-serif; color: #333;">Add your content here</h1>' },
        presentation: { name: "Presentation (16:9)", description: "1280x720px", content: '<div style="width: 90%; text-align: center;"><h1 style="font-family: sans-serif; font-size: 48px; color: #333;">Title Slide</h1><p style="font-family: sans-serif; font-size: 24px; color: #666;">Enter your subtitle</p></div>' },
        a4: { name: "A4 Document (Portrait)", description: "794x1123px", content: '<div style="width: 90%; padding: 40px; box-sizing: border-box; text-align: left; font-family: serif;"><h1 style="font-size: 28px;">Document Title</h1><p style="line-height: 1.6;">Start writing your document here.</p></div>' },
        mobile: { name: "Mobile Screen (Portrait)", description: "375x667px", content: '<div style="width: 100%; height: 100%; display: flex; flex-direction: column; font-family: sans-serif; background: #f8f9fa;"><div style="padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; font-weight: 500;">Header</div><div style="flex-grow: 1; padding: 16px;">Content Area</div></div>' },
        social: { name: "Social Media (1:1)", description: "1080x1080px", content: '<div style="text-align: center;"><h2 style="font-family: sans-serif; font-size: 80px; color: #333;">Engaging Content</h2><p style="font-family: sans-serif; font-size: 32px; color: #666;">#hashtag #liveeditor</p></div>' },
        banner: { name: "Web Banner (Landscape)", description: "728x90px", content: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-around; font-family: sans-serif; background: #e9ecef;"><strong style="font-size: 20px;">Amazing Product!</strong><button style="padding: 8px 16px; font-size: 14px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Learn More</button></div>' },
        custom: { name: "Custom Size", description: "{{width}}x{{height}}px", content: '<h1 style="font-family: sans-serif; color: #333;">Custom Canvas</h1>' }
    },
    colorPicker: {
        custom: "Custom..."
    },
    interactionPopover: {
        title: "Hover Styles",
        hoverTextColor: "Hover Text Color",
        hoverBgColor: "Hover Background Color"
    },
    linkPopover: {
        title: "Edit Link",
        urlLabel: "URL",
        targetLabel: "Target",
        currentTab: "Current Tab",
        newTab: "New Tab",
        parentFrame: "Parent Frame",
        topFrame: "Top Frame",
        remove: "Remove Link",
        apply: "Apply"
    },
    effectsPopover: {
        size: "Size",
        width: "Width",
        height: "Height",
        effects: "Effects",
        opacity: "Opacity",
        reset: "Reset Effects"
    },
    iconPopover: {
        search: "Search icons..."
    },
    imagePopover: {
        title: "Insert Image by URL",
        insert: "Insert",
        or: "or",
        upload: "Upload from local file"
    },
    videoPopover: {
        title: "Insert Video by URL",
        placeholder: "Youtube, Vimeo, .mp4 URL",
        insert: "Insert",
        or: "or",
        upload: "Upload from local file"
    },
    tablePopover: {
        title: "Set Table Size",
        rows: "Rows",
        cols: "Columns",
        insert: "Insert"
    },
    shapePopover: {
        title: "Insert Shape",
        rectangle: "Rectangle",
        circle: "Circle",
        oval: "Oval",
        triangle: "Triangle",
        line: "Line"
    },
    layoutPresetPopover: {
        title: "Layout Presets",
        singleBox: "Single Box",
        twoCol: "2-Col (50/50)",
        threeCol: "3-Col",
        contentSidebar: "Content+Sidebar",
        headerFooter: "Header/Footer",
        imageText: "Image+Text",
        custom: "Custom Grid",
        rows: "Rows",
        cols: "Cols",
        gap: "Gap",
        create: "Create"
    },
    chartPopover: {
        title: "Insert Chart",
        bar: "Bar",
        line: "Line",
        pie: "Pie",
        doughnut: "Doughnut",
        chartTitle: "Chart Title",
        chartTitlePlaceholder: "e.g., Monthly Sales",
        dataLabels: "Data Labels (comma-separated)",
        dataLabelsPlaceholder: "e.g., Jan, Feb, Mar",
        datasets: "Data Series",
        seriesName: "Series {{index}} Name",
        dataValues: "Data Values",
        addSeries: "+ Add Data Series",
        removeSeries: "Remove Series",
        colorTheme: "Color Theme",
        customColors: "Custom Colors",
        insert: "Insert",
        themes: {
            vivid: "Vivid",
            pastel: "Pastel",
            office: "Office",
            black: "Black",
            primary: "Primary",
            simple: "Simple",
            custom: "Custom"
        },
        colorN: "Color {{index}}"
    },
    lineHeightPopover: {
      title: "Line Height",
      default: "Reset to Default"
    }
  }
};