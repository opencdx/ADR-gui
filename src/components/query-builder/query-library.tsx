import { useDeleteQuery, useListQueries } from '@/hooks/hooks';
import { DeleteIcon, EditIcon } from '../icons';
import { Button } from 'ui-library';
import { useQueryStore } from '@/lib/store';
import { useMemo } from 'react';

export default function QueryLibrary() {

    const { queryList, updateQueryStore, updateQueryListStore } = useQueryStore();
    const { mutate: deleteQuery, error } = useDeleteQuery();
    const { data: queries } = useListQueries();

    const getQueryList = useMemo(() => {
        if (queries) {
            updateQueryListStore(queries.data);
        }
    }, []);

    const runDeleteQuery = async (index: number) => {
        deleteQuery(index);
        useListQueries();
    };

    const loadQuery = async (id: number) => {
        updateQueryStore(queryList.find(element => element.id === id)!);
    };

    return (
        <>
            <h1>Query Library</h1>
            {queryList.map((query) => {
                return (
                    <div className="mt-auto w-full justify-between flex">
                        <p className='max-w-xs p-3'>{query.name}</p>
                        <div className='my-auto'>
                            <div className='float-right'>
                                <Button endContent={<DeleteIcon />} isIconOnly className='text-blue-500 bg-transparen'
                                    onClick={() => runDeleteQuery(query.id!)} />
                            </div>
                            <div className='float-right'>
                                <Button endContent={<EditIcon />} isIconOnly className='text-blue-500 bg-transparen'
                                    onClick={() => loadQuery(query.id!)} />
                            </div>
                        </div>
                    </div>

                )
            },)

            }
        </>
    )
}