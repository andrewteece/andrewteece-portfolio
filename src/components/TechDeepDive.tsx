import { motion } from 'framer-motion';
import {
  ChevronRight,
  Lightbulb,
  Target,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';

interface TechDeepDiveProps {
  title: string;
  challenge: string;
  solution: string;
  impact: {
    performance?: string;
    business?: string;
    technical?: string;
  };
  technicalDecisions: string[];
  lessonsLearned: string[];
  architecture?: string;
}

export default function TechDeepDive({
  title,
  challenge,
  solution,
  impact,
  technicalDecisions,
  lessonsLearned,
  architecture,
}: TechDeepDiveProps) {
  const [activeSection, setActiveSection] = useState<string>('challenge');

  const sections = [
    { id: 'challenge', label: 'Challenge', icon: Target, content: challenge },
    { id: 'solution', label: 'Solution', icon: Lightbulb, content: solution },
    { id: 'impact', label: 'Impact', icon: TrendingUp, content: null },
    { id: 'technical', label: 'Technical', icon: Wrench, content: null },
  ];

  return (
    <motion.div
      className='w-full max-w-6xl mx-auto bg-gradient-to-br from-[var(--color-bg)]/80 to-[var(--color-bg)]/60
                 backdrop-blur-md border border-[var(--color-border)]/50 rounded-2xl p-8 shadow-2xl'
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className='text-center mb-8'>
        <motion.h3
          className='text-2xl font-bold text-[var(--color-brand)] mb-2'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title} - Technical Deep Dive
        </motion.h3>
        <div className='w-24 h-1 bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-accent)] mx-auto rounded-full' />
      </div>

      {/* Section Navigation */}
      <div className='flex flex-wrap justify-center gap-2 mb-8'>
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-[var(--color-brand)] text-white shadow-lg'
                  : 'bg-[var(--color-bg)]/40 text-[var(--color-text)]/70 hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <IconComponent size={16} />
              {section.label}
            </motion.button>
          );
        })}
      </div>

      {/* Content Area */}
      <motion.div
        className='min-h-[300px]'
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'challenge' && (
          <div className='space-y-4'>
            <div className='flex items-center gap-3 mb-4'>
              <Target className='text-red-500' size={24} />
              <h4 className='text-xl font-semibold text-[var(--color-text)]'>
                The Challenge
              </h4>
            </div>
            <p className='text-[var(--color-text)]/80 leading-relaxed text-lg'>
              {challenge}
            </p>
          </div>
        )}

        {activeSection === 'solution' && (
          <div className='space-y-4'>
            <div className='flex items-center gap-3 mb-4'>
              <Lightbulb className='text-yellow-500' size={24} />
              <h4 className='text-xl font-semibold text-[var(--color-text)]'>
                The Solution
              </h4>
            </div>
            <p className='text-[var(--color-text)]/80 leading-relaxed text-lg'>
              {solution}
            </p>
            {architecture && (
              <div className='mt-6 p-4 bg-[var(--color-bg)]/30 rounded-lg border border-[var(--color-border)]/30'>
                <h5 className='font-medium text-[var(--color-text)] mb-2'>
                  Architecture Overview
                </h5>
                <p className='text-sm text-[var(--color-text)]/70'>
                  {architecture}
                </p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'impact' && (
          <div className='space-y-6'>
            <div className='flex items-center gap-3 mb-4'>
              <TrendingUp className='text-green-500' size={24} />
              <h4 className='text-xl font-semibold text-[var(--color-text)]'>
                Measurable Impact
              </h4>
            </div>

            <div className='grid md:grid-cols-3 gap-4'>
              {impact.performance && (
                <motion.div
                  className='p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg border border-blue-500/20'
                  whileHover={{ scale: 1.02 }}
                >
                  <h5 className='font-medium text-blue-400 mb-2'>
                    Performance
                  </h5>
                  <p className='text-[var(--color-text)]/80 text-sm'>
                    {impact.performance}
                  </p>
                </motion.div>
              )}

              {impact.business && (
                <motion.div
                  className='p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg border border-green-500/20'
                  whileHover={{ scale: 1.02 }}
                >
                  <h5 className='font-medium text-green-400 mb-2'>Business</h5>
                  <p className='text-[var(--color-text)]/80 text-sm'>
                    {impact.business}
                  </p>
                </motion.div>
              )}

              {impact.technical && (
                <motion.div
                  className='p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg border border-purple-500/20'
                  whileHover={{ scale: 1.02 }}
                >
                  <h5 className='font-medium text-purple-400 mb-2'>
                    Technical
                  </h5>
                  <p className='text-[var(--color-text)]/80 text-sm'>
                    {impact.technical}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'technical' && (
          <div className='space-y-6'>
            <div className='flex items-center gap-3 mb-4'>
              <Wrench className='text-[var(--color-brand)]' size={24} />
              <h4 className='text-xl font-semibold text-[var(--color-text)]'>
                Technical Decisions & Lessons
              </h4>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h5 className='font-medium text-[var(--color-text)] mb-3 flex items-center gap-2'>
                  <ChevronRight
                    size={16}
                    className='text-[var(--color-brand)]'
                  />
                  Key Technical Decisions
                </h5>
                <div className='space-y-2'>
                  {technicalDecisions.map((decision, index) => (
                    <motion.div
                      key={index}
                      className='text-sm text-[var(--color-text)]/80 flex items-start gap-2'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='w-1.5 h-1.5 bg-[var(--color-brand)] rounded-full mt-2 flex-shrink-0' />
                      {decision}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className='font-medium text-[var(--color-text)] mb-3 flex items-center gap-2'>
                  <ChevronRight
                    size={16}
                    className='text-[var(--color-accent)]'
                  />
                  Lessons Learned
                </h5>
                <div className='space-y-2'>
                  {lessonsLearned.map((lesson, index) => (
                    <motion.div
                      key={index}
                      className='text-sm text-[var(--color-text)]/80 flex items-start gap-2'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className='w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0' />
                      {lesson}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
