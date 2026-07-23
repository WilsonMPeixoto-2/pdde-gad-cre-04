import type { GuideSectionId } from "@/lib/guideContent";

export type EditorialMediaKey =
  | "hero"
  | "process"
  | "documents"
  | "authentication"
  | "follow-up";

type EditorialMediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: string;
};

export const editorialMedia: Record<EditorialMediaKey, EditorialMediaAsset> = {
  hero: {
    src: "/editorial/hero-pdde.webp",
    alt: "Educadora acompanha estudantes durante uma atividade de registro e organização escolar.",
    width: 400,
    height: 278,
    position: "center center",
  },
  process: {
    src: "/editorial/chapter-process.svg",
    alt: "Ilustração de uma pasta, documento e etapas conectadas de um processo.",
    width: 800,
    height: 500,
    position: "center center",
  },
  documents: {
    src: "/editorial/chapter-documents.svg",
    alt: "Ilustração de documentos organizados, conferidos e encaminhados.",
    width: 800,
    height: 500,
    position: "center center",
  },
  authentication: {
    src: "/editorial/chapter-authentication.svg",
    alt: "Ilustração de documento protegido por escudo e selo de verificação.",
    width: 800,
    height: 500,
    position: "center center",
  },
  "follow-up": {
    src: "/editorial/chapter-follow-up.svg",
    alt: "Ilustração de acompanhamento com lupa, mensagens e marca de conclusão.",
    width: 800,
    height: 500,
    position: "center center",
  },
};

export const editorialMediaBySection: Partial<Record<GuideSectionId, EditorialMediaKey>> = {
  "secao-1": "process",
  "secao-2": "documents",
  "secao-3": "documents",
  "secao-4": "authentication",
  "secao-5": "process",
  "secao-6": "follow-up",
  contatos: "follow-up",
  anexo: "authentication",
};
