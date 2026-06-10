"use client";

type Props = {
  error: Error;

  reset: () => void;
};

export default function Error({
  error,
  reset,
}: Props) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{
            background: "color-mix(in srgb, var(--color-error) 12%, white)",
          }}
        >
          ⚠️
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Something went
          wrong
        </h1>

        <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)]">
          We couldn't load
          this page right now.
          Please try again.
        </p>

        {process.env
          .NODE_ENV ===
          "development" && (
          <div
            className="mt-6 overflow-auto rounded-xl border p-4 text-left text-sm"
            style={{
              borderColor: "color-mix(in srgb, var(--color-error) 25%, white)",
              background: "color-mix(in srgb, var(--color-error) 10%, white)",
              color: "var(--color-error)",
            }}
          >
            {error.message}
          </div>
        )}

        <button
          onClick={reset}
          className="mt-8 rounded-button bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}