/**
 * HowToSchema: Adds HowTo structured data for step-by-step blog content.
 * AI answer engines (Google AI Overviews, Perplexity, etc.) can extract
 * individual steps and display them as featured snippets.
 *
 * @see https://schema.org/HowTo
 */

export interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  image?: string;
}

export function HowToSchema({ name, description, steps, image }: HowToSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(image && { image }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
