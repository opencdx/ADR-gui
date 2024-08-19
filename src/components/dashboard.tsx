'use client';

import React, { CSSProperties, useEffect, useMemo, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations } from 'next-intl';
import { Endpoints } from '@/axios/apiEndpoints';
import { StatefulQueryBox as QueryBox } from './query-builder/query-box';
import { Input } from 'ui-library';
import { Tabs, Tab } from '@nextui-org/react';
import { CriteriaList } from './query-builder/criteria-list';

export default function Dashboard() {

  const [criteriaList, setCriteria] = useState<any[]>([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCriteria = async () => {
      Endpoints.getCriteria.then((response) => {
        setCriteria(response.data);
      });
    };

    const getUnits = async () => {
      Endpoints.getUnits.then((response) => {
        setUnitsOfMeasure(response.data);
      });
    };

    getCriteria();
    getUnits();
  }), [];

  const t = useTranslations('common');
  return (
    <>
      <div className='flex py-4 bg-blue-100 p-4 flex flex-row overflow-hidden w-full'>
        <DndProvider backend={HTML5Backend}>
          <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-hidden float-left w-[420px]'>
            <h1 className='text-2xl font-medium mb-6'>Available Criteria</h1>
            <Input variant='bordered' id='search' label='Search' onValueChange={setSearchTerm} />
            <Tabs aria-label='Available Criteria' className='mt-4' fullWidth>
              <Tab key='criteria' title='Available Criteria'>
                <CriteriaList criteriaList={criteriaList} filter={searchTerm} />
              </Tab>
              <Tab key='units' title='Units of Measure'>
                <CriteriaList criteriaList={unitsOfMeasure} filter={searchTerm} />
              </Tab>
            </Tabs>
          </div>
          <div className='rounded-md bg-white clear-both p-3 flex flex-col overflow-hidden w-full ml-5'>
            <h1 className='text-2xl font-medium mb-6'>Query Builder</h1>
            <QueryBox />
          </div>
        </DndProvider>
      </div>
    </>
  );
}
