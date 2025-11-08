import Card from "./Card";

export default function AboutSection() {
    return (
        <section className="w-full">
            <div className="flex flex-col items-center gap-6 w-[80%] mx-auto">
                <h1 className="text-[36px] font-semibold text-[var(--text)]">About Me</h1>
                <div className="w-[80px] h-[2px] bg-[var(--text)]"></div>
                <p className="text-[20px] text-[var(--text)] opacity-50 text-center">Third-year Informatics student with a strong passion for Competitive Programming and Backend Development. Skilled in problem-solving, building scalable backend systems. </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 w-[80%] mt-12 mx-auto">
                <Card title="25" description="Projects Completed"/>
                <Card title="1+" description="Years of Experience"/>
                <Card title="1.928" description="GitHub Contributions"/>
                <Card title="74 WPM" description="Typing Speed"/>
            </div>
        </section>
    );
}