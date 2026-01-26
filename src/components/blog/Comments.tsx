"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/config";

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!siteConfig.comments.enabled || !containerRef.current) return;

    const { giscus } = siteConfig.comments;

    // Check if script already exists
    const existingScript = containerRef.current.querySelector(
      'script[src="https://giscus.app/client.js"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", giscus.repo);
    script.setAttribute("data-repo-id", giscus.repoId);
    script.setAttribute("data-category", giscus.category);
    script.setAttribute("data-category-id", giscus.categoryId);
    script.setAttribute("data-mapping", giscus.mapping);
    script.setAttribute(
      "data-reactions-enabled",
      giscus.reactionsEnabled ? "1" : "0"
    );
    script.setAttribute(
      "data-emit-metadata",
      giscus.emitMetadata ? "1" : "0"
    );
    script.setAttribute("data-input-position", giscus.inputPosition);
    script.setAttribute("data-theme", giscus.theme);
    script.setAttribute("data-lang", giscus.lang);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup on unmount
      const iframe = containerRef.current?.querySelector("iframe.giscus-frame");
      iframe?.remove();
    };
  }, [slug]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent<{ theme: string }>) => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.giscus-frame"
      );
      if (!iframe) return;

      const { giscus } = siteConfig.comments;
      const theme =
        event.detail.theme === "dark" ? giscus.darkTheme : giscus.theme;

      iframe.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        "https://giscus.app"
      );
    };

    window.addEventListener(
      "theme-change" as keyof WindowEventMap,
      handleThemeChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "theme-change" as keyof WindowEventMap,
        handleThemeChange as EventListener
      );
    };
  }, []);

  if (!siteConfig.comments.enabled) return null;

  // Show placeholder if Giscus is not configured
  if (!siteConfig.comments.giscus.repoId) {
    return (
      <div className="py-12 border-t border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">评论</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            评论系统尚未配置。请在{" "}
            <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
              src/lib/config.ts
            </code>{" "}
            中配置 Giscus。
          </p>
          <a
            href="https://giscus.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-primary hover:underline text-sm"
          >
            了解如何配置 Giscus
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 border-t border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">评论</h3>
      <div ref={containerRef} className="giscus" />
    </div>
  );
}
