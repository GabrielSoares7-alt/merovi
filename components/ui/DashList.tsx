import { ScrollReveal } from "@/components/ui/ScrollReveal";

type DashListProps = {
  items: string[];
  className?: string;
  /** Reveal items one after another on scroll instead of rendering statically. */
  stagger?: boolean;
};

/** A muted list with a dash marker — reused wherever copy needs a plain, unstyled list (deliverables, principles) rather than a bulleted `<ul>`. */
export function DashList({ items, className, stagger }: DashListProps) {
  const listItems = items.map((item) => (
    <li key={item} className="flex gap-2 text-muted">
      <span aria-hidden="true" className="shrink-0 text-foreground">
        –
      </span>
      <span>{item}</span>
    </li>
  ));

  if (stagger) {
    return (
      <ScrollReveal
        as="ul"
        className={`flex flex-col ${className ?? ""}`}
        stagger
        y={12}
      >
        {listItems}
      </ScrollReveal>
    );
  }

  return <ul className={`flex flex-col ${className ?? ""}`}>{listItems}</ul>;
}
