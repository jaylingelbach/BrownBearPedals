import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Render the About page for Brown Bear Pedals, presenting the shop's name origin, history, and location.
 *
 * @returns The About page as a React element
 */
export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Page header */}
      <header className="mb-10 space-y-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          About Us
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          The story behind Brown Bear Pedals
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Brown Bear Pedals is a small, one–person shop building tarot-inspired
          and vintage-flavored guitar effects in the Midwest. Here&apos;s a bit
          about where the name came from, how the whole thing started, and where
          it all happens.
        </p>
      </header>

      <div className="space-y-6">
        {/* Name origin */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base tracking-tight">
              Where did we get our name?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              I grew up in southern Illinois, and as a child we would visit my
              mom&apos;s side of the family in San Antonio, Texas. I would run
              around outside all summer long, playing whatever games my cousins
              and I made up and having an absolute blast.
            </p>
            <p>
              By the end of the summer I would be so tan from being outside all
              day that my grandfather Martin would call me{' '}
              <span className="font-medium text-foreground">Brown Bear</span>. I
              loved the nickname and decided to honor his memory—and my memories
              of visiting family—by using his nickname for me as the name of
              this pedal company.
            </p>
          </CardContent>
        </Card>

        {/* Getting started */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base tracking-tight">
              How did we get started?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              In 2018 I decided to take on yet another hobby in addition to
              playing guitar: I wanted to make a guitar pedal. Knowing that I
              tend to jump head-first into hobbies, I ordered enough parts to
              make several pedals.
            </p>
            <p>
              By the time the pandemic came around, I decided it was time to
              design my own circuit boards and artwork. I wanted to take the
              hobby a step further and make professional designs, so I learned
              how to use Illustrator. That let me get the graphics UV printed
              and really took my pedals to the next level.
            </p>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base tracking-tight">
              Where are we located?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Brown Bear Pedals is based about 20 minutes from downtown St.
              Louis, in Belleville, Illinois. A nice drive from the city brings
              you to my hometown.
            </p>
            <p>
              I&apos;ve moved away more times than I can remember, but I&apos;ve
              always called this place home—just like my parents have, and my
              grandparents on my father&apos;s side as well.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}