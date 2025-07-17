export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image?: string;
  tags?: string[];
}

export interface BlogPostModule {
  frontmatter: BlogPost;
  default: React.FC;
}
