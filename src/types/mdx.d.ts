import type { ComponentType } from 'react';
import type { BlogFrontmatter } from './blog';

declare module '*.mdx' {
  export const frontmatter: BlogFrontmatter;
  const MDXComponent: ComponentType<unknown>;
  export default MDXComponent;
}
