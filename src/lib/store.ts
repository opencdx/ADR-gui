import { SavedQuery } from '@/api/adr';
import { createWithEqualityFn as create } from 'zustand/traditional';

interface QueryStore {
    query: SavedQuery;
    updateQuery: (query: SavedQuery) => void;
}

export const useQueryStore = create<QueryStore>()(
    (set) => ({
        query: {query: {queries: []}},
        updateQuery: (query: SavedQuery) => set({ query })
    })
);