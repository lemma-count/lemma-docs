import Link from "next/link";
import Image from "next/image";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import type { MDXComponents } from "mdx/types";
import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { HeadingCopyButton } from "@/components/heading-copy-button";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextContent(node.props.children);
  }
  return "";
}

function LinkedHeading({
  as: Tag,
  id,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  as: "h2" | "h3" | "h4";
}) {
  const headingLabel = getTextContent(children).trim() || "this section";

  return (
    <Tag
      {...props}
      id={id}
      className={["lemma-linked-heading group/heading", className]
        .filter(Boolean)
        .join(" ")}
    >
      {id ? (
        <>
          <a data-card="" href={`#${id}`}>
            {children}
          </a>
          <HeadingCopyButton
            headingId={id}
            headingLabel={headingLabel}
          />
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

function H2(props: ComponentPropsWithoutRef<"h2">) {
  return <LinkedHeading as="h2" {...props} />;
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  return <LinkedHeading as="h3" {...props} />;
}

function H4(props: ComponentPropsWithoutRef<"h4">) {
  return <LinkedHeading as="h4" {...props} />;
}

function ResponsiveTable({
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div
      className="lemma-table-wrap"
      role="region"
      aria-label="Scrollable documentation table"
      tabIndex={0}
    >
      <table
        {...props}
        className={["lemma-responsive-table", className]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}

function CardsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid gap-3 md:grid-cols-2">{children}</div>
  );
}

function DocCard({
  title,
  href,
  children,
  label,
}: {
  title: string;
  href: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="group grid min-h-28 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg border border-[var(--border)] bg-white p-4 text-left transition-colors hover:border-[var(--accent)]"
    >
      <div className="min-w-0">
        {label ? (
          <div className="mb-2 text-xs font-semibold uppercase leading-4 tracking-[0.08em] text-[var(--accent)]">
            {label}
          </div>
        ) : null}
        <h3 className="m-0 text-[15px] font-semibold leading-5 text-[var(--ink)]">
          {title}
        </h3>
        <div className="mt-2 text-sm leading-5 text-[var(--muted)] [&>p]:m-0">
          {children}
        </div>
      </div>
      <span
        aria-hidden="true"
        className="mt-0.5 text-sm leading-5 text-[var(--subtle)] transition-colors group-hover:text-[var(--accent)]"
      >
        →
      </span>
    </Link>
  );
}

function Outcome({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-6 rounded-lg border border-[var(--border)] bg-[var(--paper-deep)] p-5">
      <div className="text-sm font-semibold text-[var(--ink)]">{title}</div>
      <div className="mt-2 text-sm leading-6 text-[var(--muted)] [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

function HelpCallout({
  type = "note",
  title,
  children,
}: {
  type?: "insight" | "tip" | "note" | "warning";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    insight: {
      label: "Insight",
      border: "border-[#ccd7f5]",
      bg: "bg-[var(--accent-soft)]",
      title: "text-[var(--accent-strong)]",
      body: "text-[var(--body)]",
    },
    tip: {
      label: "Tip",
      border: "border-[#b9ddca]",
      bg: "bg-[#f1f9f4]",
      title: "text-[var(--success)]",
      body: "text-[var(--body)]",
    },
    note: {
      label: "Note",
      border: "border-[var(--border)]",
      bg: "bg-[var(--surface)]",
      title: "text-[var(--ink)]",
      body: "text-[var(--muted)]",
    },
    warning: {
      label: "Before you continue",
      border: "border-[#e5c59d]",
      bg: "bg-[#fff8ef]",
      title: "text-[var(--warning)]",
      body: "text-[var(--body)]",
    },
  }[type];

  return (
    <div
      className={`not-prose my-6 rounded-lg border ${styles.border} ${styles.bg} p-5`}
    >
      <div className={`text-sm font-semibold ${styles.title}`}>
        {title ?? styles.label}
      </div>
      <div className={`mt-2 text-sm leading-6 ${styles.body} [&>p]:m-0`}>
        {children}
      </div>
    </div>
  );
}

function ScreenshotSlot({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className="not-prose my-7 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--subtle)]">
            Screenshot needed
          </div>
          <div className="mt-1 text-base font-semibold text-[var(--ink)]">
            {title}
          </div>
        </div>
        {id ? (
          <code className="rounded border border-[var(--border)] bg-white px-2 py-1 text-xs text-[var(--muted)]">
            {id}
          </code>
        ) : null}
      </div>
      <div className="mt-3 text-sm leading-6 text-[var(--muted)] [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

function ExampleBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-6 rounded-lg border border-[#ccd7f5] bg-[var(--accent-soft)] p-5">
      <div className="text-sm font-semibold text-[var(--accent-strong)]">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-[var(--body)] [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

function TwoColumn({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-6 grid gap-3 md:grid-cols-2">{children}</div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="text-sm font-semibold leading-5 text-[var(--ink)]">
        {title}
      </div>
      <div className="mt-1.5 text-sm leading-5 text-[var(--muted)] [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

function ProductScreenshot({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-[0_22px_60px_-42px_rgba(18,18,18,0.28)]">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size screenshot: ${alt}`}
        className="block bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 760px, 100vw"
          loading="lazy"
        />
      </a>
      <figcaption className="flex flex-col gap-2 border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-6 text-[var(--muted)] sm:flex-row sm:items-start sm:justify-between">
        <span>{caption}</span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 font-semibold text-[var(--accent-strong)] underline decoration-[#b7c7f7] underline-offset-[0.2em]"
        >
          Open full size
        </a>
      </figcaption>
    </figure>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    h2: H2,
    h3: H3,
    h4: H4,
    table: ResponsiveTable,
    CardsGrid,
    DocCard,
    Outcome,
    HelpCallout,
    ScreenshotSlot,
    ExampleBlock,
    TwoColumn,
    Panel,
    ProductScreenshot,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;
