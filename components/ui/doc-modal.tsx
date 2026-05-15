"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface DocEntry {
  label: string;
  content: string;
  section?: string;
}

interface DocModalProps {
  entry: DocEntry | null;
  onClose: () => void;
}

export function DocModal({ entry, onClose }: DocModalProps): React.JSX.Element | null {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (entry) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entry]);

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

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 m-auto w-full max-w-3xl max-h-[90vh] rounded-2xl bg-bg-surface border border-border-subtle shadow-elevated p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden"
    >
      {entry && (
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-subtle flex-shrink-0">
            <div>
              {entry.section && (
                <p className="text-xs text-text-disabled uppercase tracking-wider mb-1">{entry.section}</p>
              )}
              <h2 className="text-lg font-bold text-text-primary">{entry.label}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-disabled hover:text-text-primary hover:bg-bg-elevated transition-colors duration-150"
              aria-label="Close document"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto p-8">
            {/*
              CONTRACT: `entry.content` MUST be authored as static HTML strings
              in TypeScript (see lib/docs-content.ts). It is NEVER sourced from
              user input, URL params, fetched APIs, or a CMS. If that changes —
              even to a "trusted" CMS — this dangerouslySetInnerHTML becomes an
              XSS sink and the content MUST be sanitised (e.g. isomorphic-
              dompurify) or migrated to react-markdown/JSX first. Tracked:
              audit finding M4 follow-up.
            */}
            <div
              className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed [&_h2]:text-text-primary [&_h2]:font-bold [&_h2]:text-base [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-text-primary [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:text-text-primary [&_strong]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:border-accent/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-disabled [&_blockquote]:my-4 [&_code]:bg-bg-elevated [&_code]:text-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_pre]:bg-bg-elevated [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_th]:text-left [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-text-disabled [&_th]:pb-2 [&_th]:border-b [&_th]:border-border-subtle [&_td]:py-2.5 [&_td]:text-sm [&_td]:border-b [&_td]:border-border-subtle"
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />
          </div>
        </div>
      )}
    </dialog>
  );
}
