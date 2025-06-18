
import React from "react";
import { motion } from "framer-motion";
import { Search, Brain, FileText, Zap, Sparkles } from "lucide-react";

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-slate-800">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Supercharged learning with
          <span className="text-blue-500"> AI</span>
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-xl transition-colors hover:from-blue-700 hover:to-indigo-700"
        >
          Get Started
        </motion.button>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-6">
          <CardTitle>AI Explanations</CardTitle>
          <CardDescription>Search for any topic and let our AI create a personalised explanation for you.</CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-blue-400 to-cyan-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <Search className="mx-auto mb-2 h-8 w-8 text-white" />
            <span className="block text-center font-semibold text-blue-50">
              Personalized Learning
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-6">
          <CardTitle>Adaptive Learning</CardTitle>
          <CardDescription>Learning your way. Our AI adapts to your specific learner type.</CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-purple-400 to-pink-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <Brain className="mx-auto mb-2 h-8 w-8 text-white" />
            <span className="block text-center font-semibold text-purple-50">
              Smart Adaptation
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Exam AI</CardTitle>
          <CardDescription>Test yourself with Exam AI and get feedback to improve your answers.</CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <Zap className="mx-auto mb-2 h-8 w-8 text-white" />
            <span className="block text-center font-semibold text-emerald-50">
              Smart Testing
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>AI Flashcards</CardTitle>
          <CardDescription>Drop your lecture slides and let our AI magically create flashcards from them.</CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-orange-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <FileText className="mx-auto mb-2 h-8 w-8 text-white" />
            <span className="block text-center font-semibold text-red-50">
              Auto Generation
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Paper Prediction</CardTitle>
          <CardDescription>Get AI-powered predictions for upcoming question papers based on trends.</CardDescription>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <Sparkles className="mx-auto mb-2 h-8 w-8 text-white" />
            <span className="block text-center font-semibold text-indigo-50">
              Future Insights
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/30 p-8 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-2xl font-bold mb-3 text-gray-900">{children}</h3>
  );
};

const CardDescription = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-center text-gray-600 text-sm px-2">{children}</p>
  );
};
