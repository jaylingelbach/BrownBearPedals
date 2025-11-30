'use client';

import { FormEvent } from 'react';
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

function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = (formData.get('name') ?? '').toString();
  const email = (formData.get('email') ?? '').toString();
  const topic = (formData.get('topic') ?? '').toString();
  const message = (formData.get('message') ?? '').toString();

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

export default function ContactPage() {
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
      <section className="grid gap-4 md:grid-cols-3 mb-10">
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
              className="mt-1 h-auto p-0 text-xs font-medium break-all"
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
              className="text-[0.7rem] uppercase tracking-[0.18em] hover:bg-pink-500 hover:text-primary hover:scale-105"
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
              className="text-[0.7rem] uppercase tracking-[0.18em] hover:bg-pink-500 hover:text-primary hover:scale-105"
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
                />
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
                />
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
              />
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-full px-8 text-[0.75rem] font-semibold uppercase tracking-[0.18em] hover:bg-pink-500 hover:text-primary hover:scale-105"
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
