import {
  appendProjectDownloadFooter,
  getProjectJsonBranding,
} from "@/lib/projectBranding";

const triggerBrowserDownload = (objectUrl: string, fileName: string) => {
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.rel = "noopener";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
};

const scheduleObjectUrlCleanup = (objectUrl: string, delayMs = 1_500) => {
  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, delayMs);
};

export const downloadClientFile = (content: string, fileName: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const objectUrl = URL.createObjectURL(blob);
  triggerBrowserDownload(objectUrl, fileName);
  scheduleObjectUrlCleanup(objectUrl);
};

export const downloadTextFile = (content: string, fileName: string) => {
  downloadClientFile(appendProjectDownloadFooter(content), fileName, "text/plain;charset=utf-8");
};

export const downloadHtmlFile = (content: string, fileName: string) => {
  downloadClientFile(content, fileName, "text/html;charset=utf-8");
};

export const downloadJsonFile = (value: string | object, fileName: string) => {
  const brandedValue =
    typeof value === "string" || Array.isArray(value)
      ? value
      : {
          ...value,
          projectBranding: getProjectJsonBranding(),
        };

  const content = typeof brandedValue === "string" ? brandedValue : JSON.stringify(brandedValue, null, 2);
  downloadClientFile(content, fileName, "application/json;charset=utf-8");
};

export const openHtmlDocument = (content: string) => {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const openedWindow = window.open(objectUrl, "_blank");

  if (!openedWindow) {
    URL.revokeObjectURL(objectUrl);
    return false;
  }

  scheduleObjectUrlCleanup(objectUrl, 60_000);
  return true;
};
