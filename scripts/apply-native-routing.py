from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "src/pages/Index.tsx"
content = PATH.read_text(encoding="utf-8")

replacements = [
    (
        'import { useSearchParams } from "react-router-dom";\n',
        'import { useBrowserSearchParams } from "@/hooks/useBrowserSearchParams";\n',
    ),
    (
        "  const [searchParams, setSearchParams] = useSearchParams();",
        "  const [searchParams, setSearchParams] = useBrowserSearchParams();",
    ),
]

for old, new in replacements:
    if new in content:
        continue
    if old not in content:
        raise RuntimeError(f"Trecho esperado não encontrado em {PATH}: {old!r}")
    content = content.replace(old, new, 1)

PATH.write_text(content, encoding="utf-8")
print("Index.tsx migrado para parâmetros de URL nativos.")
