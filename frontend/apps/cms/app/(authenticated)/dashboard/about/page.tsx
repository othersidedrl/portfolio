"use client";

import AboutForm from "./_components/AboutForm";
import CareerForm from "./_components/CareerForm";
import SkillsForm from "./_components/SkillsForm";

const AboutPage = () => {
  return (
    <div className="relative w-full p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AboutForm spans 2 rows on medium and up */}
        <div className="md:row-span-2">
          <AboutForm />
        </div>

        {/* Right Column */}
        <div className="col-span-2 flex flex-col gap-6">
          <CareerForm />
          <SkillsForm />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
