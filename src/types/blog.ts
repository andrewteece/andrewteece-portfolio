import type { ComponentType } from 'react';

export interface BlogFrontmatter {
  title: string;
  date?: string | Date;
  excerpt?: string;
  image?: string;
  tags?: string[];
  slug?: string;
  hero?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date?: string | Date;
  excerpt?: string;
  image?: string;
  tags: string[];
}

export interface BlogPostModule {
  frontmatter?: BlogFrontmatter;
  default: ComponentType<unknown>;
}
