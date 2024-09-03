import { JoinOperation, SavedQuery, TinkarConceptModel, UnitOutput } from '@/api/adr';
import { createWithEqualityFn as create } from 'zustand/traditional';
import { produce } from 'immer';
import { Operation } from '@/api/adr/model/query';

interface QueryStore {
    query: SavedQuery;
    queryList: Array<SavedQuery>;
    updateQueryStore: (query: SavedQuery) => void;
    updateQueryListStore: (queryList: Array<SavedQuery>) => void;
    addCriteriaToQuery: (criteria: TinkarConceptModel) => void;
    addJoinOperationToQuery: (operation: JoinOperation) => void;
    addOperationToQuery: (index: number, operation: Operation) => void;
    addOperationDoubleToQuery: (index: number, value: number) => void;
    addOperationStringToQuery: (index: number, value: string) => void;
    addFormulaToQuery: () => void;
    removeFromQuery: (index: number) => void;
    resetQueryStore: () => void;
}

export const useQueryStore = create<QueryStore>()(
    (set) => ({
        query: { query: { queries: [], unitOutput: UnitOutput.Imperial } },
        queryList: [],
        updateQueryStore: (query) =>
            set(
                produce((draft) => {
                    draft.query = { ...query };
                })
            ),
        updateQueryListStore: (queryList) =>
            set(
                produce((draft) => {
                    draft.queryList = [...queryList]
                })
            ),
        addCriteriaToQuery: (criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries.push({
                        concept: criteria
                    });
                })
            ),
        addJoinOperationToQuery: (operation) =>
            set(
                produce((draft) => {
                    draft.query.query.queries.push({
                        joinOperation: operation
                    });
                })
            ),
        addOperationToQuery: (index, operation) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].operation = operation;
                })
            ),
        addOperationDoubleToQuery: (index, value) =>
                set(
                    produce((draft) => {
                        draft.query.query.queries[index].operationDouble = value;
                    })
                ),
        addOperationStringToQuery: (index, value) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].operationString = value;
                })
            ),
        addFormulaToQuery: () =>
            set(
                produce((draft) => {
                    draft.query.query.queries.push({
                        formula: {}
                    })
                })
            ),
        removeFromQuery: (index) =>
            set(
                produce((draft) => {
                    draft.query.query.queries.splice(index, 1);
                })
            ),
        resetQueryStore: () =>
            set(
                produce((draft) => {
                    draft.query = { query: { queries: [], unitOutput: UnitOutput.Imperial }, name: '' };
                })
            ),
    })
);