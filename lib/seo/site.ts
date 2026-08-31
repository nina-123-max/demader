const githubRepository = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const githubPagesUrl = githubRepository.length === 2
  ? `https://${githubRepository[0]}.github.io${githubRepository[1].endsWith(".github.io") ? "" : `/${githubRepository[1]}`}`
  : undefined;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ?? githubPagesUrl
  ?? "https://demader-muebles.demadermuebles.chatgpt.site";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Demader Muebles",
      legalName: "DEMADER S.A.S",
      taxID: "901981556",
      url: SITE_URL,
      logo: `${SITE_URL}/demader-mark.png`,
      email: "demadermuebles@gmail.com",
      telephone: "+57 304 4782128",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle 38 Sur # 72K-43",
        addressLocality: "Bogotá",
        addressCountry: "CO",
      },
      sameAs: [
        "https://www.instagram.com/mueblesdemader/",
        "https://www.facebook.com/100063636772577",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Demader Muebles",
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
