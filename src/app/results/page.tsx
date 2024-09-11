'use client';

import { Navbar } from '@/components/navbar';
import { ResultsTable } from '@/components/query-builder/results-table';

export default function ResultsPage() {

  return (
    <div className='h-full'>
      <div className="w-full flex flex-col justify-center overflow-auto  ">
        <Navbar />
        <div className="w-screen">
          <ResultsTable />
        </div>
      </div>
    </div>
  );

}
