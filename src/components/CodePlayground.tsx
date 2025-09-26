import { motion } from 'framer-motion';
import { Code2, Eye, Play } from 'lucide-react';
import { useState } from 'react';

interface CodePlaygroundProps {
  title: string;
  description: string;
  initialCode: string;
  preview?: React.ComponentType;
}

export default function CodePlayground({
  title,
  description,
  initialCode,
  preview: PreviewComponent,
}: CodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className='w-full max-w-4xl mx-auto bg-[var(--color-bg)]/80 backdrop-blur-sm border border-[var(--color-border)] rounded-xl overflow-hidden shadow-xl'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='px-6 py-4 bg-[var(--color-bg)]/40 border-b border-[var(--color-border)]'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-[var(--color-text)]'>
              {title}
            </h3>
            <p className='text-sm text-[var(--color-text)]/70 mt-1'>
              {description}
            </p>
          </div>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className='px-3 py-1 text-xs font-medium rounded-md bg-[var(--color-brand)]/10 text-[var(--color-brand)]
                       hover:bg-[var(--color-brand)]/20 transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </motion.button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='flex border-b border-[var(--color-border)]'>
        <motion.button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'code'
              ? 'text-[var(--color-brand)] border-b-2 border-[var(--color-brand)] bg-[var(--color-brand)]/5'
              : 'text-[var(--color-text)]/70 hover:text-[var(--color-text)]'
          }`}
          whileHover={{ y: -1 }}
        >
          <Code2 size={16} />
          Code
        </motion.button>

        {PreviewComponent && (
          <motion.button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'preview'
                ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                : 'text-[var(--color-text)]/70 hover:text-[var(--color-text)]'
            }`}
            whileHover={{ y: -1 }}
          >
            <Eye size={16} />
            Preview
          </motion.button>
        )}
      </div>

      {/* Content */}
      <motion.div
        className='overflow-hidden'
        animate={{ height: isExpanded ? 'auto' : '300px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {activeTab === 'code' && (
          <div className='relative'>
            <pre className='p-6 text-sm bg-[var(--color-bg)]/20 text-[var(--color-text)] overflow-x-auto'>
              <code className='language-tsx'>{initialCode}</code>
            </pre>

            {/* Copy button */}
            <motion.button
              className='absolute top-4 right-4 p-2 text-xs bg-[var(--color-bg)]/80 text-[var(--color-text)]/70
                         rounded-md hover:text-[var(--color-text)] transition-colors'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigator.clipboard.writeText(initialCode).catch(console.error);
              }}
            >
              Copy
            </motion.button>
          </div>
        )}

        {activeTab === 'preview' && PreviewComponent && (
          <div className='p-6 bg-gradient-to-br from-[var(--color-bg)]/10 to-[var(--color-bg)]/5'>
            <div className='flex items-center gap-2 mb-4 text-sm text-[var(--color-text)]/70'>
              <Play size={14} />
              Live Preview
            </div>
            <div className='min-h-[200px] flex items-center justify-center border border-dashed border-[var(--color-border)] rounded-lg'>
              <PreviewComponent />
            </div>
          </div>
        )}
      </motion.div>

      {/* Status indicator */}
      <div className='px-6 py-3 bg-[var(--color-bg)]/20 border-t border-[var(--color-border)] flex items-center justify-between'>
        <div className='flex items-center gap-2 text-xs text-[var(--color-text)]/60'>
          <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
          Interactive Demo
        </div>
        <div className='text-xs text-[var(--color-text)]/60'>
          React + TypeScript + Framer Motion
        </div>
      </div>
    </motion.div>
  );
}
