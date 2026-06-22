export const dynamic = "force-static";

export function GET() {
  const skills = {
    skills: [
      {
        id: "browse-games",
        name: "Browse Educational Games",
        description:
          "Browse and discover 30+ interactive educational games for Vietnamese children aged 3-8. Games cover math, Vietnamese language, science, life skills, music, art, and logical thinking.",
        url: "https://cuthongminh.com/games",
        tags: ["education", "games", "children", "vietnamese"],
      },
      {
        id: "read-blog",
        name: "Read Parenting & Education Blog",
        description:
          "Access 60+ articles about early childhood education, teaching methods, and parenting tips for Vietnamese families.",
        url: "https://cuthongminh.com/blogs",
        tags: ["education", "parenting", "blog", "vietnamese"],
      },
      {
        id: "site-summary",
        name: "Get Site Summary",
        description:
          "Get a complete machine-readable summary of Cú Thông Minh, including all games, blog articles, and pages.",
        url: "https://cuthongminh.com/llms.txt",
        tags: ["llms-txt", "summary"],
      },
    ],
  };

  return new Response(JSON.stringify(skills, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
