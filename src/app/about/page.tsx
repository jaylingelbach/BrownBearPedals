/**
 * Renders the About page showing a centered "About" heading.
 *
 * @returns A JSX element containing a div with Tailwind classes that centers an `h1` with the text "About".
 */
export default function About() {
  return (
    <div className="flex justify-center text-2xl">
      <h1>About</h1>
    </div>
  );
}