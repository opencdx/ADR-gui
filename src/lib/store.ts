import { JoinOperation, SavedQuery, TinkarConceptModel, UnitOutput } from '@/api/adr';
import { createWithEqualityFn as create } from 'zustand/traditional';
import { produce } from 'immer';
import { Operation as QueryOperation } from '@/api/adr/model/query';
import { Query } from '@/api/adr';

interface QueryStore {
    query: SavedQuery;
    queryList: Array<SavedQuery>;
    updateQueryStore: (query: SavedQuery) => void;
    updateQueryListStore: (queryList: Array<SavedQuery>) => void;
    removeFromQuery: (index: number) => void;
    resetQueryStore: () => void;

    addCriteriaToQuery: (criteria: TinkarConceptModel) => void;
    addJoinOperationToQuery: (operation: JoinOperation) => void;

    addOperationToQuery: (index: number, operation: QueryOperation) => void;
    addOperationDoubleToQuery: (index: number, value: number) => void;
    addOperationStringToQuery: (index: number, value: string) => void;

    addFormulaToQuery: () => void;
    addGroupToQuery: () => void;

    addCriteraToQueryGroup: (index: number, criteria: TinkarConceptModel, field: string) => void;
    addJoinOperationToQueryGroup: (index: number, operation: JoinOperation) => void;
    addFormulaToQueryGroup: (index: number, formula: Query) => void;
    addOperationToQueryGroup: (index: number, group: Query, depth: number) => void;
    

    addOperandCriteria: (index: number, criteria: TinkarConceptModel, field: string) => void;

    addOperandToFormula: (index: number, field: string) => void;

    addOperandCriteriaToFormula: (index: number, criteria: TinkarConceptModel, parent: string, field: string) => void;

    addOperandValue: (index: number, value: number | null, field: string) => void;
    addOperandValueToFormula: (index: number, value: number | null, position: string, field: string) => void;

    addOperandUnits: (index: number, value: TinkarConceptModel | null, field: string) => void;

    addOperationToFormula: (index: number, operation: any) => void;
    addNameToFormula: (index: number, name: string) => void;
    addFormulaToFormula: (index: number, parent: string, child: string) => void;
    addToFormulaThirdDepth: (index: number, value: TinkarConceptModel, parent: string, child: string, child2: string) => void;
    addValueToFormulaThirdDepth: (index: number, value: number, parent: string, child: string, child2: string) => void;
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
        addCriteraToQueryGroup: (index, criteria, field) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group.push({
                        concept: criteria
                    });
                })
            ),
        addOperationToQueryGroup: (index, operation, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[depth].operation = operation;
                })
            ),
        addJoinOperationToQueryGroup: (index, operation) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group.push({
                        joinOperation: operation
                    });
                })
            ),
        addFormulaToQueryGroup: (index, formula) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group.push({
                        formula: formula
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
        addGroupToQuery: () =>
            set(
                produce((draft) => {
                    draft.query.query.queries.push({
                        group: []
                    })
                })
            ),
        addOperandCriteria: (index, criteria, field) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[field] = criteria;
                })
            ),
        addOperandToFormula: (index, field) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[field] = {}
                })
            ),
        addOperandCriteriaToFormula: (index, criteria, parent, field) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[parent][field] = criteria;
                })
            ),
        addOperationToFormula: (index, operation) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.operation = operation;
                })
            ),
        addOperandValue: (index, value, position) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[position] = value;
                })
            ),
        addOperandValueToFormula: (index, value, position, field) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[position][field] = value;
                })
            ),
        addOperandUnits: (index, value, field) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[field] = value;
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
        addNameToFormula: (index, name) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula.name = name;
                })
            ),
        addFormulaToFormula: (index, parent, child) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[parent][child] = {};
                })
            ),
        addToFormulaThirdDepth: (index, value, parent, child, child2) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[parent][child][child2] = value;
                })
            ),
        addValueToFormulaThirdDepth: (index, value, parent, child, child2) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[parent][child][child2] = value;
                })
            ),
    })
);