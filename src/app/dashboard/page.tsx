'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations} from 'next-intl';

import { CriteriaBox } from './criteria-box';
import { StatefulQueryBox as QueryBox } from './query-box';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Endpoints } from '@/axios/apiEndpoints';

export default function DashboardPage() {
  
  const t = useTranslations('common');
  const [criteriaList, setCriteria] = useState<any[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      Endpoints.query.then((response) => {
        setCriteria(response.data);
      });
    };

    fetchQueries();
  });

  return (
    <>      
      <div className="flex py-4">
        <DndProvider backend={HTML5Backend}>
          <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
            <div style={{ float: 'left' }}>
              {criteriaList?.map((criteria) => (
                <>
                <CriteriaBox showCopyIcon={true} criteria={criteria.description}/>
                {criteria.children.map((child) => (
                  <CriteriaBox showCopyIcon={true} criteria={child.description} isChild={true}/>
                ))}
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
