import { useState, useRef, useEffect } from 'react';
const FAQItem = ({ question, children,isOpen, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 背景與縮放狀態 (expanded)
  const contentRef = useRef(null);
  // 監聽 isOpen 的變化，用來處理背景色延遲 (expanded class)
  useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
    } else {
      // 收合時，延遲 300ms 才移除背景色，對應 SCSS
      const timer = setTimeout(() => setIsExpanded(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  return (
    <div className="accordion" id="faqAccordion">
      <div className={`faq-item py-6 fs-md-5 fs-6 ${isExpanded ? 'expanded' : ''}`}>
        <button 
          className="faq-question d-flex w-100 justify-content-between align-items-center text-gray-900 fs-md-5 fs-6"
          onClick={onToggle}
          aria-expanded={isOpen}
          style={{ cursor: 'pointer' }}
        >
          <strong className="title">{question}</strong>
          <span className="faq-icon material-symbols-outlined">chevron_right</span>
        </button>

          <div ref={contentRef}
          className={`faq-answer mt-2 accordion-body${isOpen ? 'show' : 'collapse'}`}
          style={{ 
                maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)' 
              }}>
                {children}
          </div>
      </div>
    </div>
)}
export default FAQItem;