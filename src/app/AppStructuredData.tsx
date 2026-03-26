import { safeJsonLd } from "@/libs/utils/safe-jsonld";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Cú Thông Minh",
  url: "https://cuthongminh.com",
  logo: {
    "@type": "ImageObject",
    url: "https://cuthongminh.com/icons/android-chrome-512x512.png",
    width: "512",
    height: "512",
  },
  description:
    "Cú Thông Minh là nền tảng giáo dục tương tác cho trẻ em từ 3-8 tuổi, giúp bé vừa học vừa chơi qua hàng trăm trò chơi trí tuệ về toán học, ngôn ngữ và kỹ năng sống.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "Vietnam",
  },
  knowsAbout: [
    "Early childhood education",
    "Educational games for kids",
    "Vietnamese language learning",
    "Math learning for preschoolers",
    "Interactive learning",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+84-888-222-293",
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: "Vietnamese",
  },
  sameAs: ["https://www.facebook.com/cuthongminh", "https://www.youtube.com/@cuthongminh"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cú Thông Minh",
  url: "https://cuthongminh.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://cuthongminh.com/games?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function AppStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(orgJsonLd) }}
        key="org-jsonld"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
        key="website-jsonld"
      />
    </>
  );
}
