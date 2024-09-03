import { useMemo, type CSSProperties, type FC } from 'react'
import { CriteriaDroppable } from '../droppable/criteria-droppable'
import { TinkarConceptModel } from '@/api/adr';
import { UnitsDroppable } from '../droppable/units-droppable';


export interface CriteriaListProps {
    criteriaList: TinkarConceptModel[] | undefined,
    unitsList: TinkarConceptModel[] | undefined,
    filter: string
}

export const CriteriaList: FC<CriteriaListProps> = ({ criteriaList, unitsList, filter }) => {

    const filteredCriteria = useMemo(() => {
        if (filter) {
            return criteriaList?.filter(item => item.conceptName?.toLowerCase().includes(filter.toLowerCase()));
        }
        return criteriaList; // Return the original list if no filter
    }, [criteriaList, filter]);

    const filteredUnits = useMemo(() => {
        if (filter) {
            return unitsList?.filter(item => item.conceptName?.toLowerCase().includes(filter.toLowerCase()));
        }
        return unitsList; // Return the original list if no filter
    }, [unitsList, filter]);

    return (
        <div className='rounded-md p-2 bg-gray-100 border border-gray-200 overflow-auto flex flex-col h-screen' >
            {filteredCriteria?.map((criteria) => (
                <>
                    <CriteriaDroppable key={criteria.id} showCopyIcon={true}
                        criteria={criteria}
                    />
                </>
            ))}
            {filteredUnits?.map((units) => (
                <>
                    <UnitsDroppable key={units.id} showCopyIcon={true}
                        units={units}
                    />
                </>
            ))}
        </div>
    )
}