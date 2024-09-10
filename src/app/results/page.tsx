'use client';

import { Navbar } from '@/components/navbar';
import { ResultsTable } from '@/components/query-builder/results-table';
import { usePostQuery } from '@/hooks/hooks';
import { useQueryStore } from '@/lib/store';
import { useMemo } from 'react';

export default function ResultsPage() {

  const { mutate: postQuery, data: queryResults } = usePostQuery();
  const { query } = useQueryStore();

  const fetchData = useMemo(() => {
    postQuery(query.query!);
  }, []);

  return (
    <div className='h-full'>
      <div className="w-full flex flex-col justify-center overflow-auto  ">
        <Navbar />
        <div className="w-full">
          {queryResults?.data &&
            <ResultsTable />
          }
        </div>
      </div>
    </div>
  );

}
