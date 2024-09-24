'use client';

import { useState } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { User } from "ui-library";
import { useLocale } from 'next-intl';
import {useTransition} from 'react';

import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from 'ui-library';

import { ChevronDown, ChevronUp } from 'lucide-react';
export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [selectedOption] = useState(new Set(['english']));
  const [isOpen, setIsOpen] = useState(false);
  const localeOptions = [
    { key: 'en', label: 'English' },
    { key: 'es', label: 'Spanish' }
  ];

  const descriptionsMap: LabelsMapType = {
    english: 'English',
    spanish: 'Spanish',
  };

  // Define a type for the labelsMap object
  type LabelsMapType = {
    [key: string]: string;
  };
  // Define the labelsMap object with the correct type
  const labelsMap: LabelsMapType = {
    english: 'En',
    spanish: 'Es',
  };
  const [isPending, startTransition] = useTransition();
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <NextUINavbar maxWidth="full" className=" rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full" position="sticky">
      <NavbarContent
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  onClick={handleClick}
                  disableAnimation
                  className="w-full p-0"
                  endContent={
                    isOpen ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )
                  }
                >
                  <User
                    name="John Doe"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
              variant="faded" 
              aria-label="Dropdown menu with icons"
              selectionMode="single"
                onAction={(key) => {
                  if (key === 'logout') {
                    router.push('/');
                  } else if (key === 'settings') {
                  } else if (key === 'change_password') {
                    router.push('/password-change');
                  }
                }
              }
              >
                <DropdownItem
                  key="locale"
                  tabIndex={0}
                  startContent={<Image
                    alt="locale logo"
                    src="/language.png"
                  />}
                >
                  {
                    localeOptions.map((language) => {
                      if (language.key !== locale) {
                        return language.label
                      }
                    })
                  }
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  tabIndex={0}
                  startContent={<Image
                    alt="settings logo"
                    src="/settings.png"
                  />
                  
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="change_password"
                  tabIndex={0}
                  startContent={<Image
                    alt="change logo"
                    src="/language.png"
                  />
                  }
                >
                  Change Password
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  tabIndex={0}
                  startContent={<Image
                    alt="logout logo"
                    src="/logout.png"
                  />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};

