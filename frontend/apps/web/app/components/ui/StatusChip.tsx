export default function StatusChip() {
  return (
    <div className="w-[115px] h-[20px] border border-[var(--color-secondary)] rounded-[15px] flex items-center justify-center bg-transparent text-[#212427] font-poppins text-[11px] font-normal leading-none not-italic">
      <span className="w-[8px] h-[8px] rounded-[100px] bg-[#1AD321] shadow-[0px_0px_2px_0px_#1AD321] inline-block mr-2 animate-pulse"></span>
      <span className="opacity-75 text-[var(--text)]">Darel is online.</span>
    </div>
  );
}
