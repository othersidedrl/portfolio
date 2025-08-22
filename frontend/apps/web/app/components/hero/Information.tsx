import { Paperclip, Send } from "lucide-react";
import CodeSnippet from "./CodeSnippet";
import { useTheme } from "next-themes";

const Information = () => {
  const name = "asdas";
  const rank = "Junior";
  const title = "Software Engineer";
  const subtitle = "Computer Science @Gunadarma";
  const resume_link = "sadasd";
  const contact_link = "asdasd";

  return (
    <div className="flex flex-col text-[var(--text)] font-poppins">
      <h1
        className="text-[48px] font-[400] leading-normal m-0"
        style={{
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "var(--accent)",
        }}
      >
        Hello, I'm {name}
      </h1>

      <h2
        className="text-[27px] font-normal leading-normal text-[var(--text)]"
        style={{
          textShadow: "var(--shadow)",
        }}
      >
        {rank}
        <span
          className="ml-2 text-transparent"
          style={{
            WebkitTextStrokeWidth: "0.5px",
            WebkitTextStrokeColor: "var(--text)",
          }}
        >
          {title}
        </span>
      </h2>

      <h3 className="text-[16px] font-light leading-normal text-[var(--text)]">
        {subtitle}
      </h3>

      <div className="grid grid-cols-5 h-[60px] gap-4 mt-6 w-full max-w-md font-poppins">
        {/* Resume Button - 60% */}
        <a
          href={resume_link}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3 flex items-center justify-center gap-2 bg-transparent text-[var(--text)] py-2 px-4 rounded-[15px] border border-[var(--secondary)] font-light text-[16px] leading-normal shadow transition-all duration-200 opacity-75 hover:opacity-100 hover:-translate-y-1 hover:shadow-md backdrop-blur-md"
        >
          <Paperclip
            size={18}
            className="opacity-50 group-hover:opacity-70 transition"
          />
          <span>View Resume</span>
        </a>

        {/* Contact Button - 40% */}
        <a
          href={contact_link}
          className="col-span-2 flex items-center justify-center gap-2 bg-[var(--primary)] text-[#f9f9f9] py-2 px-4 rounded-[15px] font-light text-[16px] leading-normal shadow transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:brightness-105"
        >
          <span>Contact Me</span>
          <Send
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>

      <div className="mt-6 w-full max-w-md">
        <CodeSnippet />
      </div>
    </div>
  );
};

export default Information;
