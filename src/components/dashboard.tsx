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

  const body: CSSProperties = {
    background: '#E6F1FE',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  }

  const criteria: CSSProperties = {
    borderRadius: '8px',
    background: '#FFF',
    clear: 'both',
    margin: '-.5rem',
    padding: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  const title: CSSProperties = {
    color: '#001124',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '500',
    marginBottom: '24px',
  }

  const tab: CSSProperties = {
    marginTop: '16px',
  }

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
      <div className="flex py-4" style={{ ...body }}>
        <DndProvider backend={HTML5Backend}>
          <div style={{ ...criteria }}>
            <h1 style={{ ...title }}>Available Criteria</h1>
            <Input variant='bordered' id='search' label='Search' onValueChange={setSearchTerm}/>
            <Tabs aria-label='Available Criteria' style={{ ...tab }} fullWidth>
              <Tab key='criteria' title='Available Criteria'>
                <CriteriaList criteriaList={criteriaList} filter={searchTerm} />
              </Tab>
              <Tab key='units' title='Units of Measure'>
                <CriteriaList criteriaList={unitsOfMeasure} filter={searchTerm} />
              </Tab>
            </Tabs>
          </div>
          <div style={{ float: 'left', marginLeft: '1rem' }}>
            <QueryBox />
          </div>
        </DndProvider>
      </div>
    </>
  );
}
