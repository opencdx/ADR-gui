'use client';

import React, { useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations } from 'next-intl';
import { StatefulQueryBox as QueryBox } from './query-builder/query-drop-area';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from 'ui-library';
import { Tabs, Tab } from '@nextui-org/react';
import { CriteriaList } from './query-builder/criteria-list';
import { useGetQueryableData, useGetUnits, useListQueries, usePostQuery } from '@/hooks/hooks';
import { ArrowForwardIcon, PreviewIcon } from './icons';
import { ADRQuery, JoinOperation, UnitOutput } from '@/api/adr';
import { ResultsTable } from './query-builder/results-table';
import { useQueryStore } from '@/lib/store';
import { JoinOperationBox } from './droppable/join-operation-box';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export default function QueryBuilder() {

  const { data: criteriaList } = useGetQueryableData();
  const { data: unitsOfMeasure } = useGetUnits();
  const { data: queries } = useListQueries();
  const { mutate: postQuery, data: queryResults } = usePostQuery();
  const { query } = useQueryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure({ defaultOpen: false });
  const [queryPreview, setQueryPreview] = useState('');

  const t = useTranslations('common');

  const getQuery = () => {
    const queries: ADRQuery = {};
    queries.unitOutput = UnitOutput.Imperial;
    queries.queries = query.query?.queries;
    return queries;
  }

  const runQuery = async () => {
    setQueryPreview('');
    postQuery(getQuery());
  };

  const getPreview = () => {
    console.log(JSON.stringify(getQuery(), null, '\t'));
    setQueryPreview(JSON.stringify(getQuery(), null, 2))
  };

  return (
    <>
      <div className='flex py-4 bg-blue-100 p-4 flex flex-row overflow-hidden w-full'>
        <DndProvider backend={HTML5Backend}>
          <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-hidden float-left w-[420px]'>
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
                      <JsonView data={queryPreview} shouldExpandNode={allExpanded} style={defaultStyles}/>
                    }
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>
            <div className="mt-auto w-full border-t border-gray-300 justify-between flex">
              <Input label='Add Query Name' variant="bordered" className='max-w-xs p-3' />
              <div className='my-auto'>
                <Button className='m-1' endContent={<PreviewIcon />} onClick={getPreview} onPress={onOpen}>Preview Sample Query</Button>
                <Button className='m-2' endContent={<ArrowForwardIcon />} onClick={runQuery} onPress={onOpen}>Continue</Button>
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
}
