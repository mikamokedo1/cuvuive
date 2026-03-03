import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cú Thông Minh - Vừa Học Vừa Chơi",
    short_name: "Cú Thông Minh",
    description:
      "Ứng dụng giáo dục tương tác giúp bé vừa học vừa chơi, phát triển tư duy toán học và ngôn ngữ một cách tự nhiên.",
    start_url: "/games",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FF9C01",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
