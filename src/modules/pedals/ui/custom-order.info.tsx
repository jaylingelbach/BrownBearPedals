import Link from 'next/link';

export function CustomOrderInfo() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 rounded-xl border border-border bg-background/60 px-6 py-8">
      {/* Eyebrow / title */}
      <header className="space-y-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Custom Line
        </p>
        <h1 className="text-xl font-semibold tracking-tight">
          Build a one-of-a-kind Brown Bear pedal
        </h1>
        <p className="text-sm text-muted-foreground">
          Want something that isn&apos;t on the shelf? We&apos;ll work with you
          to design a custom overdrive, fuzz, or full weird-science noise box
          that fits your rig and your brain.
        </p>
      </header>

      {/* Steps */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          How it works
        </h2>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-semibold text-foreground">1. Say hello.</span>{' '}
            Tell us what you&apos;re going for – vibe, bands, existing pedals
            you love or hate.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              2. We sketch a circuit.
            </span>{' '}
            We&apos;ll suggest a base circuit (or combo), tweaks, and a rough
            price estimate.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              3. Dial in the details.
            </span>{' '}
            Artwork, enclosure color, knobs, switching, extra controls – the fun
            stuff.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              4. We build it by hand.
            </span>{' '}
            Once you approve the quote, we order parts and build your pedal in
            the Brown Bear cave.
          </li>
        </ol>
      </section>

      {/* Expectations / timelines */}
      <section className="space-y-2 rounded-lg bg-muted/40 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">
          A quick note on timing & pricing
        </p>
        <ul className="list-disc space-y-1 pl-4">
          <li>Typical build time: ~4–6 weeks once everything is approved.</li>
          <li>
            Pricing starts around{' '}
            <span className="font-semibold text-foreground">$200</span> and goes
            up with complexity, artwork, and wild ideas.
          </li>
          <li>
            We&apos;ll always give you a clear quote before we commit to
            building anything.
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full border border-border bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-background transition hover:opacity-90 hover:scale-105 hover:bg-pink-500 hover:text-black"
        >
          Start a custom request
        </Link>
        <p className="text-[0.7rem] text-muted-foreground">
          Not ready yet?{' '}
          <Link href="/pedals" className="underline">
            Browse current pedals instead
          </Link>
          .
        </p>
      </section>
    </section>
  );
}
