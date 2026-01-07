import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pdde-document-checklist';

export const useDocumentChecklist = (items: string[]) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCheckedItems(new Set(parsed));
      } catch (e) {
        console.error('Error parsing checklist from localStorage', e);
      }
    }
  }, []);

  const toggleItem = (item: string) => {
    setCheckedItems(prev => {
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
  
  const progress = items.length > 0 ? (checkedItems.size / items.length) * 100 : 0;
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
