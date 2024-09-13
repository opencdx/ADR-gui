import { FC } from 'react'
import { usePapaParse } from 'react-papaparse';
import { Button, Divider } from 'ui-library';
import { useQueryStore } from '@/lib/store';
import { usePostQuery } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';
import { DownloadIcon, ReturnIcon } from '../icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useMemo, useState } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
} from 'mantine-react-table';


export const ResultsTable: FC = ({ }) => {

    type Person = {
        participantId: string;
        reported: string;
        ageReported: string;
        age: string;
        bodyWeightReported: string;
        bodyWeight: string;
        bodyHeightReported: string;
        bodyHeight: string;
        manReported: string;
        man: string;
        ageAtDiagnosisReported: string;
        ageAtDiagnosis: string;
        womanReported: string;
        woman: string;
        bodyMassIndexReported: string;
        bodyMassIndex: string;
        bodyMassIndexLessThan20Reported: string;
        bodyMassIndexLessThan20: string;
        acuteMaculopapularEruptionOfSkinDisorderReported: string;
        acuteMaculopapularEruptionOfSkinDisorder: string;
        acutePurpuricEruptionOfSkinDisorderReported: string;
        acutePurpuricEruptionOfSkinDisorder: string;
        bodyMassIndex2529OverweightReported: string;
        bodyMassIndex2529Overweight: string;
        bodyMassIndex30ObesityReported: string;
        bodyMassIndex30Obesity: string;
        acuteExudativeSkinEruptionDisorderReported: string;
        acuteExudativeSkinEruptionDisorder: string;

    };

    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'Participant ID',
                header: 'Participant ID',
            },

            {
                accessorKey: 'Reported',
                header: 'Reported',
            },

            {
                accessorKey: 'Age Reported',
                header: 'Age Reported',
            },

            {
                accessorKey: 'Age',
                header: 'Age',
            },

            {
                accessorKey: 'Body weight Reported',
                header: 'Body Weight Reported',
            },

            {
                accessorKey: 'Body Weight',
                header: 'Body Weight',
            },

            {
                accessorKey: 'Body Height Reported',
                header: 'Body Height Reported',
            },

            {
                accessorKey: 'Body Height',
                header: 'Body Height',
            },

            {
                accessorKey: 'Man Reported',
                header: 'Man Reported',
            },

            {
                accessorKey: 'Man',
                header: 'Man',
            },

            {
                accessorKey: 'Age At Diagnosis Reported',
                header: 'Age At Diagnosis Reported',
            },

            {
                accessorKey: 'Age At Diagnosis',
                header: 'Age At Diagnosis',
            },

            {
                accessorKey: 'Woman Reported',
                header: 'Woman Reported',
            },

            {
                accessorKey: 'Woman',
                header: 'Woman',
            },

            {
                accessorKey: 'Body Mass Index Reported',
                header: 'Body Mass Index Reported',
            },

            {
                accessorKey: 'Body Mass Index',
                header: 'Body Mass Index',
            },

            {
                accessorKey: 'Body Mass Index Less Than 20 Reported',
                header: 'Body Mass Index Less Than 20 Reported',
            },

            {
                accessorKey: 'Body Mass Index Less Than 20',
                header: 'Body Mass Index Less Than 20',
            },

            {
                accessorKey: 'Acute Maculopapular Eruption Of Skin Disorder Reported',
                header: 'Acute Maculopapular Eruption Of Skin Disorder Reported',
            },

            {
                accessorKey: 'Acute Maculopapular Eruption Of Skin Disorder',
                header: 'Acute Maculopapular Eruption Of Skin Disorder',
            },

            {
                accessorKey: 'Acute Purpuric Eruption Of Skin Disorder Reported',
                header: 'Acute Purpuric Eruption Of Skin Disorder Reported',
            },

            {
                accessorKey: 'Acute Purpuric Eruption Of Skin Disorder',
                header: 'Acute Purpuric Eruption Of Skin Disorder',
            },

            {
                accessorKey: 'Body Mass Index 25-29 Overweight Reported',
                header: 'Body Mass Index 25-29 Overweight Reported',
            },

            {
                accessorKey: 'Body Mass Index 25-29 Overweight',
                header: 'Body Mass Index 25-29 Overweight',
            },

            {
                accessorKey: 'Body Mass Index 30 Obesity Reported',
                header: 'Body Mass Index 30 Obesity Reported',
            },

            {
                accessorKey: 'Body Mass Index 30 Obesity',
                header: 'Body Mass Index 30 Obesity',
            },

            {
                accessorKey: 'Acute Exudative Skin Eruption Disorder Reported',
                header: 'Acute Exudative Skin Eruption Disorder Reported',
            },

            {
                accessorKey: 'Acute Exudative Skin Eruption Disorder',
                header: 'Acute Exudative Skin Eruption Disorder',
            },
        ],
        [],
    );


    const router = useRouter();

    const { readString } = usePapaParse();

    const { mutate: postQuery, data: queryResults } = usePostQuery();
    const { query } = useQueryStore();

    const [data, setData] = useState<Person[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);


    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            if (queryResults?.data) {
                readString(queryResults.data.join("\n"), {
                    worker: true,
                    header: true,
                    complete: (results) => {
                        setData(results.data as Person[]);
                        setRowCount(results.data.length);
                    },
                });
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        fetchData();
    }, [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
        queryResults,
    ]);

    const table = useMantineReactTable({
        columns,
        data,
        enableRowSelection: true,
        enableGrouping: true,
        getRowId: (row) => row.participantId,
        initialState: { showColumnFilters: false },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        rowCount,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
        mantineToolbarAlertBannerProps: isError
            ? { color: 'red', children: 'Error loading data' }
            : undefined,
    });


    const fetchData = useMemo(() => {
        if (query.query) {
            postQuery(query.query, {
                onSuccess: () => {
                    toast.success('Query ready for review!', {
                        position: 'top-right',
                        autoClose: 2000,
                    });
                    setIsError(false);
                },
                onError: (error) => {
                    toast.error(error?.message, {
                        position: 'top-right',
                        autoClose: 2000,
                    });
                    setIsError(true);
                }
            });
        }
    }, []);
    const convertToCsv = (objArray: string[]): string =>
        objArray.join('\r\n') + '\r\n';

    const downloadCsv = () => {
        if (!queryResults?.data) return;

        const csvBlob = new Blob([convertToCsv(queryResults.data)], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);

        const link = document.createElement('a');
        link.href = csvUrl;
        link.download = `${query.name}.csv`;
        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(csvUrl);
    };

    return (
        <div className='flex bg-blue-100 p-4 w-screen h-full'>
            <div className='rounded-md bg-white p-4 w-full'>
                <h2 className='text-xl mb-4'>{query.name} Results</h2>
                <ToastContainer />
                <div className='flex mb-4'>
                    <Button
                        color='primary'
                        variant='bordered'
                        className='mr-2'
                        startContent={<ReturnIcon />}
                        onPress={() => router.push('/query-builder')}
                    >
                        Return to Query Builder
                    </Button>
                    <Button
                        color='primary'
                        startContent={<DownloadIcon />}
                        onPress={downloadCsv}
                        isDisabled={isError}
                    >
                        Download CSV
                    </Button>
                </div>
                <Divider className='mb-4' />
                <div className='h-[calc(100vh-200px)] overflow-auto'>
                    <MantineReactTable table={table} />
                </div>
            </div>
        </div>
    )
}