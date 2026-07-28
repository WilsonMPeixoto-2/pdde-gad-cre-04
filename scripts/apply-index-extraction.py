from __future__ import annotations

import re
from pathlib import Path

path = Path("src/pages/Index.tsx")
source = path.read_text(encoding="utf-8")


def replace_once(old: str, new: str) -> None:
    global source
    if old not in source:
        if new in source:
            return
        raise RuntimeError(f"Trecho esperado não encontrado: {old[:120]!r}")
    source = source.replace(old, new, 1)


def remove_regex(pattern: str) -> None:
    global source
    source, count = re.subn(pattern, "", source, count=1, flags=re.DOTALL)
    if count != 1:
        raise RuntimeError(f"Bloco esperado não encontrado: {pattern[:120]!r}")


replace_once(
    'import { type ReactNode, lazy, Suspense, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";',
    'import { lazy, Suspense, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";',
)
replace_once('import { AlertTriangle, RotateCcw } from "lucide-react";\n', "")
replace_once(
    'import { DocumentFooter } from "@/components/pop/DocumentFooter";\n',
    'import { DocumentFooter } from "@/components/pop/DocumentFooter";\n'
    'import { DeferredSectionSlot } from "@/components/pop/DeferredSectionSlot";\n'
    'import { GuideSectionLoader } from "@/components/pop/GuideSectionLoader";\n'
    'import { useDeferredGuideSections } from "@/hooks/useDeferredGuideSections";\n'
    'import { useGuidePrintCoordinator } from "@/hooks/useGuidePrintCoordinator";\n',
)
replace_once('  GUIDE_ANCHORS,\n', "")
replace_once('  guideAnchorParentSections,\n', "")
replace_once(
    '''import {
  consumePendingGuidePreload,
  GUIDE_PRELOAD_EVENT,
  hasPendingGuidePreload,
  scrollToGuideAnchor,
  type GuidePreloadDetail,
} from "@/lib/guideNavigation";
''',
    'import { scrollToGuideAnchor } from "@/lib/guideNavigation";\n',
)
replace_once(
    '''import {
  readGuideTargetFromSearchParams,
  withGuideTarget,
} from "@/lib/guideRoutes";
''',
    '''import {
  readGuideTargetFromSearchParams,
  withGuideTarget,
} from "@/lib/guideRoutes";
import {
  loadSectionAnexo,
  loadSectionContacts,
  loadSectionFive,
  loadSectionFour,
  loadSectionSix,
  loadSectionThree,
  loadSectionTwo,
  resolveDeferredSectionId,
} from "@/lib/deferredGuideSections";
''',
)

remove_regex(
    r'''// Lazy load below-the-fold sections for better initial load performance\nconst loadSectionTwo = .*?const loadSectionAnexo = .*?;\n\n'''
)
remove_regex(
    r'''// Premium shimmer skeleton loader with min-height to prevent CLS\nconst SectionLoader = \(\) => \(.*?\n\);\n\n'''
)
remove_regex(
    r'''const deferredSectionLoaders = \{.*?\n\};\n\nconst Index = \(\) => \{'''
)
source = source.replace("\n\n  const [searchParams", "\n\nconst Index = () => {\n  const [searchParams", 1)

replace_once('  const [isPreparingPrint, setIsPreparingPrint] = useState(false);\n', "")
remove_regex(
    r'''  const \[deferredSectionStatuses, setDeferredSectionStatuses\] = useState\(.*?\n  \);\n'''
)
replace_once('  const deferredLoadPromisesRef = useRef(new Map<GuideSectionId, Promise<void>>());\n', "")
replace_once(
    '  const activeSectionTriggerOffset = 140;\n\n',
    '''  const activeSectionTriggerOffset = 140;
  const {
    activateAllDeferredSections,
    activateDeferredSection,
    activateDeferredSectionsThroughTarget,
    getDeferredSectionStatus,
  } = useDeferredGuideSections();
  const { handlePrint, isPreparingPrint } = useGuidePrintCoordinator(
    activateAllDeferredSections,
  );

''',
)
remove_regex(
    r'''  const getDeferredSectionStatus = .*?\n  \}, \[\]\);\n\n'''
)
remove_regex(
    r'''  const activateDeferredSection = useCallback\(.*?\n  const syncVisibleSection ='''
)
source = source.replace("\n\n  const syncVisibleSection =", "\n\n  const syncVisibleSection =", 1)

remove_regex(
    r'''  useEffect\(\(\) => \{\n    const handleGuidePreload = .*?\n  \}, \[activateDeferredSection\]\);\n\n'''
)
remove_regex(
    r'''  useEffect\(\(\) => \{\n    const warmInstructionSection = .*?\n  \}, \[activateDeferredSection\]\);\n\n'''
)
source = source.replace("<SectionLoader />", "<GuideSectionLoader />")

path.write_text(source, encoding="utf-8")
print("Index.tsx reduzido aos fluxos de navegação e composição.")
