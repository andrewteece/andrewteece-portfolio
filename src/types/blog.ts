export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags: string[];
  readingTime?: string;
}

export interface BlogPostModule {
  default: unknown;
  frontmatter?: Partial<BlogPost>;
  meta?: { frontmatter?: Partial<BlogPost> };
  attributes?: Partial<BlogPost>;
}
