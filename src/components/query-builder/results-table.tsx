import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { CSSProperties, FC, useMemo, useState } from 'react'

const tableStyle: CSSProperties = {}

const windowHeight = window.innerHeight;
const containerHeight = windowHeight * 0.70; // Adjust percentage as needed
tableStyle.height = `${containerHeight}px`;

export interface ResultsTableProps {
    queryResults: string[]
}

export const ResultsTable: FC<ResultsTableProps> = ({ queryResults }) => {

    const [columns, setColumns] = useState<string[]>([]);
    const [rows, setRows] = useState<string[][]>([]);

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(rows.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return rows.slice(start, end);
    }, [page, rows]);

    const setData = useMemo(() => {
        setColumns(queryResults[0].split(','));
        queryResults.splice(0, 1);

        const rows: string[][] = [];

        queryResults.forEach((query) => {
            rows.push(query.split(','));
        });

        setRows(rows);

    }, [queryResults]);

    return (
        <>
            <h1>Results: </h1>
            <Table aria-label='Example static collection table'
                className='overflow-scroll'
                style={{...tableStyle}}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    {columns?.map((column) => (
                        <TableColumn>{column}</TableColumn>
                    ),
                    )}
                </TableHeader>
                <TableBody>
                    {rows?.map((row, index) => (
                        <TableRow key={index}>
                            {row?.map((entry) => (
                                <TableCell>{entry}</TableCell>
                            ))}
                        </TableRow>
                    ),
                    )}
                </TableBody>
            </Table >
        </>
    )
}