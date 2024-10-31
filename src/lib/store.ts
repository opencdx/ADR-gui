import { Focus, JoinOperation, Query, SavedQuery, TinkarConceptModel, UnitOutput } from '@/api/adr';
import { Operation as QueryOperation } from '@/api/adr/model/query';
import { produce } from 'immer';
import { createWithEqualityFn as create } from 'zustand/traditional';

interface QueryStore {
    query: SavedQuery;
    queryList: Array<SavedQuery>;
    isReturn: boolean;
    queryText: string;
    clearQuery: () => void;
    updateIsReturn: (isReturn: boolean) => void;
    updateQueryStore: (query: SavedQuery) => void;
    updateQueryListStore: (queryList: Array<SavedQuery>) => void;
    removeFromQuery: (index: number) => void;
    removeFromQueryGroup: (index: number, groupIndex: number[], depth: number) => void;
    removeFromQueryGroupSection: (index: number, groupIndex: number[]) => void;
    resetQueryStore: () => void;
    setQueryText: (queryText: string) => void;

    addCriteriaToQuery: (criteria: TinkarConceptModel) => void;
    addJoinOperationToQuery: (operation: JoinOperation) => void;

    addOperationToQuery: (index: number, operation: QueryOperation) => void;
    addOperationDoubleToQuery: (index: number, value: number) => void;
    addOperationStringToQuery: (index: number, value: string) => void;

    addFormulaToQuery: () => void;
    addGroupToQuery: () => void;
    addGroupToQueryGroup: (index: number) => void;
    addSubGroupToQueryGroup: (index: number, group: number) => void;

    addCriteraToQueryGroup: (index: number, criteria: TinkarConceptModel) => void;
    addGroupCriteraToQueryGroup: (index: number, criteria: TinkarConceptModel, groupIndex1: number, depth: number) => void;
    addGroupJoinOperationToQueryGroup: (index: number, operation: JoinOperation, groupIndex1: number, depth: number) => void;
    addOperationDoubleToGroup: (index: number, value: number, groupIndex: number) => void;
    addOperationStringToGroup: (index: number, value: string, groupIndex: number) => void;
    addGroupOperationDoubleToQuery: (index: number, value: number, groupIndex1: number, depth: number) => void;
    addGroupOperationStringToQuery: (index: number, value: string, groupIndex1: number, depth: number) => void;
    addGroupFormulaToQueryGroup: (index: number, groupIndex1: number) => void;
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
    addNameToSubGroupFormula: (index: number, groupIndex: number, subGroupIndex: number, name: string) => void;
    addFormulaToFormula: (index: number, parent: string, child: string) => void;
    addValueToFormulaThirdDepth: (index: number, value: number, parent: string, child: string, child2: string) => void;

    addToQueryFormula: (index: number, value: any) => void;
    addToQueryFormulaInGrouping: (index: number, value: any, groupIndex: number) => void;
    addToQueryFormulaInSubGrouping: (index: number, value: any, groupIndex: number, subGroupIndex: number) => void;

    addFocusToQuery: (index: number, focus: Focus) => void;
    addFocusToQueryGrouping: (index: number, focus: Focus, groupIndex: number) => void;
    addFocusToQuerySubGrouping: (index: number, focus: Focus, groupIndex: number, subGroupIndex: number) => void;

    updateQueryName: (name: string) => void;

    updateCriteriaByIndex: (index: number, criteria: TinkarConceptModel) => void;
    updateCriteriaByGrouping: (index: number, groupIndex: number, criteria: TinkarConceptModel) => void;
    updateCriteriaBySubGrouping: (index: number, groupIndex: number, subGroupIndex: number, criteria: TinkarConceptModel) => void;
}

export const useQueryStore = create<QueryStore>()(
    (set) => ({
        query: { query: { queries: [], unitOutput: UnitOutput.Imperial } },
        queryList: [],
        isReturn: false,
        queryText: '',
        clearQuery: () =>
            set(
                produce((draft) => {
                    draft.query = { query: { queries: [], unitOutput: UnitOutput.Imperial } }
                })
            ),
        updateIsReturn: (isReturn) =>
            set(
                produce((draft) => {
                    draft.isReturn = isReturn;
                })
            ),
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
                    draft.query.query.queries[index].group[groupIndex1].group.push({
                        concept: criteria
                    });
                })
            ),
        addGroupOperationToQueryGroup: (index, operation, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1].group[depth].operation = operation;
                })
            ),
        addOperationDoubleToGroup: (index, value, groupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].operationDouble = value;
                })
            ),
        addOperationStringToGroup: (index, value, groupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].operationString = value;
                })
            ),
        addGroupOperationDoubleToQuery: (index, value, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1].group[depth].operationDouble = value;
                })
            ),
        addGroupOperationStringToQuery: (index, value, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1].group[depth].operationString = value;
                })
            ),
        addGroupJoinOperationToQueryGroup: (index, operation, groupIndex1, depth) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1].group.push({
                        joinOperation: operation
                    });
                })
            ),
        addGroupFormulaToQueryGroup: (index, groupIndex1) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex1].group.push({
                        formula: {}
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
        removeFromQueryGroup: (index, groupIndex, depth) =>
            set(
                produce((draft) => {
                    if (groupIndex && (groupIndex.length === 0 || groupIndex.length === 1)) {
                        draft.query.query.queries[index].group.splice(depth, 1);
                    } else {
                        draft.query.query.queries[index].group[groupIndex[0]].group.splice(depth, 1);
                    }
                })
            ),
        removeFromQueryGroupSection: (index, groupIndex) =>
            set(
                produce((draft) => {
                    if (groupIndex.length === 0) {
                        draft.query.query.queries.splice(index, 1);
                    } else {
                        let target = draft.query.query.queries[index];
                        for (let i = 0; i < groupIndex.length - 1; i++) {
                            target = target.group[groupIndex[i]];
                        }
                        target.group.splice(groupIndex[groupIndex.length - 1], 1);
                    }
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
        addGroupToQueryGroup: (index) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group.push({ group: [] });
                })
            ),
        addSubGroupToQueryGroup: (index, groupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].push({ group: [] });
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
        setQueryText: (queryText) =>
            set(
                produce((draft) => {
                    draft.queryText = queryText;
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
        addNameToSubGroupFormula: (index, groupIndex, subGroupIndex, name) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].group[subGroupIndex].formula.name = name;
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
        addToQueryFormulaInSubGrouping: (index, value, groupIndex, subGroupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].group[subGroupIndex].formula = value;
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
        addFocusToQuerySubGrouping: (index, focus, groupIndex, subGroupIndex) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].group[subGroupIndex].concept.focus = focus;
                })
            ),
        updateQueryName: (name) =>
            set(
                produce((draft) => {
                    draft.query.name = name;
                })
            ),
        updateCriteriaByIndex: (index, criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].concept = criteria;
                })
            ),
        updateCriteriaByGrouping: (index, groupIndex, criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].concept = criteria;
                })
            ),
        updateCriteriaBySubGrouping: (index, groupIndex, subGroupIndex, criteria) =>
            set(
                produce((draft) => {
                    draft.query.query.queries[index].group[groupIndex].group[subGroupIndex].concept = criteria;
                })
            ),
    })
);