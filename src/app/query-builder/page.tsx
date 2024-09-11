import { Navbar } from '@/components/navbar';
import QueryBuilder from '@/components/query-builder/query-builder';

export default function QueryBuilderPage() {
  return (
    <div className='h-full'>
      <div className="w-full flex flex-col justify-center overflow-auto  ">
      <Navbar />
        <div className="w-full">{<QueryBuilder />}</div>
      </div>
    </div>
  );

}
