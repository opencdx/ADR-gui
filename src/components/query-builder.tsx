'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations } from 'next-intl';
import { StatefulQueryBox as QueryBox } from './query-builder/query-drop-area';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from 'ui-library';
import { Tabs, Tab } from '@nextui-org/react';
import { CriteriaList } from './query-builder/criteria-list';
import { useGetQueryableData, useGetUnits, useListQueries, usePostQuery, useSaveQuery, useUpdateQuery } from '@/hooks/hooks';
import { ArrowForwardIcon, PreviewIcon, SaveIcon } from './icons';
import { JoinOperation } from '@/api/adr';
import { ResultsTable } from './query-builder/results-table';
import { useQueryStore } from '@/lib/store';
import { JoinOperationBox } from './droppable/join-operation-box';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QueryLibrary from './query-builder/query-library';

export default function QueryBuilder() {

  const { data: criteriaList } = useGetQueryableData();
  const { data: unitsOfMeasure } = useGetUnits();
  const { mutate: postQuery, data: queryResults } = usePostQuery();
  const { mutate: saveQuery, data: savedQueryResult, error: saveError } = useSaveQuery();
  const { mutate: updateQuery, data: savedUpdateQueryResult, error: updateError } = useUpdateQuery();
  const { query, updateQueryStore, updateQueryListStore } = useQueryStore();
  const { data: queries } = useListQueries();
  const [searchTerm, setSearchTerm] = useState('');
  const [queryName, setQueryName] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false });
  const [queryPreview, setQueryPreview] = useState('');

  const t = useTranslations('common');

  const runQuery = async () => {
    setQueryPreview('');
    postQuery(query.query!);
  };

  const getPreview = () => {
    setQueryPreview(JSON.stringify(query.query, null, 2))
  };

  const runSaveQuery = async () => {
    query.name = queryName;
    await saveQuery(query);
    if (saveError) {
      toast.error(saveError.message, {
        position: 'top-right',
        autoClose: 2000,
      });
    } else if (savedQueryResult) {
      toast.success("Query saved", {
        position: 'top-right',
        autoClose: 2000,
      });
      updateQueryStore(savedQueryResult);

      if (queries?.data) {
        updateQueryListStore(queries?.data);
      }
    }
  };

  const runUpdateQuery = async () => {
    query.name = queryName;
    updateQuery(query);
    updateQueryStore(savedUpdateQueryResult?.data!);
    if (queries?.data) {
      updateQueryListStore(queries?.data);
    }
  }

  useEffect(() => {
    setQueryName(query.name!);
  }, [query]);

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
              <div className='pb-3'>
                <JoinOperationBox joinOperation={JoinOperation.And} display='Add Grouping' showCopyIcon={true} />
                <JoinOperationBox joinOperation={JoinOperation.And} display='And' showCopyIcon={true} />
                <JoinOperationBox joinOperation={JoinOperation.Or} display='Or' showCopyIcon={true} />
              </div>
              <QueryBox />
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
              <Input label='Add Query Name' value={queryName} onValueChange={setQueryName} variant="bordered" className='max-w-xs p-3' />
              <div className='my-auto'>
                <Button className='m-1' endContent={<PreviewIcon />} onClick={getPreview} onPress={onOpen}>Preview Sample Query</Button>
                {!query.id &&
                  <Button className='m-2' endContent={<SaveIcon />} onClick={runSaveQuery}>Save Query</Button>
                }
                {query.id &&
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
