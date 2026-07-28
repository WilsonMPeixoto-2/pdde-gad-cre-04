from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, content: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")


def replace_once(path: str, old: str, new: str) -> None:
    content = read(path)
    if new in content:
        return
    if old not in content:
        raise RuntimeError(f"Trecho esperado não localizado em {path}: {old[:100]!r}")
    write(path, content.replace(old, new, 1))


def replace_regex(path: str, pattern: str, replacement: str) -> None:
    content = read(path)
    if replacement in content:
        return
    updated, count = re.subn(pattern, replacement, content, count=1, flags=re.DOTALL)
    if count != 1:
        raise RuntimeError(f"Padrão esperado não localizado em {path}: {pattern[:100]!r}")
    write(path, updated)


# Acessibilidade: o feedback de conclusão permanece textual e o confete não é
# carregado quando o sistema solicita redução de movimento.
replace_once(
    "src/components/pop/PDDEChecklist.tsx",
    'import { useClipboardAction } from "@/hooks/useClipboardAction";\n',
    'import { useClipboardAction } from "@/hooks/useClipboardAction";\nimport { useReducedMotion } from "@/hooks/useReducedMotion";\n',
)
replace_once(
    "src/components/pop/PDDEChecklist.tsx",
    "export const PDDEChecklist = () => {\n  const hasConfettiFired = useRef(false);",
    "export const PDDEChecklist = () => {\n  const reducedMotion = useReducedMotion();\n  const hasConfettiFired = useRef(false);",
)
replace_regex(
    "src/components/pop/PDDEChecklist.tsx",
    r"  // Fire confetti when all essential items are completed\n  useEffect\(\(\) => \{.*?  \}, \[essenciaisCompleted, essenciaisCount\]\);",
    '''  // Provide a restrained completion acknowledgement and avoid motion when requested.
  useEffect(() => {
    let isActive = true;

    if (essenciaisCompleted === essenciaisCount && essenciaisCount > 0 && !hasConfettiFired.current) {
      hasConfettiFired.current = true;
      toast.success("Todos os itens essenciais foram concluídos.");

      if (reducedMotion) {
        return () => {
          isActive = false;
        };
      }

      void loadConfetti().then(({ default: confetti }) => {
        if (!isActive) return;

        confetti({
          particleCount: 42,
          spread: 62,
          origin: { x: 0.5, y: 0.68 },
          colors: ["#2563eb", "#10b981", "#f59e0b"],
          zIndex: 9999,
          disableForReducedMotion: true,
        });
      });
    }

    if (essenciaisCompleted < essenciaisCount) {
      hasConfettiFired.current = false;
    }

    return () => {
      isActive = false;
    };
  }, [essenciaisCompleted, essenciaisCount, reducedMotion]);''',
)

# O skeleton aparece antes da hidratação; por isso a preferência precisa ser
# respeitada no CSS crítico do próprio HTML.
replace_once(
    "index.html",
    '''      @keyframes shimmer {
        0% { opacity: 1; }
        50% { opacity: 0.6; }
        100% { opacity: 1; }
      }
''',
    '''      @keyframes shimmer {
        0% { opacity: 1; }
        50% { opacity: 0.6; }
        100% { opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .initial-skeleton * {
          animation: none !important;
        }
      }
''',
)

# Alinha a implementação à regra do sistema visual: cartões de leitura não
# se deslocam verticalmente no hover.
replace_once(
    "src/index.css",
    '''  &:hover {
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-2px);
    border-color: hsl(var(--border) / 0.78);
  }
''',
    '''  &:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: hsl(var(--border) / 0.78);
  }
''',
)

# Remove versionamento transitório do nome do CSS aprovado.
old_css = ROOT / "src/styles/cover-intro-v5.css"
new_css = ROOT / "src/styles/cover-intro.css"
if old_css.exists() and not new_css.exists():
    old_css.rename(new_css)
replace_once(
    "src/main.tsx",
    'import "./styles/cover-intro-v5.css";',
    'import "./styles/cover-intro.css";',
)

