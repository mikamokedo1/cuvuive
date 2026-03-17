/**
 * SpeakableSchema: Adds Speakable structured data for voice search / AI reading.
 * Uses CSS selectors to identify content suitable for text-to-speech.
 *
 * @see https://schema.org/speakable
 */
export function SpeakableSchema({
  url,
  cssSelectors,
}: {
  url: string;
  cssSelectors: string[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
