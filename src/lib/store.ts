import { createWithEqualityFn as create } from 'zustand/traditional';

interface CriteriaState {
    criteriaList: string[];
    addCriteria: (criteria: string) => void;
    removeCriteria: (index: number) => void;
}

export const useCriteriaStore = create<CriteriaState>()(
    (set) => ({
        criteriaList: [],
        addCriteria: (criteria: string) =>
            set((state) => ({ criteriaList: [...state.criteriaList, criteria] })),
        removeCriteria: (index: number) =>
            set((state) => ({
                criteriaList: state.criteriaList.filter((_, i) => i !== index),
            })),
    })
);