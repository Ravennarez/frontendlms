import React from 'react';

const features = [
  {
    title: 'Fast Performance',
    description: 'Vite provides instant server start and lightning-fast Hot Module Replacement (HMR).',
    icon: '⚡'
  },
  {
    title: 'Responsive Design',
    description: 'Utility classes allow mobile-first responsive layouts without writing custom CSS rules.',
    icon: '📱'
  },
  {
    title: 'Component Architecture',
    description: 'Modular React components make your frontend modular, testable, and reusable.',
    icon: '🧩'
  }
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Core Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-800 border border-slate-700 p-6 rounded-xl space-y-3 hover:border-slate-600 transition-all shadow-sm hover:shadow-md"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}