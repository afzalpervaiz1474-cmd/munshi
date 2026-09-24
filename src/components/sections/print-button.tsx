"use client";
import { useEffect } from "react";
import { Download } from "lucide-react";

export function PrintButton() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") === "1") setTimeout(() => window.print(), 600);
  }, []);
  return (
    <button onClick={() => window.print()} className="no-print inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-5 text-sm font-medium text-[#05070a] transition active:scale-95">
      <Download size={15} /> Download / Save as PDF
    </button>
  );
}
