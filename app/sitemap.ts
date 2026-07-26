import type { MetadataRoute } from "next";

const BASE_URL = "https://merovi.digital";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/servicos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quem-faz-seu-projeto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/solicitar-meu-site`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
