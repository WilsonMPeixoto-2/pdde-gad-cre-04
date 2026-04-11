import { useState } from "react";

const STORAGE_KEY = "pdde-document-checklist";

export const useDocumentChecklist = (items: string[]) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return new Set();
    }

    try {
      const parsed = JSON.parse(saved);
      return new Set(parsed);
    } catch {
      return new Set();
    }
  });

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const isChecked = (item: string) => checkedItems.has(item);

  const progress =
    items.length > 0 ? (checkedItems.size / items.length) * 100 : 0;
  const checkedCount = checkedItems.size;
  const totalCount = items.length;

  return {
    checkedItems,
    toggleItem,
    isChecked,
    progress,
    checkedCount,
    totalCount,
  };
};
