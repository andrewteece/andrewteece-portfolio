import type { ReactNode } from 'react';
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiMaterialdesign,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiVite,
  SiDocker,
  SiVitest,
  SiJest,
  SiFigma,
  SiAdobephotoshop,
  SiStorybook,
} from 'react-icons/si';

export type Tech = {
  label: string;
  icon: ReactNode; // ✅ React element, not a type
  color?: string; // Tailwind classes for bg/text
  glow?: string; // optional glow/shadow classes
  link?: string; // optional external link
  pulse?: boolean; // optional animated glow
};

// ✅ Custom logo served from /public/icons
const ClerkIcon = () => (
  <img src='/icons/clerk.svg' alt='Clerk' className='w-4 h-4' />
);

// If you later use a local SVG for Zod, do this:
// import zodLogo from '../assets/zod.svg';
// const ZodIcon = () => <img src={zodLogo} alt="Zod" className="w-4 h-4" />;

export const techGroups: Record<string, Tech[]> = {
  Frontend: [
    {
      label: 'HTML5',
      icon: <SiHtml5 />,
      color: 'bg-[#E34F26] text-white',
      glow: 'shadow-[0_0_8px_#E34F26]',
    },
    {
      label: 'CSS3',
      icon: <SiCss3 />,
      color: 'bg-[#1572B6] text-white',
      glow: 'shadow-[0_0_8px_#1572B6]',
    },
    {
      label: 'SASS',
      icon: <SiSass />,
      color: 'bg-[#CC6699] text-white',
      glow: 'shadow-[0_0_8px_#CC6699]',
    },
    {
      label: 'JavaScript',
      icon: <SiJavascript />,
      color: 'bg-[#F7DF1E] text-black',
      glow: 'shadow-[0_0_8px_#F7DF1E]',
    },
    {
      label: 'TypeScript',
      icon: <SiTypescript />,
      color: 'bg-[#3178C6] text-white',
      glow: 'shadow-[0_0_8px_#3178C6]',
    },
    {
      label: 'React',
      icon: <SiReact />,
      color: 'bg-[#61DAFB] text-black',
      glow: 'shadow-[0_0_8px_#61DAFB]',
    },
    {
      label: 'Next.js',
      icon: <SiNextdotjs />,
      color: 'bg-black text-white',
      glow: 'shadow-[0_0_8px_rgba(0,0,0,0.6)]',
    },
    {
      label: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      color: 'bg-[#06B6D4] text-black',
      glow: 'shadow-[0_0_8px_#06B6D4]',
    },
    {
      label: 'Bootstrap',
      icon: <SiBootstrap />,
      color: 'bg-[#7952B3] text-white',
      glow: 'shadow-[0_0_8px_#7952B3]',
    },
    {
      label: 'MUI',
      icon: <SiMaterialdesign />,
      color: 'bg-[#007FFF] text-white',
      glow: 'shadow-[0_0_8px_#007FFF]',
    },
    // { label: 'Zod', icon: <ZodIcon />, color: 'bg-[#3068B7] text-white', glow: 'shadow-[0_0_8px_#3068B7]' },
    {
      label: 'Clerk',
      icon: <ClerkIcon />,
      color: 'bg-gradient-to-r from-[#6E56CF] to-[#A78BFA] text-white',
      glow: 'shadow-[0_0_8px_#A78BFA]',
      link: 'https://clerk.com',
    },
  ],
  'Backend / Tools': [
    {
      label: 'Prisma',
      icon: <SiPrisma />,
      color: 'bg-[#0C344B] text-white',
      glow: 'shadow-[0_0_8px_#0C344B]',
    },
    {
      label: 'PostgreSQL',
      icon: <SiPostgresql />,
      color: 'bg-[#336791] text-white',
      glow: 'shadow-[0_0_8px_#336791]',
    },
    {
      label: 'MongoDB',
      icon: <SiMongodb />,
      color: 'bg-[#47A248] text-white',
      glow: 'shadow-[0_0_8px_#47A248]',
    },
    {
      label: 'Vite',
      icon: <SiVite />,
      color: 'bg-gradient-to-r from-[#646CFF] to-[#FFD62E] text-black',
      glow: 'shadow-[0_0_8px_#646CFF]',
    },
    {
      label: 'Docker',
      icon: <SiDocker />,
      color: 'bg-[#2496ED] text-white',
      glow: 'shadow-[0_0_8px_#2496ED]',
    },
    {
      label: 'Vitest',
      icon: <SiVitest />,
      color: 'bg-[#6E9F18] text-white',
      glow: 'shadow-[0_0_8px_#6E9F18]',
    },
    {
      label: 'Jest',
      icon: <SiJest />,
      color: 'bg-[#C21325] text-white',
      glow: 'shadow-[0_0_8px_#C21325]',
    },
  ],
  Design: [
    {
      label: 'Figma',
      icon: <SiFigma />,
      color:
        'bg-gradient-to-r from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] text-white',
      glow: 'shadow-[0_0_8px_#A259FF]',
    },
    {
      label: 'Adobe Photoshop',
      icon: <SiAdobephotoshop />,
      color: 'bg-[#31A8FF] text-black',
      glow: 'shadow-[0_0_8px_#31A8FF]',
    },
    {
      label: 'Storybook',
      icon: <SiStorybook />,
      color:
        'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white',
      glow: 'shadow-[0_0_8px_#FF4785]',
      link: 'https://sb9-showcase-ddnduoyeu-andrewteeces-projects.vercel.app/storybook/?path=/docs/docs-intro--docs',
      pulse: true,
    },
  ],
};

// Flat list for compact rows, etc.
export const allTech: Tech[] = Object.values(techGroups).flat();
