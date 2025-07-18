export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
};

export type BlogPostModule = {
  default: React.FC;
  frontmatter?: BlogPost;
  attributes?: BlogPost;
  meta?: {
    frontmatter?: BlogPost;
  };
};
