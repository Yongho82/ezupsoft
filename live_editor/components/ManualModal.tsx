import React, { useEffect, useRef } from 'react';
import { TFunction } from '../hooks/useTranslations';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TFunction;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose, t }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-200 pb-2 mb-3">{title}</h3>
      <div className="text-gray-600 space-y-2 text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
  
  const Key: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">{children}</kbd>
  );

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in-down"
        style={{ animation: 'fade-in-down 0.3s ease-out forwards' }}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            <i className="fas fa-book-open text-blue-500 mr-3"></i>
            {t('manual.title')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          <Section title={t('manual.intro')}>
            <p>라이브 HTML 편집기에 오신 것을 환영합니다! 이 강력한 도구는 코딩과 디자인의 경계를 허물어줍니다. 코드를 직접 편집하고, 실시간 미리보기에서 요소를 시각적으로 조작하며, 다양한 스타일을 적용하여 웹 페이지, 프레젠테이션, 문서 등을 손쉽게 제작할 수 있습니다. 또한, PDF나 PPTX 파일을 불러와 편집 가능한 웹 콘텐츠로 변환하는 혁신적인 기능도 제공합니다.</p>
          </Section>

          <Section title={t('manual.layout')}>
            <p><strong>1. 헤더:</strong> 화면 상단에는 파일 관리(새 파일, 불러오기, 내보내기), 보기 모드 변경, 미리보기 제어, 레이어 패널 열기 등 핵심 기능 버튼들이 위치합니다.</p>
            <p><strong>2. 코드 편집기:</strong> 좌측(분할 모드 시)에는 HTML, CSS, JavaScript 코드를 작성할 수 있는 탭 기반 편집기가 있습니다.</p>
            <p><strong>3. 실시간 미리보기:</strong> 우측(분할 모드 시)에는 코드 변경 사항이 즉시 반영되는 미리보기 화면이 표시됩니다. 이 화면에서 직접 요소를 클릭하여 선택하고 편집할 수 있습니다.</p>
            <p><strong>4. 컨트롤 패널:</strong> '편집' 버튼을 클릭하면 나타나는 패널로, 선택된 요소의 스타일(글꼴, 색상, 레이아웃 등)을 상세하게 조정할 수 있습니다.</p>
            <p><strong>5. 레이어 패널:</strong> 문서의 전체 구조를 트리 형태로 확인하고, 복잡한 요소들을 쉽게 선택하고 관리할 수 있습니다.</p>
          </Section>

          <Section title={t('manual.gettingStarted')}>
            <p><strong>새 파일 만들기:</strong> 헤더의 '새 파일' 버튼을 클릭하세요. '빈 캔버스', '프레젠테이션' 등 다양한 템플릿을 선택하거나, '사용자 지정 크기'에 너비와 높이를 직접 입력하여 새 작업을 시작할 수 있습니다.</p>
            <p><strong>파일 불러오기:</strong> 헤더의 '불러오기' 섹션에서 원하는 파일 형식 버튼을 클릭하여 기존 파일을 가져올 수 있습니다.
              <ul className="list-disc list-inside mt-2 ml-4">
                <li><strong>HTML:</strong> 기존 웹 페이지를 그대로 불러와 편집을 계속할 수 있습니다.</li>
                <li><strong>PDF:</strong> 정적인 PDF를 분석하여 배경과 텍스트, 이미지가 분리된 편집 가능한 HTML로 변환합니다.</li>
                <li><strong>PPTX:</strong> 파워포인트 파일을 분석하여 각 슬라이드를 HTML 요소로 변환하여 웹 콘텐츠로 재활용할 수 있습니다.</li>
              </ul>
            </p>
          </Section>

          <Section title={t('manual.coreFeatures')}>
             <p><strong>미리보기 화면 조작:</strong>
              <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                <li><strong>선택:</strong> 편집할 요소를 클릭하여 선택합니다.</li>
                <li><strong>다중 선택:</strong> <Key>Shift</Key> 키를 누른 채 여러 요소를 클릭하거나, 컨트롤 패널의 '다중 선택' 모드를 활성화한 후 드래그하여 여러 요소를 한 번에 선택할 수 있습니다.</li>
                <li><strong>텍스트 수정:</strong> 텍스트 요소를 더블 클릭하면 내용을 직접 수정할 수 있습니다.</li>
                <li><strong>이동 & 크기 조절:</strong> `position: absolute` 스타일이 적용된 요소는 드래그하여 위치를 자유롭게 옮길 수 있습니다. 요소를 선택하면 나타나는 핸들을 드래그하여 크기를 조절할 수 있습니다.</li>
                <li><strong>요소 복제 & 삭제:</strong> 요소를 선택하면 좌측 상단에 나타나는 미니 툴바의 아이콘을 클릭하여 복제하거나 삭제할 수 있습니다.</li>
                <li><strong>드래그 앤 드롭:</strong> 일반적인 요소(absolute가 아닌)를 드래그하여 다른 컨테이너 박스로 옮기거나 순서를 변경할 수 있습니다.</li>
              </ul>
            </p>
            <p><strong>코드 에디터 사용:</strong> 좌측의 에디터에서 HTML, CSS, JavaScript 코드를 직접 수정할 수 있습니다. 변경사항은 즉시 우측 미리보기 화면에 반영됩니다.</p>
          </Section>
          
          <Section title={t('manual.controlsGuide')}>
            <p>컨트롤 패널은 선택된 요소에 따라 활성화되며, 다음과 같은 다양한 스타일을 시각적으로 제어할 수 있습니다.</p>
            <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
              <li><strong>작업 내역:</strong> 실행 취소(<Key>Ctrl+Z</Key>) 및 다시 실행(<Key>Ctrl+Y</Key>).</li>
              <li><strong>페이지 크기:</strong> 전체 문서/슬라이드의 크기 조절 및 배경색 지정.</li>
              <li><strong>삽입:</strong> 텍스트, 버튼, 레이아웃 박스부터 표, 차트, 이미지, 비디오, 아이콘, 도형 등 다양한 요소를 페이지에 추가합니다.</li>
              <li><strong>인터랙션:</strong> 요소에 마우스를 올렸을 때(Hover)의 글자색, 배경색 등 동적인 효과를 설정합니다.</li>
              <li><strong>정렬 & 레이아웃:</strong> 선택된 요소의 정렬, 위치 기준(`position`), 쌓임 순서(`z-index`) 등을 제어합니다.</li>
              <li><strong>서식:</strong> 글꼴, 크기, 색상, 굵기/기울임 등의 텍스트 스타일과 링크를 설정합니다.</li>
              <li><strong>간격 & 효과:</strong> Margin, Padding 등 외부/내부 여백과 요소의 크기, 투명도를 조절합니다.</li>
              <li><strong>꾸미기:</strong> 테두리, 모서리 둥글기, 그림자 효과, 미리 정의된 버튼 스타일을 적용합니다.</li>
              <li><strong>애니메이션:</strong> 나타나기, 올라오기 등 간단한 CSS 애니메이션 효과와 속도를 조절합니다.</li>
            </ul>
          </Section>

          <Section title={t('manual.advanced')}>
            <p><strong>레이어 패널:</strong> 복잡하게 겹쳐있거나 찾기 힘든 요소를 트리 구조에서 쉽게 찾아 선택하거나 숨김/표시 처리할 수 있습니다. 패널 자체를 드래그하여 원하는 위치로 이동시킬 수 있습니다.</p>
            <p><strong>내보내기:</strong> 작업물을 웹 표준 <strong>HTML</strong> 파일, 인쇄용 <strong>PDF</strong>, 발표용 <strong>PPTX</strong>, 그리고 <strong>이미지(PNG)</strong> 파일로 저장할 수 있습니다.</p>
            <p><strong>새 탭에서 미리보기:</strong> 실제 웹 환경과 유사한 새 탭에서 결과물을 확인합니다. 슬라이드 구조가 있을 경우 프레젠테이션 컨트롤러가 함께 제공되어 발표 모드로 활용할 수 있습니다.</p>
          </Section>
            
          <Section title={t('manual.shortcuts')}>
            <ul className="list-disc list-inside space-y-1">
                <li><Key>Ctrl</Key> / <Key>Cmd</Key> + <Key>Z</Key> : 실행 취소</li>
                <li><Key>Ctrl</Key> / <Key>Cmd</Key> + <Key>Shift</Key> + <Key>Z</Key> (또는 <Key>Ctrl</Key> + <Key>Y</Key>) : 다시 실행</li>
                <li><Key>Delete</Key> / <Key>Backspace</Key> : 선택된 요소 삭제</li>
                <li><Key>Escape</Key> : 요소 선택 해제</li>
                <li><Key>Shift</Key> + 클릭 : 다중 요소 선택/해제</li>
            </ul>
          </Section>
        </main>
      </div>
       <style>{`
        @keyframes fade-in-down { 
          from { opacity: 0; transform: translateY(-20px) scale(0.98); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
      `}</style>
    </div>
  );
};
