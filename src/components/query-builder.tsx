'use client';

import React, { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations } from 'next-intl';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from 'ui-library';
import { Tabs, Tab } from '@nextui-org/react';
import { CriteriaList } from './query-builder/criteria-list';
import { useGetQueryableData, useGetUnits, useListQueries, usePostQuery, useSaveQuery, useUpdateQuery } from '@/hooks/hooks';
import { ArrowForwardIcon, PreviewIcon, SaveIcon } from './icons';
import { JoinOperation, SavedQuery } from '@/api/adr';
import { ResultsTable } from './query-builder/results-table';
import { useQueryStore } from '@/lib/store';
import { JoinOperationDroppable } from './droppable/join-operation-droppable';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QueryLibrary from './query-builder/query-library';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/query-keys';
import OperatorsDropdown from './droppable/operators-dropdown';
import QueryRender from './query-builder/query-render';
import { FormulaDroppable } from './droppable/formula-droppable';

export default function QueryBuilder() {

  const { data: criteriaList } = useGetQueryableData();
  const { data: unitsOfMeasure } = useGetUnits();
  const { mutate: postQuery, data: queryResults } = usePostQuery();
  const { mutateAsync: saveQuery, data: savedQueryResult } = useSaveQuery();
  const { mutate: updateQuery, data: savedUpdateQueryResult, error: updateError } = useUpdateQuery();
  const { query, updateQueryStore, updateQueryListStore, resetQueryStore } = useQueryStore();
  const { data: queries } = useListQueries();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryName, setQueryName] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false });
  const [queryPreview, setQueryPreview] = useState('');

  const queryClient = useQueryClient();

  const t = useTranslations('common');

  const runQuery = async () => {
    setQueryPreview('');
    postQuery(query.query!);
  };

  const getPreview = () => {
    setQueryPreview(JSON.stringify(query.query, null, 2))
  };

  const runSaveQuery = async () => {
    const newQuery: SavedQuery = { ...query };
    newQuery.name = queryName;

    saveQuery(newQuery, {
      onSuccess: (response) => {
        toast.success("Query saved", {
          position: 'top-right',
          autoClose: 2000,
        });

        updateQueryStore(response.data);
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LIST_QUERIES });
      },
      onError: (error) => {
        toast.error(error?.message, {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    });
  };

  const runUpdateQuery = async () => {
    const updatedQuery: SavedQuery = { ...query };
    updatedQuery.name = queryName;

    updateQuery(updatedQuery, {
      onSuccess: (response) => {
        toast.success("Query saved", {
          position: 'top-right',
          autoClose: 2000,
        });

        updateQueryStore(response.data);
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LIST_QUERIES });
      },
      onError: (error) => {
        toast.error(error?.message, {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    });
  }

  useEffect(() => {
    if (query) {
      setQueryName(query.name!);
    }
  }, [query]);

  const isDisabled = () => {
    return !queryName;
  };

  return (
    <>
      <div className='flex py-4 bg-blue-100 p-4 flex flex-row overflow-hidden w-full h-screen'>
        <DndProvider backend={HTML5Backend}>
          <div className='float-left w-[420px] flex-col flex'>
            <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-hidden grow mb-4'>
              <h1 className='text-2xl font-medium mb-6'>Available Criteria</h1>
              <Input variant='bordered' id='search' label='Search' onValueChange={setSearchTerm} />
              <Tabs aria-label='Available Criteria' className='mt-4' fullWidth>
                <Tab key='criteria' title='Available Criteria'>
                  <CriteriaList criteriaList={criteriaList?.data} filter={searchTerm} />
                </Tab>
                <Tab key='units' title='Units of Measure'>
                  <CriteriaList criteriaList={unitsOfMeasure?.data} filter={searchTerm} />
                </Tab>
              </Tabs>
            </div>
            <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-scroll h-[250px]'>
              {queries?.data &&
                <QueryLibrary />
              }
            </div>
          </div>
          <div className='rounded-md bg-white clear-both flex flex-col overflow-hidden w-full ml-5'>
            <div className='p-3'>
              <h1 className='text-2xl font-medium mb-6'>Query Builder</h1>
              <div className='pb-3 flex items-center'>
                <JoinOperationDroppable joinOperation={JoinOperation.And} display='Add Grouping' showCopyIcon={true} />
                <JoinOperationDroppable joinOperation={JoinOperation.And} display='And' showCopyIcon={true} />
                <JoinOperationDroppable joinOperation={JoinOperation.Or} display='Or' showCopyIcon={true} />
                <OperatorsDropdown />
              </div>
              <QueryRender />
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='full' scrollBehavior='inside'>
                <ModalContent>
                  <ModalHeader>
                    {queryPreview &&
                      <>Query Preview</>
                    }
                    {queryResults?.data && !queryPreview &&
                      <>Results</>
                    }
                  </ModalHeader>
                  <ModalBody>
                    {queryResults?.data && !queryPreview &&
                      <ResultsTable queryResults={queryResults?.data} />
                    }
                    {queryPreview &&
                      <JsonView data={queryPreview} shouldExpandNode={allExpanded} style={defaultStyles} />
                    }
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
            <div className="mt-auto w-full border-t border-gray-300 justify-between flex">
              <Input label='Add Query Name' value={queryName} onValueChange={setQueryName} variant="bordered" className='max-w-xs p-3' isRequired />
              <div className='my-auto'>
                <Button className='m-1' onClick={resetQueryStore} >New Query</Button>
                <Button className='m-1' endContent={<PreviewIcon />} onClick={getPreview} onPress={onOpen}>Preview Sample Query</Button>
                {!query?.id &&
                  <Button className='m-2' endContent={<SaveIcon />} onClick={runSaveQuery} isDisabled={isDisabled()}>Save Query</Button>
                }
                {query?.id &&
                  <Button className='m-2' endContent={<SaveIcon />} onClick={runUpdateQuery}>Update Query</Button>
                }
                <Button className='m-2' endContent={<ArrowForwardIcon />} onClick={runQuery} onPress={onOpen}>Run Query</Button>
              </div>
            </div>
          </div>
        </DndProvider>
        <ToastContainer />
      </div>
    </>
  );
}
