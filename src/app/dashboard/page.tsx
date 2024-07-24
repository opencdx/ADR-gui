import Dashboard from "@/components/dashboard";
import { Navbar } from '@/components/navbar';
import TreeView from '@/components/tree-view';
import { Divider } from '@nextui-org/react';

export default function DashboardPage() {
  return (
    <>
    <Navbar />
      <Divider />
      <div className="flex">
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
            <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
              <div className="w-full md:max-w-6xl">{<Dashboard />}</div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
  
}
