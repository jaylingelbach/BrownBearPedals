import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with your Brown Bear Pedals order.'
};

/**
 * Renders the Support page showing a centered "Support" heading.
 *
 * @returns The JSX element for the Support page.
 */
export default function Page() {
  return (
    <div className="flex justify-center text-2xl">
      <h1>Support</h1>
    </div>
  );
}