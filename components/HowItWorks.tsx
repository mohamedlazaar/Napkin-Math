const steps = [
  {
    n: '1',
    title: 'Enter your numbers',
    body: 'Every field explains exactly what belongs in it, so you are not guessing which costs to include.',
  },
  {
    n: '2',
    title: 'See the result instantly',
    body: 'The calculation runs as you type. No submit button, no waiting, no page reload.',
  },
  {
    n: '3',
    title: 'Understand what it means',
    body: 'Each result comes with a plain reading of what the number implies and what to look at next.',
  },
];

/** Three steps, no illustrations. The point is to remove hesitation, not to decorate. */
export function HowItWorks({ className = '' }: { className?: string }) {
  return (
    <section className={className} aria-labelledby="how-heading">
      <h2 id="how-heading" className="text-h2 font-bold tracking-tight text-ink">
        How it works
      </h2>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <li key={step.n} className="card p-5">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-mono text-sm font-bold text-white"
            >
              {step.n}
            </span>
            <h3 className="mt-3 text-[0.9375rem] font-bold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * The privacy proposition, stated plainly.
 *
 * Every claim here is literally true of this codebase: the maths runs in
 * lib/formulas.ts in the browser, there is no analytics call carrying input
 * values (see lib/analytics.ts, which whitelists its payload keys), and there
 * is no account system to store anything in. Do not soften or embellish this
 * copy without changing the code first.
 */
export function TrustPanel({ className = '' }: { className?: string }) {
  return (
    <section
      className={`card overflow-hidden ${className}`}
      aria-labelledby="privacy-heading"
    >
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 id="privacy-heading" className="text-h2 font-bold tracking-tight text-ink">
            Your numbers stay private.
          </h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
            Every calculation happens in your browser, in JavaScript, on your own device.
            Your inputs are never uploaded, never logged and never stored by Napkin Math.
            Close the tab and they are gone.
          </p>
          <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-ink-muted">
            That is a property of how the site is built, not a policy we promise to keep:
            there is no account to create and no server to send your figures to.
          </p>
        </div>

        <ul className="space-y-2.5">
          {[
            'No signup, no account, no email required',
            'Inputs never leave your device',
            'Saved tools and scenarios stay in your browser',
            'Free to use, funded by ads and affiliate links',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-healthy-soft text-[0.625rem] font-bold text-healthy"
              >
                ✓
              </span>
              <span className="text-[0.875rem] leading-relaxed text-ink-soft">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
