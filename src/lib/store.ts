import { Focus, JoinOperation, Query, SavedQuery, TinkarConceptModel, UnitOutput } from '@/api/adr';
import { Operation as QueryOperation } from '@/api/adr/model/query';
import { produce } from 'immer';
import { createWithEqualityFn as create } from 'zustand/traditional';

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
    addGroupToQueryGroup: (index: number, group: Query, depth: number) => void; 

    addCriteraToQueryGroup: (index: number, criteria: TinkarConceptModel) => void;
    addGroupCriteraToQueryGroup: (index: number,  criteria: TinkarConceptModel,groupIndex1: number, depth: number) => void; 
    addGroupJoinOperationToQueryGroup: (index: number, operation: JoinOperation,  groupIndex1: number, depth: number) => void;
    addGroupOperationDoubleToQuery: (index: number, value: number, groupIndex1: number, depth: number) => void;
    addGroupFormulaToQueryGroup: (index: number, formula: Query, groupIndex1: number, depth: number) => void;
    addJoinOperationToQueryGroup: (index: number, operation: JoinOperation) => void;
    addFormulaToQueryGroup: (index: number, formula: Query) => void;
    addOperationToQueryGroup: (index: number, group: Query, depth: number) => void;
    addGroupOperationToQueryGroup: (index: number, operation: QueryOperation, groupIndex1: number, depth: number) => void;
    addOperandCriteria: (index: number, criteria: TinkarConceptModel, field: string) => void;

    addOperandToFormula: (index: number, field: string) => void;

    addOperandValue: (index: number, value: number | null, field: string) => void;

    addOperandUnits: (index: number, value: TinkarConceptModel | null, field: string) => void;

    addNameToFormula: (index: number, name: string) => void;
    addNameToGroupingFormula: (index: number, groupIndex: number, name: string) => void;
    addFormulaToFormula: (index: number, parent: string, child: string) => void;
    addValueToFormulaThirdDepth: (index: number, value: number, parent: string, child: string, child2: string) => void;

    addToQueryFormula: (index: number, value: any) => void;
    addToQueryFormulaInGrouping: (index: number, value: any, groupIndex: number) => void;

    addFocusToQuery: (index: number, focus: Focus) => void;
    addFocusToQueryGrouping: (index: number, focus: Focus, groupIndex: number) => void;
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
        addCriteraToQueryGroup: (index, criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group.push({
                        concept: criteria
                    });
                })
            ),
        addGroupCriteraToQueryGroup: (index, criteria, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1-1].group.push({
                        concept: criteria
                    });
                })
            ),
        addGroupOperationToQueryGroup: (index, operation, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1-1].group[depth].operation = operation;
                })
            ),
        addGroupOperationDoubleToQuery: (index, value, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1-1].group[depth].operationDouble = value;
                })
            ),

        addGroupJoinOperationToQueryGroup: (index, operation, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1-1].group.push({
                        joinOperation: operation
                    });
                })
            ),
        addGroupFormulaToQueryGroup: (index, formula, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1-1].group.push({
                        formula: formula
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
                        formula: {}
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
        addGroupToQueryGroup: (index, group, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group.push({group:[]});
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
        addOperandValue: (index, value, position) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[position] = value;
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
        addNameToGroupingFormula: (index, groupIndex, name) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].formula.name = name;
                })
            ),
        addFormulaToFormula: (index, parent, child) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[parent][child] = {};
                })
            ),
        addValueToFormulaThirdDepth: (index, value, parent, child, child2) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula[parent][child][child2] = value;
                })
            ),
        addToQueryFormula: (index, value) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].formula = value;
                })
            ),
        addToQueryFormulaInGrouping: (index, value, groupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].formula = value;
                })
            ),
        addFocusToQuery: (index, focus) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].concept.focus = focus;
                })
            ),
        addFocusToQueryGrouping: (index, focus, groupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].concept.focus = focus;
                })
            ),
    })
);