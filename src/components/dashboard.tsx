'use client';

import React, { CSSProperties, useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations } from 'next-intl';
import { Endpoints } from '@/axios/apiEndpoints';
import { CriteriaBox } from './query-builder/criteria-box';
import { StatefulQueryBox as QueryBox } from './query-builder/query-box';
import { Input } from 'ui-library';
import { Tabs, Tab } from '@nextui-org/react';

export default function Dashboard() {

  const [criteriaList, setCriteria] = useState<any[]>([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState<any[]>([]);

  const body: CSSProperties = {
    background: '#E6F1FE',
    padding: '20px'
  }

  const criteria: CSSProperties = {
    borderRadius: '8px',
    background: '#FFF',
    overflow: 'hidden',
    clear: 'both',
    margin: '-.5rem',
    padding: '10px',
  }

  const criteriaContainer: CSSProperties = {
    display: 'flex',
    borderRadius: '8px',
    padding: '8px',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch',
    background: '#FAFAFA',
    border: '1px solid #E4E4E7',
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
  });

  const t = useTranslations('common');
  return (
    <>
      <div className="flex py-4" style={{ ...body }}>
        <DndProvider backend={HTML5Backend}>
          <div style={{ ...criteria }}>
            <h1>Available Criteria</h1>
            <Input variant='bordered' id='search' label='Search' />
            <Tabs aria-label='Available Criteria' style={{marginTop: '10px'}}>
              <Tab key='criteria' title='Available Criteria'>
                <div style={{ ...criteriaContainer }}>
                  <div style={{ float: 'left' }}>
                    {criteriaList?.map((criteria) => (
                      <>
                        <CriteriaBox key={criteria.id} showCopyIcon={true} criteria={criteria.conceptName} />
                      </>
                    ))}
                  </div>
                </div>
              </Tab>
              <Tab key='units' title='Units of Measure'>
                <div style={{ ...criteriaContainer }}>
                  <div style={{ float: 'left' }}>
                    {unitsOfMeasure?.map((unit) => (
                      <>
                        <CriteriaBox key={unit.id} showCopyIcon={true} criteria={unit.conceptName} />
                      </>
                    ))}
                  </div>
                </div>
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
