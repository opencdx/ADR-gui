import { SavedQuery, UnitOutput } from '@/api/adr';
import { createWithEqualityFn as create } from 'zustand/traditional';

interface QueryStore {
    query: SavedQuery;
    queryList: Array<SavedQuery>;
    updateQueryStore: (query: SavedQuery) => void;
    updateQueryListStore: (queryList: Array<SavedQuery>) => void;
}

export const useQueryStore = create<QueryStore>()(
    (set) => ({
        query: { query: { queries: []}},
        queryList: [],
        updateQueryStore: (query: SavedQuery) => set({ query }),
        updateQueryListStore: (queryList: Array<SavedQuery>) => set({queryList}),
    })
);