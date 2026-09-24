"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="font-mono text-sm text-rose-400">runtime error</p>
        <h1 className="mt-4 text-4xl font-semibold">Something went wrong.</h1>
        <p className="mt-3 text-muted">An unexpected error occurred. Please try again.</p>
        <button onClick={reset} className="mt-8 rounded-full bg-fg px-6 py-3 text-sm text-bg">Try again</button>
      </div>
    </div>
  );
}
