import { ReactNode } from "react";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  children?: ReactNode;
}

export default function PageHeader({
  label,
  title,
  description,
  meta,
  children,
}: PageHeaderProps) {
  return (
    <section className="pt-20 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {children}
        <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
          {label}
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
            {description}
          </p>
        )}
        {meta}
      </div>
    </section>
  );
}
