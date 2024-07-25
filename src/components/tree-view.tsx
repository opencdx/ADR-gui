'use client';

import { Fragment } from 'react';

import { NavItems } from '@/configs';
import { Accordion, AccordionItem } from 'ui-library';
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
              {navItems.map((item, idx) => {
                if (item.position === 'top') {
                  return (
                    <Fragment key={idx}>
                      <div>
                        <Accordion
                          key={idx}
                          className="min-h-[100px]"
                          defaultExpandedKeys={['1']}
                          isCompact={true}
                          selectionBehavior="toggle"
                          variant="splitted"
                        >
                          <AccordionItem
                            key="1"
                            aria-label="Accordion 1"
                            id="section1"
                            indicator={({ isOpen }) =>
                              isOpen ? (
                                <Maximize aria-label="maximize" />
                              ) : (
                                <Minimize aria-label="minimize" />
                              )
                            }
                            title="Section 1"
                          >
                            <TreeComponent />
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </Fragment>
                  );
                }
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
