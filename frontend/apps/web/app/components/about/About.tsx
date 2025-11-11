"use client";

import Card from "./Card";
import { TechnicalSkills } from "./TechnicalSkills";
import { CareerJourney } from "./CareerJourney";
import { Stats } from "./Stats";

export default function AboutSection() {
    return (
        <section className="w-full text-[var(--text-normal)]">
            <div className="mx-auto flex flex-col items-center gap-6 text-center">
                <h1 className="text-[36px] font-semibold text-[var(--text-strong)]">About Me</h1>
                <div className="h-[2px] w-[80px] rounded-full bg-[var(--border-color)]" />
                <p className="w-[80%] text-[20px] text-[var(--text-muted)]">Third-year Informatics student with a strong passion for Competitive Programming and Backend Development. Skilled in problem-solving, building scalable backend systems. </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-12 mx-auto">
                <Card title="25" description="Projects Completed"/>
                <Card title="1+" description="Years of Experience"/>
                <Card title="1.928" description="GitHub Contributions"/>
                <Card title="74 WPM" description="Typing Speed"/>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-12 mx-auto">
                <div>
                    <h1 className="mb-4 text-[27px] font-bold text-[var(--text-strong)]">Technical Skills</h1>
                    <TechnicalSkills/>
                </div>
                <div>
                    <h1 className="mb-4 text-[27px] font-bold text-[var(--text-strong)]">Career Journey</h1>
                    <CareerJourney />
                </div>
            </div>
            <Stats />
        </section>
    );
}
