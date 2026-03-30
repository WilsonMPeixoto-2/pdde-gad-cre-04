export const PROJECT_BRANDING = {
  projectName: "Guia PDDE no SEI!RIO",
  projectFullName: "Guia PDDE no SEI!RIO • 4ª CRE",
  appName: "Guia PDDE 4ª CRE",
  appShortName: "Guia PDDE",
  creatorName: "Wilson M. Peixoto",
  creatorCreditLine: "Elaboração editorial, estruturação visual e identidade do projeto: Wilson M. Peixoto.",
  creatorShortLine: "Projeto criado por Wilson M. Peixoto.",
  rightsLine:
    "Projeto autoral com identidade visual própria. Preserve o crédito do criador em reproduções, redistribuições e artefatos derivados.",
  copyrightLine:
    "© 2026 Wilson M. Peixoto. Identidade visual e artefatos digitais originais do projeto preservados.",
  printSignature:
    "Assinatura do projeto: Wilson M. Peixoto • elaboração editorial e identidade visual.",
  appDescription:
    "Guia institucional da 4ª CRE para a prestação de contas do PDDE no SEI!RIO, com checklist, referências oficiais e identidade visual própria.",
  canonicalUrl: "https://pdde-gad-cre-04.vercel.app/",
  assetPaths: {
    faviconPng: "/favicon.png",
    faviconIco: "/favicon.ico",
    favicon32: "/icons/favicon-32.png",
    favicon16: "/icons/favicon-16.png",
    icon192: "/icons/icon-192.png",
    icon512: "/icons/icon-512.png",
    iconMaskable192: "/icons/icon-maskable-192.png",
    iconMaskable512: "/icons/icon-maskable-512.png",
    appleTouchIcon: "/icons/apple-touch-icon.png",
    shortcutHome: "/icons/shortcut-home.png",
    shortcutChecklist: "/icons/shortcut-checklist.png",
    msTile150: "/icons/mstile-150x150.png",
    ogImage: "/og-image.png",
    browserConfig: "/browserconfig.xml",
  },
} as const;

export const getProjectDownloadFooter = () =>
  [
    "---",
    `Arquivo gerado por ${PROJECT_BRANDING.projectFullName}`,
    PROJECT_BRANDING.creatorCreditLine,
    PROJECT_BRANDING.rightsLine,
    PROJECT_BRANDING.copyrightLine,
  ].join("\n");

export const appendProjectDownloadFooter = (content: string) =>
  `${content.trimEnd()}\n\n${getProjectDownloadFooter()}\n`;

export const getProjectJsonBranding = () => ({
  project: PROJECT_BRANDING.projectFullName,
  creator: PROJECT_BRANDING.creatorName,
  creatorCredit: PROJECT_BRANDING.creatorCreditLine,
  rights: PROJECT_BRANDING.rightsLine,
  copyright: PROJECT_BRANDING.copyrightLine,
  canonicalUrl: PROJECT_BRANDING.canonicalUrl,
});
