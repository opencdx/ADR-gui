'use client';

import React from 'react';

import {useLocale, useTranslations} from 'next-intl';

import { CriteriaBox } from './criteria-box';
import { StatefulQueryBox as QueryBox } from './query-box';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CriteriaTypes } from './criteria-types';

export default function DashboardPage() {
  
  const t = useTranslations('common');
  return (
    <>      
      <div className="flex py-4">
        <DndProvider backend={HTML5Backend}>
          <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
            <div style={{ float: 'left' }}>
              <CriteriaBox showCopyIcon={true} criteria={CriteriaTypes.AGE}/>
              <CriteriaBox showCopyIcon={true} criteria={CriteriaTypes.BMI}/>
              <CriteriaBox showCopyIcon={true} criteria={CriteriaTypes.GENDER}/>
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
