import { usePostQuery } from '@/hooks/hooks';
import { useQueryStore } from '@/lib/store';
import { errorToast, successToast } from '@/lib/utils';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import { Button, Divider, DownloadIcon, ReturnIcon } from 'ui-library';

export interface ResultsTableProps {

}

export const ResultsTable: FC<ResultsTableProps> = ({ }) => {

    const router = useRouter();
    const [columns, setColumns] = useState<any>([]);
    const [rows, setRows] = useState<any>([]);
    const [isError, setIsError] = useState(false);

    const { readString } = usePapaParse();

    const { mutate: postQuery, data: queryResults } = usePostQuery();
    const { query, updateIsReturn } = useQueryStore();

    const fetchData = useMemo(() => {
        if (query.query) {
            postQuery(query.query, {
                onSuccess: () => {
                    successToast('Query ready for review!');
                    setIsError(false);
                },
                onError: (error) => {
                    errorToast(error?.message);
                    setIsError(true);
                }
            });
        }
    }, []);

    const setData = useMemo(() => {
        if (queryResults?.data) {
            let sanitizedResult;
            if (queryResults.data[0].endsWith(',')) {
                sanitizedResult = queryResults.data[0].slice(0, -1);
            } else {
                sanitizedResult = queryResults.data[0];
            }

            let updateResults = [...queryResults.data];

            if (queryResults.data[0].endsWith(',')) {
                updateResults = [];
                queryResults.data.map(row => updateResults.push(row.slice(0, -1)));
            }
            updateResults[0] = sanitizedResult;
            readString(updateResults.join("\n"), {
                worker: true,
                header: true,
                complete: (results) => {
                    let updatedRows: any[] = [];
                    results.data.map((row, index) => updatedRows.push({ id: index, ...row! }));
                    setRows(results.data);
                },
            });
            let updatedColumns: { id: string, accessorKey: string; header: string; }[] = [];
            let columnId = sanitizedResult.split(',');
            if (queryResults.data[0].endsWith(',')) {
                queryResults.data[0].slice(0, -1).split(',').map((column, index) => updatedColumns.push({ id: columnId[index], accessorKey: columnId[index], header: column }));
            } else {
                queryResults.data[0].split(',').map((column, index) => updatedColumns.push({ id: columnId[index], accessorKey: columnId[index], header: column }));
            }
            setColumns(updatedColumns);
        }

    }, [queryResults]);

    const convertToCsv = (objArray: string[]) => {
        let csv = '';

        objArray.forEach(line => {
            csv += line + '\r\n';
        });

        return csv;
    }

    const downloadCsv = () => {
        if (queryResults?.data) {
            const csv = new Blob([convertToCsv(queryResults?.data)], { type: 'text/csv' });
            const csvUrl = URL.createObjectURL(csv);
            const link = document.createElement('a');
            link.href = csvUrl;
            document.body.appendChild(link);
            link.download = `${query.name}.csv`;
            link.click();
            document.body.removeChild(link);
        }
    };


    const table = useMantineReactTable({
        columns: columns,
        data: rows, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowSelection: false, //enable some features
        enableColumnOrdering: true,
        enableGlobalFilter: true, //turn off a feature
        enablePagination: true,
        enableColumnActions: true,
        enableColumnFilters: true,
        enableSorting: true,
        enableRowActions: false,
        enableGrouping: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableRowVirtualization: true,
        enableColumnResizing: true,
        layoutMode: "grid",
        mantineTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                textAlign: 'center',
            },
        },
        mantineTableProps: {
            height: '500px',
            striped: true,
            highlightOnHover: true,
            withColumnBorders: true,

            sx: {
                '& tr:nth-of-type(odd)': {
                    backgroundColor: '#F7FAFE !important',
                },
                '& tr:nth-of-type(even)': {
                    backgroundColor: '#FFFFFF !important',
                },
                '& thead tr:nth-of-type(1)': {
                    backgroundColor: '#E5F0FF !important',
                },
            },
            withBorder: true,

        },
        initialState: {
            density: 'xs',
        },
    });

    const returnToBuilder = () => {
        updateIsReturn(true);
        router.push('/query-builder');
    };


    return (
        <>
            <div className='flex py-4 bg-blue-100 p-4 flex flex-row  w-screen h-screen overflow-hidden'>
                <div className='rounded-md bg-white p-4 h-full  w-full flex-grow '>
                    <p className='text-xl'>{query.name} Results</p>

                    <div className='flex flex-row justify-start'>
                        <Button color='primary' variant='bordered' className='m-1' startContent={<ReturnIcon />} onPress={() => returnToBuilder()}>Return to Query Builder</Button>
                        <Button color='primary' radius='md' className='m-1' startContent={<DownloadIcon />} onPress={downloadCsv} isDisabled={isError}>Download CSV</Button>

                    </div>

                    <Divider className='my-4' />
                    <div className='w-full h-full  flex-grow'>
                        {rows && rows.length > 0 && columns && columns.length > 0 &&
                            <MantineReactTable

                                table={table} />
                        }
                        {rows && rows.length == 0 &&
                            <p>No results returned</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}