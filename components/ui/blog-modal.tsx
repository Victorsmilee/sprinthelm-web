"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface BlogPost {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: string;
}

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function BlogModal({ post, onClose }: BlogModalProps): React.JSX.Element | null {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (post) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  const CATEGORY_COLORS: Record<string, string> = {
    Engineering: "text-accent bg-accent/10 border-accent/20",
    Product: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    Leadership: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 m-auto w-full max-w-3xl max-h-[90vh] rounded-2xl bg-bg-surface border border-border-subtle shadow-elevated p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden"
    >
      {post && (
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex items-start justify-between p-8 pb-6 border-b border-border-subtle flex-shrink-0">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-label font-semibold px-2.5 py-0.5 rounded border ${CATEGORY_COLORS[post.category] ?? "text-text-secondary bg-bg-elevated border-border-subtle"}`}>
                  {post.category}
                </span>
                <span className="text-caption text-text-disabled">{post.date}</span>
                <span className="text-caption text-text-disabled">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-text-primary leading-snug">{post.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 rounded-lg text-text-disabled hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
              aria-label="Close article"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-8">
            <p className="text-base text-text-secondary leading-relaxed mb-6 italic border-l-2 border-accent/40 pl-4">
              {post.excerpt}
            </p>
            <div
              className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed [&_h2]:text-text-primary [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-text-primary [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:text-text-primary [&_strong]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:border-accent/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-disabled [&_blockquote]:my-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
