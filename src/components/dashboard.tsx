'use client';

import React, { CSSProperties, useEffect, useMemo, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations } from 'next-intl';
import { StatefulQueryBox as QueryBox } from './query-builder/query-builder';
import { Button, Input } from 'ui-library';
import { Tabs, Tab } from '@nextui-org/react';
import { CriteriaList } from './query-builder/criteria-list';
import { useGetQueryableData, useGetUnits, useListQueries, usePostQuery } from '@/hooks/hooks';
import { ArrowForwardIcon, PreviewIcon } from './icons';
import { ADRQuery, Query, UnitOutput } from '@/api/adr';
import { ResultsTable } from './query-builder/results-table';
import { useQueryStore } from '@/lib/store';
import { OperatorBox } from './query-builder/operator-box';

export default function Dashboard() {

  const { data: criteriaList } = useGetQueryableData();
  const { data: unitsOfMeasure } = useGetUnits();
  const { data: queries } = useListQueries();
  const { mutate: postQuery, data: queryResults } = usePostQuery();
  const { query } = useQueryStore();

  const [searchTerm, setSearchTerm] = useState('');

  const t = useTranslations('common');

  const runQuery = async () => {
    const queries: ADRQuery = {};
    queries.unitOutput = UnitOutput.Imperial;
    queries.queries = query.query?.queries;
    postQuery(queries);
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
                <OperatorBox operator='Add Grouping' showCopyIcon={true}/>
                <OperatorBox operator='And' showCopyIcon={true}/>
                <OperatorBox operator='Or' showCopyIcon={true}/>
              </div>
              <QueryBox />
              {queryResults?.data && 
                <ResultsTable queryResults={queryResults?.data }/>
              }
            </div>
            <div className="mt-auto w-full border-t border-gray-300 justify-between flex">
              <Input label='Add Query Name' variant="bordered" className='max-w-xs p-3' />
              <div className='my-auto'>
                <Button className='m-1' endContent={<PreviewIcon />}>Preview Sample Query</Button>
                <Button className='m-2' endContent={<ArrowForwardIcon />} onClick={runQuery}>Continue</Button>
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
}
