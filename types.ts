
export interface Tool {
  id: string;
  title: string;
  description: string;
  category: 'dev' | 'design' | 'productivity' | 'original';
  subcategory?: string;
  imageUrl: string;
  url: string;
  tags: string[];
  isPaid?: boolean;
  isTrending?: boolean;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type ToolCategory = 'all' | 'dev' | 'design' | 'productivity';

export type Language = 'en' | 'ko' | 'ja' | 'zh' | 'es' | 'fr' | 'de';
