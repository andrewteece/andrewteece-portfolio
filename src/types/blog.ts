export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image?: string;
}

export interface BlogPostModule {
  frontmatter: BlogPost;
  default: React.FC;
}
