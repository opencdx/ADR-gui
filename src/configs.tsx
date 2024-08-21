"use client"
import { usePathname } from 'next/navigation';

import { User } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Query Builder',
      href: '/query-builder',
      icon: <User size={20} />,
      active: isNavItemActive(pathname, '/query-builder'),
      position: 'top',
    },
  ];
};
