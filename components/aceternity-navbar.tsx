"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Popover } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
}

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface Dropdown {
  name: string;
  description: string;
  items: DropdownItem[];
}

interface Props {
  navigation: NavItem[];
  dropdowns: Dropdown[];
  cta: NavItem;
  logo: string;
}

export default function AceternityNavbar({
  navigation,
  dropdowns,
  cta,
  logo,
}: Props) {
  // Default to English; update this logic if you add i18n support
  const language: string = "en";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="sr-only">Aceternity</span>
              <img
                className="h-28 w-auto"
                src={logo || "/placeholder.svg"}
                alt="Aceternity Logo"
              />
            </Link>
            <div className="hidden ml-10 space-x-1 lg:block">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              {dropdowns.map((dropdown) => (
                <Popover key={dropdown.name} className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                          ${
                            open
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-500 dark:text-gray-300"
                          }
                          group bg-white dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                        `}
                      >
                        <span>{dropdown.name}</span>
                        <ChevronDownIcon
                          className={`
                            ${
                              open
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-gray-400 dark:text-gray-500"
                            }
                            ml-2 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-gray-300
                            transition-colors duration-200
                          `}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                            {dropdown.items.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`group flex flex-col px-4 py-3 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all duration-300 border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50 ${
                                  language === "ar" ? "text-right" : "text-left"
                                }`}
                              >
                                <div
                                  className={`flex items-center justify-between ${
                                    language === "ar" ? "flex-row-reverse" : ""
                                  }`}
                                >
                                  <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                    {dropdownItem.name}
                                  </span>
                                  <ArrowRightIcon
                                    className={`h-4 w-4 text-gray-400 group-hover:text-purple-500 transform ${
                                      language === "ar"
                                        ? "group-hover:-translate-x-1"
                                        : "group-hover:translate-x-1"
                                    } transition-all duration-300`}
                                  />
                                </div>
                                {dropdownItem.description && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                                    {dropdownItem.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`hidden lg:flex items-center ${
                language === "ar" ? "space-x-reverse" : "space-x-1"
              }`}
            >
              <Link
                href={cta.href}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm py-2 px-4"
              >
                {cta.name}
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                type="button"
                className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-4 pb-6 px-4">
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <Link href="/" className="flex items-center">
                    <span className="sr-only">Aceternity</span>
                    <img
                      className="h-8 w-auto"
                      src={logo || "/placeholder.svg"}
                      alt="Aceternity Logo"
                    />
                  </Link>
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 rounded-md text-base font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {dropdowns.map((dropdown) => (
                    <div key={dropdown.name}>
                      <div className="text-base font-medium text-gray-500 dark:text-gray-400">
                        {dropdown.name}
                      </div>
                      <div className="mt-2 space-y-1">
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between text-lg font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400 transition-colors duration-300 py-3 px-2 rounded-xl hover:bg-gray-50/80 dark:hover:bg-gray-800/50 ${
                              language === "ar" ? "flex-row-reverse" : ""
                            }`}
                          >
                            <span>{item.name}</span>
                            <ArrowRightIcon
                              className={`h-4 w-4 opacity-50 ${
                                language === "ar" ? "ml-0 mr-2" : "mr-0 ml-2"
                              }`}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href={cta.href}
                    className="block w-full bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-md text-center py-2"
                  >
                    {cta.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
