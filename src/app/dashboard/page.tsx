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
          <div className="h-full overflow-auto ">
            <div className="w-full flex justify-center overflow-auto h-full ">
              <div className="w-full md:max-w-7xl">{<Dashboard />}</div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
  
}
