import { JoinOperation, SavedQuery, TinkarConceptModel, UnitOutput } from '@/api/adr';
import { createWithEqualityFn as create } from 'zustand/traditional';
import { produce } from 'immer';
import { Operation as QueryOperation } from '@/api/adr/model/query';

interface QueryStore {
    query: SavedQuery;
    queryList: Array<SavedQuery>;
    updateQueryStore: (query: SavedQuery) => void;
    updateQueryListStore: (queryList: Array<SavedQuery>) => void;
    addCriteriaToQuery: (criteria: TinkarConceptModel) => void;
    addJoinOperationToQuery: (operation: JoinOperation) => void;
    addOperationToQuery: (index: number, operation: QueryOperation) => void;
    addOperationDoubleToQuery: (index: number, value: number) => void;
    addOperationStringToQuery: (index: number, value: string) => void;
    addFormulaToQuery: () => void;
    addLeftOperandCriteria: (index: number, criteria: TinkarConceptModel) => void;
    addRightOperandCriteria: (index: number, criteria: TinkarConceptModel) => void;
    addLeftOperandValue: (index: number, value: number | null) => void;
    addRightOperandValue: (index: number, value: number | null) => void;
    addLeftOperandUnits: (index: number, value: TinkarConceptModel | null) => void;
    addRightOperandUnits: (index: number, value: TinkarConceptModel | null) => void;
    addOperationToFormula: (index: number, operation: any) => void;
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
        addLeftOperandCriteria: (index, criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.leftOperand = criteria;
                })
            ),
        addRightOperandCriteria: (index, criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.rightOperand = criteria;
                })
            ),
        addOperationToFormula: (index, operation) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.operation = operation;
                })
            ),
        addLeftOperandValue: (index, value) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.leftOperandValue = value;
                })
            ),
        addRightOperandValue: (index, value) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.rightOperandValue = value;
                })
            ),
        addLeftOperandUnits: (index, value) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.leftOperandUnit = value;
                })
            ),
        addRightOperandUnits: (index, value) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.rightOperandUnit = value;
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