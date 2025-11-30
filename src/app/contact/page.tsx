'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SUPPORT_EMAIL = 'jay@brownbearpedals.com';

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactPage() {
  const [errors, setErrors] = useState<ContactErrors>({});

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') ?? '').toString().trim();
    const email = (formData.get('email') ?? '').toString().trim();
    const topic = (formData.get('topic') ?? '').toString().trim();
    const message = (formData.get('message') ?? '').toString().trim();

    const nextErrors: ContactErrors = {};

    if (!name) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!email) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!message) {
      nextErrors.message = 'Please enter a message.';
    }

    // If we have any validation errors, show them and bail out
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Clear previous errors on successful validation
    setErrors({});

    const subjectBase = topic || 'Brown Bear Pedals inquiry';
    const subject = encodeURIComponent(
      name ? `${subjectBase} – ${name}` : subjectBase
    );

    const bodyLines = [
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      '',
      message
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join('\n'));

    // Opens the user’s email client with a pre-filled message
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Heading */}
      <header className="mb-8 space-y-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Support &amp; Questions
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Contact Brown Bear Pedals
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Have a question about a pedal, need help with an order, or curious
          about a custom build? Reach out and we&apos;ll get back to you as soon
          as we can.
        </p>
      </header>

      {/* Top info cards */}
      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {/* General questions */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
              General Questions
            </CardTitle>
            <CardDescription className="text-xs">
              For questions about pedals, features, or availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </p>
            <Button
              asChild
              variant="link"
              className="mt-1 h-auto break-all p-0 text-xs font-medium"
            >
              <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Orders & warranty */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
              Orders &amp; Warranty
            </CardTitle>
            <CardDescription className="text-xs">
              Need help with a recent purchase or a warranty claim?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-[0.7rem] text-muted-foreground">
              Visit the Support page to review warranty details and register
              your Brown Bear pedal.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-[0.7rem] uppercase tracking-[0.18em] hover:scale-105 hover:bg-pink-500 hover:text-primary"
            >
              <Link href="/support">Visit Support Page</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Custom work */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]">
              Custom Work
            </CardTitle>
            <CardDescription className="text-xs">
              Have an idea for a custom Brown Bear build or artwork?
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-[0.7rem] text-muted-foreground">
              Learn more about the custom order process and how to start a
              project.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-[0.7rem] uppercase tracking-[0.18em] hover:scale-105 hover:bg-pink-500 hover:text-primary"
            >
              <Link href="/pedals?productLine=Custom">Custom Order Info</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Contact form */}
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold uppercase tracking-[0.18em]">
            Send us a message
          </CardTitle>
          <CardDescription className="text-xs">
            This form opens your email client with your message pre-filled. For
            warranty registration, please use the dedicated warranty form on the
            Support page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleContactSubmit} noValidate>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-[0.7rem] uppercase tracking-[0.18em]"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="text-sm"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-[0.7rem] text-destructive mt-1"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[0.7rem] uppercase tracking-[0.18em]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="text-sm"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-[0.7rem] text-destructive mt-1"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="topic"
                className="text-[0.7rem] uppercase tracking-[0.18em]"
              >
                Topic
              </Label>
              <Input
                id="topic"
                name="topic"
                type="text"
                placeholder="Order question, pedal issue, custom idea..."
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="message"
                className="text-[0.7rem] uppercase tracking-[0.18em]"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                className="text-sm"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="text-[0.7rem] text-destructive mt-1"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-full px-8 text-[0.75rem] font-semibold uppercase tracking-[0.18em] hover:scale-105 hover:bg-pink-500 hover:text-primary"
              >
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
