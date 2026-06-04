import { safeJsonLd } from "@/libs/utils/safe-jsonld";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
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
  sameAs: [
    "https://cuthongminh.com/about-us",
    "https://www.facebook.com/cuthongminh",
    "https://www.youtube.com/@cuthongminh",
    "https://www.tiktok.com/@cuthongminh",
  ],
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Trang chủ",
      item: "https://cuthongminh.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Trò chơi",
      item: "https://cuthongminh.com/games",
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
        key="breadcrumb-jsonld"
      />
    </>
  );
}
