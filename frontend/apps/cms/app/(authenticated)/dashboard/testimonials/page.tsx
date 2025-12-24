"use client";

import TestimonyForm from "./_components/TestimonyForm";
import TestimonyItems from "./_components/TestimonyItems";

const TestimonyPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-strong)]">
          Testimonials
        </h1>
        <p className="text-[var(--text-muted)] font-medium mt-1">
          Manage client feedback and social proof for your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-4 sticky top-24">
          <TestimonyForm />
        </div>
        <div className="xl:col-span-8">
          <TestimonyItems />
        </div>
      </div>
    </div>
  );
};

export default TestimonyPage;
