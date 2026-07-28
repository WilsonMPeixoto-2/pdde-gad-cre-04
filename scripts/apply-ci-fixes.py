from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(path: str, old: str, new: str) -> None:
    target = ROOT / path
    content = target.read_text(encoding="utf-8")
    if old not in content:
        if new in content or not old.strip():
            return
        raise RuntimeError(f"Trecho esperado não encontrado em {path}.")
    target.write_text(content.replace(old, new, 1), encoding="utf-8")


replace_once(
    "src/lib/guideContent.ts",
    '''export const guideHowToSteps = contentSections
  .filter((section) => /^[1-6]$/.test(section.number))
  .map((section, index) => ({
    position: index + 1,
    name: section.title,
    text: section.subtitle,
  }));

''',
    "",
)

print("Correções do CI aplicadas.")
