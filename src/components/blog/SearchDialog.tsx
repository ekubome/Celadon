"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Tag, Folder, Command } from "lucide-react";
import Fuse from "fuse.js";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load posts data from static JSON
  useEffect(() => {
    if (open && posts.length === 0) {
      setLoading(true);
      fetch("/search-index.json")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [open, posts.length]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          // This will be handled by parent component
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Search with Fuse.js
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      const fuse = new Fuse(posts, {
        keys: [
          { name: "title", weight: 0.4 },
          { name: "excerpt", weight: 0.3 },
          { name: "tags", weight: 0.2 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
      });

      const searchResults = fuse.search(searchQuery).slice(0, 8);
      setResults(searchResults.map((r) => r.item));
      setSelectedIndex(0);
    },
    [posts]
  );

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigateToPost(results[selectedIndex].slug);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const navigateToPost = (slug: string) => {
    router.push(`/blog/${slug}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-gray-100 px-4">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索文章..."
                  className="flex-1 py-4 text-base text-gray-900 placeholder-gray-400 outline-none"
                />
                <div className="flex items-center gap-1.5">
                  <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                    <Command className="h-3 w-3" />K
                  </kbd>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : query && results.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">没有找到相关文章</p>
                    <p className="mt-1 text-sm text-gray-400">
                      尝试使用不同的关键词
                    </p>
                  </div>
                ) : results.length > 0 ? (
                  <ul className="py-2">
                    {results.map((result, index) => (
                      <li key={result.slug}>
                        <button
                          onClick={() => navigateToPost(result.slug)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full px-4 py-3 text-left transition-colors ${
                            index === selectedIndex
                              ? "bg-primary/5"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 rounded-lg p-2 ${
                                index === selectedIndex
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4
                                className={`font-medium truncate ${
                                  index === selectedIndex
                                    ? "text-primary"
                                    : "text-gray-900"
                                }`}
                              >
                                {result.title}
                              </h4>
                              <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">
                                {result.excerpt}
                              </p>
                              <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Folder className="h-3 w-3" />
                                  {result.category}
                                </span>
                                {result.tags.length > 0 && (
                                  <span className="flex items-center gap-1">
                                    <Tag className="h-3 w-3" />
                                    {result.tags.slice(0, 2).join(", ")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-gray-400">输入关键词开始搜索</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-4 py-3">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded bg-gray-100 px-1.5 py-0.5">↑</kbd>
                      <kbd className="rounded bg-gray-100 px-1.5 py-0.5">↓</kbd>
                      导航
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded bg-gray-100 px-1.5 py-0.5">↵</kbd>
                      打开
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-gray-100 px-1.5 py-0.5">Esc</kbd>
                    关闭
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchDialog;
