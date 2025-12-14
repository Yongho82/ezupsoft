import { Tool } from './types';

// Asset URLs
export const ASSETS = {
  // Hero Slider Images - Using brighter, cleaner tech images
  SLIDE_HTML: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
  SLIDE_PDF: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop",
  SLIDE_CATCH: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",

  // Tool Previews
  PREVIEW_HTML: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", 
  PREVIEW_PDF: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2670&auto=format&fit=crop", 
  PREVIEW_CATCH: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop", 

  // Thumbnails
  THUMB_DEV: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop", 
  THUMB_DESIGN: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
  THUMB_PROD: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop",
  THUMB_SUBMIT: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=800&auto=format&fit=crop",
};

// Actual Tools Data - Using translation keys for title and description
export const TOOLS: Tool[] = [
  {
    id: 'html-studio',
    title: 'html.title',
    description: 'html.desc',
    category: 'dev',
    subcategory: 'EDITOR',
    imageUrl: ASSETS.THUMB_DEV,
    url: '/live-html',
    tags: ['HTML', 'Converter'],
    isPaid: false,
    isTrending: true
  },
  {
    id: 'pdf-tool',
    title: 'pdf.title',
    description: 'pdf.desc',
    category: 'design',
    subcategory: 'UTILITY',
    imageUrl: ASSETS.THUMB_DESIGN,
    url: '/live-pdf',
    tags: ['PDF', 'Secure'],
    isPaid: false,
    isTrending: true
  },
  {
    id: 'catch-capture',
    title: 'catch.title',
    description: 'catch.desc',
    category: 'productivity',
    subcategory: 'DESKTOP APP',
    imageUrl: ASSETS.THUMB_PROD,
    url: '/catch-capture',
    tags: ['Capture', 'OCR'],
    isPaid: false,
    isTrending: true
  }
];