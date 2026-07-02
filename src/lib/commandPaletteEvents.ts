export const COMMAND_PALETTE_OPEN_EVENT = "guide:open-search";

let pendingCommandPaletteOpen = false;

export const requestCommandPaletteOpen = () => {
  if (typeof document === "undefined") return;

  pendingCommandPaletteOpen = true;
  document.dispatchEvent(new CustomEvent(COMMAND_PALETTE_OPEN_EVENT));
};

export const consumePendingCommandPaletteOpen = () => {
  if (!pendingCommandPaletteOpen) return false;

  pendingCommandPaletteOpen = false;
  return true;
};
