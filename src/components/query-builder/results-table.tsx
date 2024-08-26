import { CSSProperties, FC, useMemo, useState } from 'react'
import { usePapaParse } from 'react-papaparse';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const tableStyle: CSSProperties = {}

const windowHeight = window.innerHeight;
const containerHeight = windowHeight * 0.70; // Adjust percentage as needed
tableStyle.height = `${containerHeight}px`;

export interface ResultsTableProps {
    queryResults: string[]
}

export const ResultsTable: FC<ResultsTableProps> = ({ queryResults }) => {

    const [columns, setColumns] = useState<string[]>([]);
    const [rows, setRows] = useState<any>([]);

    const { readString } = usePapaParse();


    const setData = useMemo(() => {
        readString(queryResults.join("\n"), {
            worker: true,
            header: true,
            complete: (results) => {
                setRows(results.data);
            },
        });
        setColumns(queryResults[0].split(','));

    }, [queryResults]);

    return (
        <>
            <DataTable value={rows}
                paginator rows={5}>
                {columns?.map((column) => (
                    <Column field={column} header={column} sortable />
                ),
                )}
            </DataTable>
        </>
    )
}