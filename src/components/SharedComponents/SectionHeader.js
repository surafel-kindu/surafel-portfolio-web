function SectionHeader({ title }) {
    return (
        <div className="mb-10 md:mb-14 flex w-full flex-row items-center gap-3 md:gap-4">
            <div className="h-px flex-grow bg-ink/10"></div>
            <div className="h-2 w-2 rotate-45 bg-orange-pop"></div>
            <h2 className="text-center font-display text-3xl font-extrabold uppercase tracking-tight text-ink md:text-5xl">
                {title}
            </h2>
            <div className="h-2 w-2 rotate-45 bg-orange-pop"></div>
            <div className="h-px flex-grow bg-ink/10"></div>
        </div>
    );
}

export default SectionHeader;
