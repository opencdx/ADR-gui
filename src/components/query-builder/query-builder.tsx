'use client';

import Loading from '@/components/ui/loading';
import { Suspense, useEffect, useMemo, useState } from 'react';

import { JoinOperation, SavedQuery } from '@/api/adr';
import { useGetQueryableData, useGetUnits, useListQueries, useSaveQuery, useUpdateQuery } from '@/hooks/hooks';
import { QUERY_KEYS } from '@/hooks/query-keys';
import { useQueryStore } from '@/lib/store';
import { errorToast, successToast } from '@/lib/utils';
import { Tab, Tabs } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { ArrowForwardIcon, Button, CloseIcon, Input, Modal, ModalBody, ModalContent, ModalHeader, PreviewIcon, SaveIcon, useDisclosure } from 'ui-library';
import FocusDropdown from '../droppable/focus/focus-dropdown';
import { FormulaDroppable } from '../droppable/formula-droppable';
import { GroupDroppable } from '../droppable/group-droppable';
import { JoinOperationDroppable } from '../droppable/join-operation-droppable';
import OperatorsDropdown from '../droppable/operators/operators-dropdown';
import { CriteriaList } from './criteria-list';
import QueryLibrary from './query-library';
import QueryRender from './query-render';

export default function QueryBuilder() {

  const router = useRouter();
  const { data: criteriaList } = useGetQueryableData();
  const { data: unitsOfMeasure } = useGetUnits();
  const { mutateAsync: saveQuery, data: savedQueryResult } = useSaveQuery();
  const { mutate: updateQuery, data: savedUpdateQueryResult, error: updateError } = useUpdateQuery();
  const { query, updateQueryStore, updateQueryName, isReturn, updateIsReturn, queryText } = useQueryStore();
  const { data: queries } = useListQueries();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryName, setQueryName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [queryPreview, setQueryPreview] = useState('');
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const queryClient = useQueryClient();

  const t = useTranslations('common');

  useEffect(() => {
    if (queries?.data) {
      setIsLoading(false);
    }
  }, [queries]);

  const runQuery = async () => {
    if (query?.id) {
      runUpdateQuery();
    } else {
      runSaveQuery();
    }

    router.push('/results');
  };

  const runSaveQuery = async () => {
    setIsLoading(true);
    const newQuery: SavedQuery = { ...query };
    newQuery.name = queryName;

    saveQuery(newQuery, {
      onSuccess: (response) => {
        updateQueryStore(response.data);
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LIST_QUERIES });
        setIsLoading(false);
      },
      onError: (error) => {
        errorToast(error?.message);
        setIsLoading(false);
      }
    });
  };

  const runUpdateQuery = async () => {
    setIsLoading(true);
    const updatedQuery: SavedQuery = { ...query };
    updatedQuery.name = queryName;

    updateQuery(updatedQuery, {
      onSuccess: (response) => {
        updateQueryStore(response.data);
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LIST_QUERIES });
        setIsLoading(false);
      },
      onError: (error) => {
        errorToast(error?.message);
        setIsLoading(false);
      }
    });
  }

  useMemo(() => {
    if (isReturn) {
      successToast("Welcome back, start building a new query.");
      updateIsReturn(false);
    }
    if (query) {
      setQueryName(query.name!);
    }
  }, []);

  useEffect(() => {
    updateQueryName(queryName);
  }, [queryName]);

  const isDisabled = () => {
    return !query.name;
  };

  return (
    <Suspense fallback={<Loading />}>
      {
        isLoading ? <Loading /> : (
          <>
            <div className='flex py-4 bg-blue-100 p-4 flex-row w-full h-screen overflow-hidden'>
              <DndProvider backend={HTML5Backend}>
                <div className='float-left w-[420px] flex-col flex h-full'>

                  <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-hidden grow mb-4 h-2/3'>
                    <h1 className='text-2xl font-medium mb-6'>Available Criteria</h1>
                    <Input variant='bordered' id='search' label='Search' onValueChange={setSearchTerm} />
                    <Tabs aria-label='Available Criteria' className='mt-4 flex-grow overflow-hidden h-[80px]' fullWidth>
                      <Tab key='criteria' title='Available Criteria' className='h-full overflow-auto'>
                        <CriteriaList criteriaList={criteriaList?.data} unitsList={undefined} filter={searchTerm} />
                      </Tab>
                      <Tab key='units' title='Units of Measure' className='h-full overflow-auto'>
                        <CriteriaList unitsList={unitsOfMeasure?.data} criteriaList={undefined} filter={searchTerm} />
                      </Tab>
                    </Tabs>
                  </div>
                  <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-scroll h-[250px]'>

                    {queries?.data &&
                      <QueryLibrary />
                    }
                  </div>
                </div>
                <div className='rounded-md bg-white clear-both flex flex-col  w-full ml-5 overflow-scroll'>
                  <div className='p-3'>
                    <h1 className='text-2xl font-medium mb-6'>Query Builder</h1>
                    <div className='pb-3 flex items-center'>

                      <GroupDroppable showCopyIcon={true} group={[]} />
                      <JoinOperationDroppable joinOperation={JoinOperation.And} display='And' showCopyIcon={true} />
                      <JoinOperationDroppable joinOperation={JoinOperation.Or} display='Or' showCopyIcon={true} />
                      <FormulaDroppable showCopyIcon={true} />
                      <OperatorsDropdown />
                      <FocusDropdown />
                    </div>
                    <QueryRender />
                  </div>
                  <div className="mt-auto w-full border-t border-gray-300 justify-between flex">
                    <Input label='Add Query Name' value={query.name} onValueChange={setQueryName} variant="bordered" className='max-w-xs p-3' isRequired />
                    <div className='flex my-auto'>
                      <Button className='m-2' color='primary' startContent={<PreviewIcon />} onPress={() => setShowPreview(true)}>Preview Sample Query</Button>
                      <Button className='m-2' color='primary' endContent={<ArrowForwardIcon />} onPress={() => runQuery()} isDisabled={isDisabled()}>Run Query</Button>
                    </div>
                  </div>
                </div>

              </DndProvider>
            </div>
            {showPreview &&
              <div className='bg-[#001731] w-full max-w-max min-w-full rounded-t-2xl p-7 relative'>
                <button 
                  className='absolute top-4 right-4 text-white' 
                  onClick={() => setShowPreview(false)}
                >
                  <CloseIcon/>
                </button>
                <div className='text-white mb-1'>Preview Sample Query:</div>
                <div className='text-white' dangerouslySetInnerHTML={{ __html: queryText.replace(/(And|Or)/g, '<strong>$1</strong>') }} />
              </div>
            }
          </>
        )
      }

    </Suspense>


  );
}
