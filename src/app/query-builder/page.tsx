import { Navbar } from '@/components/navbar';
import QueryBuilder from "@/components/query-builder";
import { Divider } from '@nextui-org/react';

export default function QueryBuilderPage() {
  return (
    <>
    <Navbar />
      <Divider />
      <div className="flex">
        <div className="w-full overflow-x-auto">
          <div className="h-full overflow-auto ">
            <div className="w-full flex justify-center overflow-auto h-full ">
              <div className="w-full">{<QueryBuilder />}</div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
  
}
