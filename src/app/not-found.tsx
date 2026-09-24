import { ButtonLink } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="container grid min-h-[80vh] place-items-center text-center">
      <div>
        <p className="font-mono text-sm text-cyan">404 · route not found</p>
        <h1 className="mt-4 text-5xl font-semibold sm:text-7xl">Lost in the stack.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex justify-center"><ButtonLink href="/">Back to dashboard</ButtonLink></div>
      </div>
    </div>
  );
}
