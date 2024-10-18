import { TinkarConceptModel } from '@/api/adr';
import { useSearchData } from '@/hooks/hooks';
import { QUERY_KEYS } from '@/hooks/query-keys';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type FC } from 'react';
import { CriteriaDroppable } from '../droppable/criteria-droppable';
import { UnitsDroppable } from '../droppable/units-droppable';

export interface CriteriaListProps {
    criteriaList: TinkarConceptModel[] | undefined,
    unitsList: TinkarConceptModel[] | undefined,
    filter: string
}

export const CriteriaList: FC<CriteriaListProps> = ({ criteriaList, unitsList, filter }) => {

    const [combinedCriteriaList, setCombinedCriteriaList] = useState<TinkarConceptModel[]>([]);
    const queryClient = useQueryClient();
    const { data: searchResults, refetch } = useSearchData(filter);

    useEffect(() => {
        if (filter) {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SEARCH_QUERY });
            refetch();
        } else {
            setCombinedCriteriaList(criteriaList || []);
        }
    }, [filter, queryClient, refetch, criteriaList]);

    useEffect(() => {
        if (searchResults?.data) {
            setCombinedCriteriaList([...(criteriaList || []), ...searchResults.data].sort((a, b) => 
                (a.conceptName?.toLowerCase() ?? '').localeCompare(b.conceptName?.toLowerCase() ?? '')
            ));
        }
    }, [searchResults, criteriaList]);

    const filteredCriteria = useMemo(() => {
        if (filter) {
            return combinedCriteriaList.filter(item => 
                item.conceptName?.toLowerCase().includes(filter.toLowerCase())
            );
        }
        return criteriaList || []; // Return the original list if no filter
    }, [combinedCriteriaList, filter, criteriaList]);

    const filteredUnits = useMemo(() => {
        if (filter) {
            return unitsList?.filter(item => item.conceptName?.toLowerCase().includes(filter.toLowerCase()));
        }
        return unitsList; // Return the original list if no filter
    }, [unitsList, filter]);

    return (
        <div className='rounded-md p-2 bg-gray-100 border border-gray-200 overflow-auto flex flex-col h-full' key={filteredCriteria ? 'criteria' : 'units'}>
            {filteredCriteria?.map((criteria, index) => (
                <div key={criteria.id + '' + index}>
                    <CriteriaDroppable showCopyIcon={true}
                        criteria={criteria}
                    />
                </div>
            ))}
            {filteredUnits?.map((units, index) => (
                <div key={units.id + '' + index}>
                    <UnitsDroppable showCopyIcon={true}
                        units={units}
                    />
                </div>
            ))}
        </div>
    )
}