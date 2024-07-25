'use client';

import { useState } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import { User } from "@nextui-org/react";
import { useLocale } from 'next-intl';
import {useTransition} from 'react';

import {
  NavbarBrand,
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
} from '@nextui-org/react';

import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import {Locale} from '@/config';
import {setUserLocale} from '@/services/locale';
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
  function handleLocaleChange(key: string) {
    // If the locale is the same as the current locale, return.
    if (key === locale) return;
    const locales = key as Locale;
    startTransition(() => {
      setUserLocale(locales);
    });
  }
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <NextUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
            <Image
              alt="nextui logo"
              height={40}
              radius='none'
              src="/HelloWorld.png"
              width={100}
              
            />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  onClick={handleClick}
                  disableAnimation
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
                    window.location.href = "/";
                  } else if (key === 'settings') {
                  } else if (key === 'locale') {
                    localeOptions.map((language) => {
                      if (language.key !== locale) {
                        handleLocaleChange(language.key)

                      }
                    }
                    )
                  }
                }
              }
              >
                <DropdownItem
                  key="locale"
                  tabIndex={0}
                  startContent={<Image
                    alt="nextui logo"
                    height={20}
                    src="/language.png"
                    width={20}
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
                    alt="nextui logo"
                    height={20}
                    src="/settings.png"
                    width={20}
                  />
                  }
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  tabIndex={0}
                  startContent={<Image
                    alt="nextui logo"
                    height={20}
                    src="/logout.png"
                    width={20}
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
