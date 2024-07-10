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
      name: 'Dashboard',
      href: '/dashboard',
      icon: <User size={20} />,
      active: isNavItemActive(pathname, '/dashboard'),
      position: 'top',
    },
  ];
};
