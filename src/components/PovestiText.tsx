import { Fragment, ReactNode } from "react";

/**
 * Vykreslí text obsahu hry: odstavce oddělené prázdným řádkem,
 * **tučné** a *kurzíva* podle jednoduchého markdownového značení.
 */

export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const PovestiText = ({ text, className }: { text: string; className?: string }) => (
  <div className={className}>
    {text.split(/\n\s*\n/).map((paragraph, i) => (
      <p key={i}>{renderInline(paragraph)}</p>
    ))}
  </div>
);

export default PovestiText;
