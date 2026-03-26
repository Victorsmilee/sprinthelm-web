import React from "react";

export function SurveyFooter(): React.ReactElement {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle py-6 mt-auto">
      <div className="mx-auto max-w-content px-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-primary">
          Sprint<span className="text-accent">Helm</span>
        </span>
        <span className="text-caption text-text-disabled">
          © {year} SprintHelm. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
