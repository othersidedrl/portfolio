"use client";

import AboutForm from "./_components/AboutForm";
import CareerForm from "./_components/CareerForm";
import SkillsForm from "./_components/SkillsForm";

const AboutPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--text-strong)]">About Page</h1>
        <p className="text-[var(--text-muted)] font-medium mt-1">Manage your biography, technical skills, and career journey.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* AboutForm spans 5 columns on extra large desktop */}
        <div className="xl:col-span-5 sticky top-24">
          <AboutForm />
        </div>

        {/* Right Column: Career and Skills */}
        <div className="xl:col-span-7 flex flex-col gap-8">
          <CareerForm />
          <SkillsForm />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