# Fonte estruturada e independente de React para o JSON-LD e para as seções.
write(
    "src/lib/guideMetadata.ts",
    '''export const GUIDE_PROCESS_SECTIONS = [
  {
    id: "secao-1",
    number: "1",
    title: "Abertura e Identificação do Processo",
    shortTitle: "Abertura do Processo",
    subtitle: "Preparação dos dados, autuação, preenchimento do cadastro e registro do NUP",
  },
  {
    id: "secao-2",
    number: "2",
    title: "Preparação e Instrução dos Autos",
    shortTitle: "Instrução dos Autos",
    subtitle: "Função dos documentos, regras aplicáveis, organização e conferência final",
  },
  {
    id: "secao-3",
    number: "3",
    title: "Inclusão de Documentos Externos",
    shortTitle: "Documentos Externos",
    subtitle: "Classificação, inclusão, metadados e identificação dos arquivos no SEI!RIO",
  },
  {
    id: "secao-4",
    number: "4",
    title: "Autenticação de Documentos Digitalizados",
    shortTitle: "Autenticação",
    subtitle: "Autenticação dos arquivos originados em papel e conferência do registro na árvore",
  },
  {
    id: "secao-5",
    number: "5",
    title: "Assinaturas e Remessa do Processo",
    shortTitle: "Assinaturas e Remessa",
    subtitle: "Documentos internos, bloco de assinatura, conferência final e tramitação",
  },
  {
    id: "secao-6",
    number: "6",
    title: "Acompanhamento Posterior à Remessa",
    shortTitle: "Acompanhamento",
    subtitle: "Acompanhamento da análise, atendimento de diligências e providências formalmente comunicadas",
  },
] as const;

export type GuideProcessSection = (typeof GUIDE_PROCESS_SECTIONS)[number];

export const guideHowToSteps = GUIDE_PROCESS_SECTIONS.map((section, index) => ({
  position: index + 1,
  name: section.title,
  text: section.subtitle,
}));
''',
)
replace_once(
    "src/lib/guideContent.ts",
    'import { GUIDE_VERSION } from "@/lib/guideVersion";\n',
    'import { GUIDE_VERSION } from "@/lib/guideVersion";\nimport { GUIDE_PROCESS_SECTIONS, guideHowToSteps } from "@/lib/guideMetadata";\n',
)
replace_once(
    "src/lib/guideContent.ts",
    "export { GUIDE_VERSION };",
    "export { GUIDE_VERSION, guideHowToSteps };",
)
replace_once(
    "src/lib/guideContent.ts",
    '''export interface GuideSectionMeta {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  icon: LucideIcon;
}

export const guideSections = [
''',
    '''export interface GuideSectionMeta {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  icon: LucideIcon;
}

const GUIDE_SECTION_ICONS: Record<(typeof GUIDE_PROCESS_SECTIONS)[number]["id"], LucideIcon> = {
  "secao-1": ClipboardList,
  "secao-2": FileText,
  "secao-3": Upload,
  "secao-4": Shield,
  "secao-5": PenTool,
  "secao-6": Send,
};

export const guideSections = [
''',
)
replace_regex(
    "src/lib/guideContent.ts",
    r'''  \{
    id: "secao-1",.*?  \},
  \{
    id: "contatos",''',
    '''  ...GUIDE_PROCESS_SECTIONS.map((section) => ({
    ...section,
    icon: GUIDE_SECTION_ICONS[section.id],
  })),
  {
    id: "contatos",''',
)
replace_regex(
    "src/lib/guideContent.ts",
    r'''export const guideHowToSteps = contentSections
  \.filter\(\(section\) => /\^\[1-6\]\$/\.test\(section\.number\)\)
  \.map\(\(section, index\) => \(\{
    position: index \+ 1,
    name: section\.title,
    text: section\.subtitle,
  \}\)\);

''',
    "",
)

# Bundle budget and analysis.
write(
    "scripts/check-bundle-budget.ts",
    '''import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.resolve("dist/assets");
const files = await readdir(assetsDir);

const entries = await Promise.all(
  files.map(async (file) => ({
    file,
    bytes: (await stat(path.join(assetsDir, file))).size,
  })),
);

const largest = (extension: string) =>
  entries
    .filter((entry) => entry.file.endsWith(extension))
    .sort((a, b) => b.bytes - a.bytes)[0];

const mainJs = largest(".js");
const mainCss = largest(".css");

if (!mainJs || !mainCss) {
  throw new Error("Não foi possível localizar os bundles principais em dist/assets.");
}

const limits = {
  js: 550_000,
  css: 280_000,
};

console.log(`Bundle JS principal: ${mainJs.file} — ${mainJs.bytes} bytes`);
console.log(`Bundle CSS principal: ${mainCss.file} — ${mainCss.bytes} bytes`);

const violations: string[] = [];
if (mainJs.bytes > limits.js) violations.push(`JS principal excedeu ${limits.js} bytes.`);
if (mainCss.bytes > limits.css) violations.push(`CSS principal excedeu ${limits.css} bytes.`);

if (violations.length > 0) {
  throw new Error(violations.join(" "));
}
''',
)
write(
    "lighthouserc.cjs",
    '''module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      numberOfRuns: 1,
      url: ["http://localhost/"],
      settings: {
        preset: "desktop",
        chromeFlags: "--no-sandbox --headless=new",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.7 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
''',
)
write(
    "knip.json",
    '''{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": [
    "src/main.tsx",
    "vite.config.ts",
    "playwright.config.ts",
    "scripts/*.ts",
    "e2e/*.spec.ts"
  ],
  "project": ["src/**/*.{ts,tsx}", "scripts/**/*.ts", "e2e/**/*.ts"],
  "ignore": ["src/components/ui/**"],
  "ignoreDependencies": ["tailwindcss-animate", "@tailwindcss/typography", "@tailwindcss/postcss"]
}
''',
)

print("Transformações de saneamento aplicadas com sucesso.")
