import { FiFileText } from "react-icons/fi";

function ResumeButton() {
    return (
        <div className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 md:flex">
            <span className="hidden rounded-xl border border-ink/10 bg-white px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-chip group-hover:block">
                My Resume
            </span>
            <a
                href="https://drive.google.com/file/d/1YdgtBKL8E4Z2CPAqwrG8wVhfFskMiMs_/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                aria-label="Resume"
                className="grid h-14 w-14 place-items-center rounded-full bg-ink text-lime-pop shadow-chip transition-all duration-300 hover:scale-110 hover:bg-orange-pop hover:text-white">
                <FiFileText size={20} />
            </a>
        </div>
    );
}

export default ResumeButton;
