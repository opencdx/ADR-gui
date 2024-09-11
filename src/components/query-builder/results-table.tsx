import { CSSProperties, FC, useMemo, useState } from 'react'
import { usePapaParse } from 'react-papaparse';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Divider } from 'ui-library';
import { useQueryStore } from '@/lib/store';
import { usePostQuery } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';
import { DownloadIcon, ReturnIcon } from '../icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tableStyle: CSSProperties = {}

const windowHeight = window.innerHeight;
const containerHeight = windowHeight * 0.70; // Adjust percentage as needed
tableStyle.height = `${containerHeight}px`;

export interface ResultsTableProps {

}

export const ResultsTable: FC<ResultsTableProps> = ({ }) => {

    const router = useRouter();
    const [columns, setColumns] = useState<string[]>([]);
    const [rows, setRows] = useState<any>([]);

    const { readString } = usePapaParse();

    const { mutate: postQuery, data: queryResults } = usePostQuery();
    const { query } = useQueryStore();

    const fetchData = useMemo(() => {
        if (query.query) {
            postQuery(query.query, {
                onSuccess: () => {
                    toast.success('Query ready for review!', {
                        position: 'top-right',
                        autoClose: 2000,
                    });
                }
            });
        }
    }, []);

    const setData = useMemo(() => {
        if (queryResults?.data) {
            readString(queryResults.data.join("\n"), {
                worker: true,
                header: true,
                complete: (results) => {
                    setRows(results.data);
                },
            });
            setColumns(queryResults.data[0].split(','));
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

    return (
        <>
            <div className='flex py-4 bg-blue-100 p-4 flex flex-row overflow-hidden w-screen h-screen'>
                <div className='rounded-md bg-white p-4'>
                    <p className='text-xl'>{query.name} Results</p>
                    <ToastContainer />
                    <Button color='primary' variant='bordered' className='m-1' startContent={<ReturnIcon />} onPress={() => router.push('/query-builder')}>Return to Query Builder</Button>
                    <Button color='primary' className='m-1' startContent={<DownloadIcon />} onPress={downloadCsv}>Download CSV</Button>
                    <Divider className='my-4' />
                    {rows &&
                        <div className='w-[96vw]'>
                            <DataTable value={rows}
                                paginator rows={5}>
                                {columns?.map((column) => (
                                    <Column field={column} header={column} sortable />
                                ),
                                )}
                            </DataTable>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}