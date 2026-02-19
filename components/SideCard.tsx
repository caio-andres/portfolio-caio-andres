export type SideCardData = {
  label: string;
  stat?: string;
  title: string;
  href?: string;
  bg: string;
  borderClass: string;
  labelClass: string;
};

export default function SideCard({ card }: { card: SideCardData }) {
  const className = `group relative overflow-hidden flex-1 flex flex-col justify-between p-2 bg-clip-padding transition-all duration-300 ${card.borderClass}`;
  const style = {
    backgroundImage: `url('${card.bg}')`,
    backgroundSize: "cover" as const,
    backgroundPosition: "center" as const,
  };

  const content = (
    <>
      <div className="absolute inset-0 bg-black/75 group-hover:bg-black/65 transition-all duration-300" />
      <div className="relative z-10 flex items-start justify-between gap-2">
        <span className={`font-mono text-[9px] uppercase tracking-widest ${card.labelClass}`}>
          {card.label}
        </span>
      </div>
      <p className="relative z-10 text-[10px] font-semibold text-white whitespace-pre-line leading-tight">
        {card.title}
      </p>
    </>
  );

  if (card.href) {
    return (
      <a href={card.href} rel="noopener noreferrer" className={className} style={style}>
        {content}
      </a>
    );
  }

  return <div className={className} style={style}>{content}</div>;
}
