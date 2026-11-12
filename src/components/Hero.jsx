import React from 'react';

export default function Hero() {
  return (
    <section className="bg-slate-950 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
          React + Tailwind CSS v4
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Build modern web applications <span className="text-blue-500">faster than ever</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">
          Combine the component architecture of React with utility-first CSS styling to construct responsive, performant user interfaces.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-lg shadow-blue-600/30">
            Explore Documentation
          </button>
          <button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-6 py-3 rounded-lg border border-slate-700 transition-colors cursor-pointer">
            View Source Code
          </button>
        </div>
      </div>
    </section>
  );
}