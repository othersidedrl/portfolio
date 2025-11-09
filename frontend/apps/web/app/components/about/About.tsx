"use client";

import Card from "./Card";
import { TechnicalSkills } from "./TechnicalSkills";
import { CareerJourney } from "./CareerJourney";

export default function AboutSection() {
    return (
        <section className="w-full">
            <div className="flex flex-col items-center gap-6 mx-auto">
                <h1 className="text-[36px] font-semibold text-[var(--text)]">About Me</h1>
                <div className="w-[80px] h-[2px] bg-[var(--text)]"></div>
                <p className="text-[20px] text-[var(--text)] opacity-50 text-center w-[80%]">Third-year Informatics student with a strong passion for Competitive Programming and Backend Development. Skilled in problem-solving, building scalable backend systems. </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-12 mx-auto">
                <Card title="25" description="Projects Completed"/>
                <Card title="1+" description="Years of Experience"/>
                <Card title="1.928" description="GitHub Contributions"/>
                <Card title="74 WPM" description="Typing Speed"/>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-12 mx-auto">
                <div>
                    <h1 className="text-[27px] font-bold text-[var(--text)] mb-4">Technical Skills</h1>
                    <TechnicalSkills/>
                </div>
                <div>
                    <h1 className="text-[27px] font-bold text-[var(--text)] mb-4">Career Journey</h1>
                    <CareerJourney />
                </div>
            </div>
        </section>
    );
}