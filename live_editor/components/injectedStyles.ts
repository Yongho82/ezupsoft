export const injectedStyles = `
    .selected-element-highlight {
      outline: 2px solid #3b82f6 !important;
      outline-offset: 2px;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
    *:hover {
      outline: 1px dashed #a0aec0;
    }
    .selected-element-highlight:hover {
       outline: 2px solid #3b82f6 !important;
    }
    [contenteditable="true"] {
      outline: 2px solid #dc2626 !important; /* Changed from green to red for editing state */
      cursor: text;
    }
    .is-dragging, .is-dragging * {
        user-select: none !important;
        -webkit-user-select: none !important;
        cursor: move !important;
    }
    #mini-toolbar {
        position: absolute;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        display: flex;
        gap: 4px;
        padding: 4px;
        z-index: 10000;
        transform: translateY(-100%) translateY(-8px);
        transition: opacity 0.1s ease-in-out;
    }
    #mini-toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        color: #4a5568;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #mini-toolbar button:hover {
        background-color: #f1f3f5;
        color: #1a202c;
    }
    .drag-ghost {
      position: absolute;
      pointer-events: none;
      opacity: 0.7;
      z-index: 10001;
    }
    .drop-zone-highlight {
        outline: 2px dashed #3b82f6 !important;
        outline-offset: 2px;
        background-color: rgba(59, 130, 246, 0.1);
    }
    .drop-placeholder {
        background-color: rgba(59, 130, 246, 0.3);
        flex-shrink: 0;
    }
    /* Animation Keyframes */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(var(--anim-distance, 20px)); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(calc(var(--anim-distance, 20px) * -1)); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(calc(var(--anim-distance, 20px) * -1)); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(var(--anim-distance, 20px)); }
        to { opacity: 1; transform: translateX(0); }
    }
    /* Animation Classes */
    .anim-fade-in {
        animation-name: fadeIn;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-up {
        animation-name: slideUp;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-down {
        animation-name: slideDown;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-in-left {
        animation-name: slideInLeft;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-in-right {
        animation-name: slideInRight;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
  `;
