import { readFileSync } from "node:fs";
import path from "node:path";

type HeaderEntry = {
  key: string;
  value: string;
};

type VercelConfig = {
  headers?: Array<{
    source?: string;
    headers?: HeaderEntry[];
  }>;
};

const configPath = path.resolve("vercel.json");
const config = JSON.parse(readFileSync(configPath, "utf8")) as VercelConfig;
const globalHeaders = config.headers?.find((entry) => entry.source === "/(.*)")?.headers ?? [];
const headersByName = new Map(globalHeaders.map((entry) => [entry.key.toLowerCase(), entry.value]));

const requiredHeaders = [
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
  "content-security-policy-report-only",
];

const missing = requiredHeaders.filter((name) => !headersByName.has(name));
if (missing.length > 0) {
  throw new Error(`Cabeçalhos de segurança ausentes em vercel.json: ${missing.join(", ")}.`);
}

const csp = headersByName.get("content-security-policy-report-only") ?? "";
const requiredDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "worker-src 'self' blob:",
];

const missingDirectives = requiredDirectives.filter((directive) => !csp.includes(directive));
if (missingDirectives.length > 0) {
  throw new Error(`Diretivas CSP ausentes: ${missingDirectives.join(", ")}.`);
}

console.log("Cabeçalhos de segurança e CSP report-only validados.");
