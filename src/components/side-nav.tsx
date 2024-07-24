import { Fragment, useState } from 'react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { NavItems } from '@/configs';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SideNav() {
  const navItems = NavItems();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <nav
      className={cn(
        'pr-4',
        isSidebarExpanded ? 'w-[200px]' : 'w-[68px]',
        'border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full bg-accent'
      )}
      role="Main Navigation"
      aria-label="Main Navigation"
    >
      <aside className="flex h-full flex-col w-full break-words px-4 overflow-x-hidden columns-1">
        {/* Top */}
        <div className="mt-4 relative pb-2">
          <div className="flex flex-col space-y-1">
            {navItems.map((item, idx) => {
              if (item.position === 'top') {
                return (
                  <Fragment key={idx}>
                    <div className="space-y-1">
                      <SideNavItem
                        active={item.active}
                        icon={item.icon}
                        isSidebarExpanded={isSidebarExpanded}
                        label={item.name}
                        path={item.href}
                      />
                    </div>
                  </Fragment>
                );
              }
            })}
          </div>
        </div>
      </aside>
      <div className="mt-[calc(calc(90vh)-40px)] relative">
        <button
          className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          title="Toggle Sidebar"
          type="button"
          role='button'
          aria-label={isSidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
          aria-expanded={isSidebarExpanded ? 'true' : 'false'}
          aria-controls="sidebarContent"
          onClick={toggleSidebar}
        >
          {isSidebarExpanded ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      </div>
    </nav>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
}> = ({ label, icon, path, active, isSidebarExpanded }) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link href={path}>
          <a
            className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
              active
                ? 'font-base text-sm bg-neutral-200 shadow-sm text-neutral-700 dark:bg-neutral-800 dark:text-white'
                : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
            }`}
            role="menuitem"
          >
            <div className="relative font-base text-sm py-1.5 px-2 flex flex-row items-center space-x-2 rounded-md duration-100">
              {icon}
              <span>{label}</span>
            </div>
          </a>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                className={`h-full relative flex items-center whitespace-nowrap rounded-md ${
                  active
                    ? 'font-base text-sm bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-white'
                    : 'hover:bg-neutral-200 hover:text-neutral-700 text-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`}
                href={path}
                role="menuitem"
              >
                <div className="relative font-base text-sm p-2 flex flex-row items-center space-x-2 rounded-md duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className="px-3 py-1.5 text-xs"
              side="left"
              sideOffset={10}
            >
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};