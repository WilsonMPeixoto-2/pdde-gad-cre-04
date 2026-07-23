export type EditorialMediaKey = "hero";

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
    position: "center 42%",
  },
};
