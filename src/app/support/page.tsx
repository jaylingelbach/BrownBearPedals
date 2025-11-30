import Link from 'next/link';

/**
 * Render the support page with warranty, returns, repairs, and warranty-registration information.
 *
 * @returns The JSX element representing the Support page layout
 */

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      {/* Intro */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight uppercase">
          Warranty Information
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Brown Bear Pedals is committed to building tough, road-ready gear and
          standing behind it when something goes wrong. This page outlines our
          current warranty, return, and repair policies. If anything here feels
          unclear, reach out and we&apos;ll be happy to help.
        </p>
      </header>

      {/* Warranty section */}
      <section className="mb-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-xl font-semibold tracking-tight text-foreground uppercase">
          Warranty on Brown Bear Pedals
        </h2>
        <p>
          We offer a <strong>2-year, non-transferable warranty</strong> within
          the USA for any issue related to the normal function or operation of a
          Brown Bear pedal caused by faulty parts and/or internal failures. This
          warranty applies only to the original purchaser and requires valid
          proof of purchase.
        </p>
        <p>
          Outside of the USA, local distributor policies or consumer laws may
          take precedence over this manufacturer&apos;s warranty. If you
          purchased through a dealer or distributor, please check their policies
          as well.
        </p>
        <p>
          For pedals purchased directly from Brown Bear Pedals, we can provide
          prepaid return shipping labels for pedals that are{' '}
          <strong>less than 30 days old</strong>, when the issue is covered
          under warranty. After 30 days, customers are responsible for shipping
          costs to get the pedal to us. For pedals that are registered and
          confirmed to be under warranty, Brown Bear Pedals will cover the cost
          of shipping the repaired pedal back to you within the USA.
        </p>
        <p>
          For non-warranty repairs or pedals that are out of warranty, all
          shipping costs are the responsibility of the customer. (Return
          shipping is included in any repair quote we provide.) For
          international repairs, whether warranty or non-warranty, an additional
          flat return-shipping fee may apply.
        </p>
        <p>
          Our warranty does not cover damage from misuse, abuse, modification,
          or accidents—things like broken knobs, bent jacks, or enclosure damage
          from drops, spills, or incorrect power adapters. We&apos;re still
          happy to take a look at this kind of damage and will quote a fair
          repair price whenever possible.
        </p>
        <p>
          Some Brown Bear pedals may include internal trim pots or other
          controls that are set at the factory for proper operation. Adjusting
          or modifying internal components (including trim pots) can affect the
          behavior of the circuit and <strong>may void your warranty.</strong>{' '}
          If you&apos;re unsure, please contact us before opening anything up.
        </p>
      </section>

      {/* Returns section */}
      <section className="mb-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-xl font-semibold tracking-tight text-foreground uppercase">
          Returns at BrownBearPedals.com
        </h2>
        <p>
          Unless explicitly stated otherwise on a product page, we accept full
          or partial order returns on items purchased directly from{' '}
          <span className="font-semibold">BrownBearPedals.com</span>.
        </p>
        <p>
          Return requests must be made within{' '}
          <strong>14 days of receiving your items</strong>. Requests made after
          14 days may be refused.
        </p>
        <p>
          Items should be returned in <strong>like-new condition</strong> with
          all original packaging and contents. If items are missing packaging or
          show significant wear, we may apply up to a{' '}
          <strong>25% restocking fee</strong>.
        </p>
        <p>
          Approved refunds are issued to the original form of payment. Once we
          receive and inspect the return, please allow{' '}
          <strong>3–5 business days</strong> for processing. Your financial
          institution may take additional time to post the refund to your
          account, which is outside of our control.
        </p>
      </section>

      {/* Repairs section */}
      <section className="mb-10 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-xl font-semibold tracking-tight text-foreground uppercase">
          Repairs
        </h2>
        <p>
          Sometimes things just break—touring is rough, cables get yanked, and
          power supplies get weird. We&apos;re happy to help bring your Brown
          Bear gear back to life.
        </p>
        <p>
          Our techs can service both <strong>warranty</strong> and{' '}
          <strong>non-warranty</strong> repairs, and many issues end up being
          straightforward fixes. If you&apos;re experiencing a problem, the best
          first step is to reach out with a detailed description of the issue.
        </p>
        <p>
          Please use our{' '}
          <Link href="/contact" className="underline">
            Contact
          </Link>{' '}
          page to start a repair request. We&apos;ll let you know what info we
          need, whether the problem is likely covered under warranty, and what
          to expect for timing and costs.
        </p>
      </section>

      {/* Warranty registration section */}
      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-xl font-semibold tracking-tight text-foreground uppercase">
          Warranty Registration
        </h2>
        <p>
          Every Brown Bear pedal is backed by our{' '}
          <strong>2-year, non-transferable warranty</strong> for the original
          owner. To take advantage of this coverage, we require{' '}
          <strong>registration and proof of purchase.</strong>
        </p>
        <p>
          Registration helps us look up your pedal quickly, verify your
          coverage, and speed up any repair or support requests you might have
          down the line.
        </p>
        <div className="mt-4">
          <Link
            href="https://forms.gle/zcaEc6abNmoWyD988"
            className="inline-flex h-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-background shadow-sm transition-transform duration-150 hover:bg-pink-500 hover:text-primary hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register My Brown Bear Pedal
          </Link>
        </div>
      </section>
    </main>
  );
}