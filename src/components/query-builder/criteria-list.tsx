import { useEffect, useMemo, type CSSProperties, type FC } from 'react'
import { CriteriaBox } from './criteria-box'

const criteriaContainer: CSSProperties = {
    borderRadius: '8px',
    padding: '8px',
    background: '#FAFAFA',
    border: '1px solid #E4E4E7',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'column',
}

const windowHeight = window.innerHeight;
const containerHeight = windowHeight * 0.70; // Adjust percentage as needed
criteriaContainer.height = `${containerHeight}px`;

export interface CriteriaListProps {
    criteriaList: any[],
    filter: string
}

export const CriteriaList: FC<CriteriaListProps> = ({ criteriaList, filter }) => {

    const criteria = useMemo(() => {
        if (filter) {
            criteriaList = criteriaList.filter(item => {
                return item.conceptName.toLowerCase().includes(filter.toLowerCase());
            });
        }
    }, [criteriaList, filter]);

    useEffect(() => {
        if (filter) {
            criteriaList = criteriaList.filter(item => {
                return item.conceptName.toLowerCase().includes(filter.toLowerCase());
            });
        }
    });

    return (
        <div style={{ ...criteriaContainer }}>
            {criteriaList?.map((criteria) => (
                <>
                    <CriteriaBox key={criteria.id} showCopyIcon={true} criteria={criteria.conceptName} />
                </>
            ))}
        </div>
    )
}