'use client';

import { Fragment } from 'react';

import { NavItems } from '@/configs';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Maximize, Minimize } from 'lucide-react';

import TreeComponent from './tree-component';

export default function TreeView() {
  const navItems = NavItems();

  return (
    <div className="pr-4">
      <div
        className={
          'w-[400px] border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full  bg-accent'
        }
      >
        <aside className="flex h-full flex-col w-full break-words px-4   overflow-x-hidden columns-1">
          {/* Top */}
          <div className="mt-4 relative pb-2 ">
            <div className="flex flex-col space-y-1">
              
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
