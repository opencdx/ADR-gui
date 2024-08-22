import { useEffect, useMemo, type CSSProperties, type FC } from 'react'
import { CriteriaBox } from '../droppable/criteria-box'
import { TinkarConceptModel } from '@/api/adr';


export interface CriteriaListProps {
    criteriaList: TinkarConceptModel[] | undefined,
    filter: string
}

export const CriteriaList: FC<CriteriaListProps> = ({ criteriaList, filter }) => {

    const filteredCriteria = useMemo(() => {
        if (filter) {
            return criteriaList?.filter(item => item.conceptName?.toLowerCase().includes(filter.toLowerCase()));
        }
        return criteriaList; // Return the original list if no filter
    }, [criteriaList, filter]);

    return (
        <div className='rounded-md p-2 bg-gray-100 border border-gray-200 overflow-auto flex flex-col  h-[calc(100%-100px)]' >
            {filteredCriteria?.map((criteria) => (
                <>
                    <CriteriaBox key={criteria.id} showCopyIcon={true}
                        criteria={criteria}
                    />
                </>
            ))}
        </div>
    )
}