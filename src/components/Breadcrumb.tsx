import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm"
      style={{ color: "var(--text-secondary)" }}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  color: isLast ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {item.label}
              </span>
            )}
            {!isLast && <span>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
