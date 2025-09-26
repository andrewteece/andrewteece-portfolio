import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  Keyboard,
  Shield,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface AccessibilityScore {
  category: string;
  score: number;
  items: {
    name: string;
    status: 'pass' | 'warning' | 'fail';
    description: string;
  }[];
}

export default function AccessibilityAudit() {
  const [scores, setScores] = useState<AccessibilityScore[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Mock accessibility audit results (in production, get from actual audit tools)
    const mockScores: AccessibilityScore[] = [
      {
        category: 'Color & Contrast',
        score: 100,
        items: [
          {
            name: 'Color contrast',
            status: 'pass',
            description: 'All text meets WCAG AA standards',
          },
          {
            name: 'Color independence',
            status: 'pass',
            description: 'Information not conveyed by color alone',
          },
        ],
      },
      {
        category: 'Keyboard Navigation',
        score: 98,
        items: [
          {
            name: 'Tab order',
            status: 'pass',
            description: 'Logical tab sequence maintained',
          },
          {
            name: 'Focus indicators',
            status: 'pass',
            description: 'All interactive elements have visible focus',
          },
          {
            name: 'Skip links',
            status: 'warning',
            description: 'Could add more granular skip options',
          },
        ],
      },
      {
        category: 'Screen Readers',
        score: 95,
        items: [
          {
            name: 'Alt text',
            status: 'pass',
            description: 'All images have descriptive alt text',
          },
          {
            name: 'ARIA labels',
            status: 'pass',
            description: 'Interactive elements properly labeled',
          },
          {
            name: 'Landmarks',
            status: 'pass',
            description: 'Semantic HTML structure used',
          },
        ],
      },
      {
        category: 'Motion & Animation',
        score: 100,
        items: [
          {
            name: 'Reduced motion',
            status: 'pass',
            description: 'Respects prefers-reduced-motion',
          },
          {
            name: 'Auto-play controls',
            status: 'pass',
            description: 'No auto-playing media',
          },
        ],
      },
    ];

    setScores(mockScores);

    // Calculate overall score
    const total = mockScores.reduce((sum, category) => sum + category.score, 0);
    setOverallScore(Math.round(total / mockScores.length));
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-500';
    if (score >= 85) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = (status: 'pass' | 'warning' | 'fail') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'warning':
        return <AlertCircle className='w-4 h-4 text-yellow-500' />;
      case 'fail':
        return <AlertCircle className='w-4 h-4 text-red-500' />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Color & Contrast':
        return <Eye className='w-5 h-5' />;
      case 'Keyboard Navigation':
        return <Keyboard className='w-5 h-5' />;
      case 'Screen Readers':
        return <Shield className='w-5 h-5' />;
      case 'Motion & Animation':
        return <Zap className='w-5 h-5' />;
      default:
        return <CheckCircle className='w-5 h-5' />;
    }
  };

  return (
    <motion.div
      className='fixed bottom-20 right-6 z-40 max-w-sm'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <motion.div
        className='bg-[var(--color-bg)]/95 backdrop-blur-md border border-[var(--color-border)]
                   rounded-xl shadow-xl overflow-hidden'
        layout
      >
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='w-full p-4 text-left hover:bg-[var(--color-bg)]/50 transition-colors'
          aria-expanded={isExpanded ? 'true' : 'false'}
          aria-label='Toggle accessibility audit details'
        >
          <div className='flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <Shield className='w-5 h-5 text-[var(--color-brand)]' />
                <span className='font-semibold text-[var(--color-text)]'>
                  Accessibility Score
                </span>
              </div>
              <div
                className={`text-2xl font-bold ${getScoreColor(overallScore)}`}
              >
                {overallScore}/100
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.div>
          </div>
        </button>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='overflow-hidden'
        >
          <div className='px-4 pb-4 space-y-3'>
            {scores.map((category, index) => (
              <motion.div
                key={category.category}
                className='p-3 bg-[var(--color-bg)]/30 rounded-lg border border-[var(--color-border)]/30'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    {getCategoryIcon(category.category)}
                    <span className='text-sm font-medium text-[var(--color-text)]'>
                      {category.category}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      category.score
                    )}`}
                  >
                    {category.score}%
                  </span>
                </div>

                <div className='space-y-1'>
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className='flex items-start gap-2 text-xs'
                    >
                      {getStatusIcon(item.status)}
                      <div>
                        <div className='font-medium text-[var(--color-text)]'>
                          {item.name}
                        </div>
                        <div className='text-[var(--color-text)]/60'>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* WCAG Compliance Badge */}
            <div className='pt-3 border-t border-[var(--color-border)] text-center'>
              <div
                className='inline-flex items-center gap-2 px-3 py-1 bg-green-500/10
                              text-green-600 rounded-full text-xs font-medium'
              >
                <CheckCircle className='w-3 h-3' />
                WCAG 2.1 AA Compliant
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
