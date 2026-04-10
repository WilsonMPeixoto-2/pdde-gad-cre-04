export const COMMAND_PALETTE_OPEN_EVENT = "guide:open-search";

export const requestCommandPaletteOpen = () => {
  if (typeof document === "undefined") return;

  document.dispatchEvent(new CustomEvent(COMMAND_PALETTE_OPEN_EVENT));
};
