'use client';

import React, { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTranslations} from 'next-intl';
import { Endpoints } from '@/axios/apiEndpoints';
import { CriteriaBox } from './query-builder/criteria-box';
import { StatefulQueryBox as QueryBox  } from './query-builder/query-box';

export const cities = [
  { key: 'sydney', label: 'Sydney' },
  { key: 'sanfrancisco', label: 'San Francisco' },
  { key: 'london', label: 'London' },
];

export default function Dashboard() {

  const [criteriaList, setCriteria] = useState<any[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      Endpoints.query.then((response) => {
        setCriteria(response.data);
      });
    };

    fetchQueries();
  });
  
  const t = useTranslations('common');
  return (
    <>
      <div className="flex py-4">
        <DndProvider backend={HTML5Backend}>
          <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
            <div style={{ float: 'left' }}>
              {criteriaList?.map((criteria) => (
                <>
                <CriteriaBox showCopyIcon={true} criteria={criteria.conceptName}/>
                </>
              ))}
            </div>
          </div>
          <div style={{ float: 'left', marginLeft: '1rem' }}>
            <QueryBox/>
          </div>
        </DndProvider>
      </div>
    </>
  );
}
