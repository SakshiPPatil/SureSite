import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <div className="h-full flex bg-[var(--bg-primary)]">
      {/* Sidebar is rendered by layout; this component is main content only */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          {/* Greeting */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">{greeting}</h2>
            <p className="text-gray-300/90">Build faster with your projects.</p>
          </div>

          {/* Three-column content: AI / Preview / Code */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* AI Assistant (30%) */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium mb-2">🤖 AI Assistant</div>
              <textarea
                placeholder="Describe your website idea..."
                className="w-full min-h-[300px] rounded-xl bg-transparent border border-white/10 p-3 outline-none resize-y placeholder:text-gray-400 text-white"
              />
              <div className="mt-3 flex gap-2">
                <button className="h-9 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white">Generate</button>
                <button className="h-9 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white">Try example</button>
              </div>
            </motion.section>

            {/* Preview (35%) */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium mb-2">👀 Preview</div>
              <div className="min-h-[300px] rounded-xl border border-white/10 bg-white/5 text-gray-400 grid place-items-center">
                Your live preview will appear here
              </div>
            </motion.section>

            {/* Code (35%) */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium mb-2">💻 Code</div>
              <div className="min-h-[300px] rounded-xl border border-white/10 bg-white/5 text-gray-400 grid place-items-center">
                Generated code will appear here
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};


