import { useEffect, useMemo, type CSSProperties, type FC } from 'react'
import { CriteriaBox } from './criteria-box'
import { TinkarConceptModel } from '@/api/adr';

const criteriaContainer: CSSProperties = {}

const windowHeight = window.innerHeight;
const containerHeight = windowHeight * 0.70; // Adjust percentage as needed
criteriaContainer.height = `${containerHeight}px`;

export interface CriteriaListProps {
    criteriaList: TinkarConceptModel[] | undefined,
    filter: string
}

export const CriteriaList: FC<CriteriaListProps> = ({ criteriaList, filter }) => {

    const criteria = useMemo(() => {
        if (filter) {
            criteriaList = criteriaList?.filter(item => {
                return item.conceptName?.toLowerCase().includes(filter.toLowerCase());
            });
        }
    }, [criteriaList, filter]);

    useEffect(() => {
        if (filter) {
            criteriaList = criteriaList?.filter(item => {
                return item.conceptName?.toLowerCase().includes(filter.toLowerCase());
            });
        }
    });

    return (
        <div className='rounded-md p-2 bg-gray-100 border border-gray-200 overflow-auto flex flex-col' style={{ ...criteriaContainer }}>
            {criteriaList?.map((criteria) => (
                <>
                    <CriteriaBox key={criteria.id} showCopyIcon={true}
                        criteria={criteria}
                    />
                </>
            ))}
        </div>
    )
}