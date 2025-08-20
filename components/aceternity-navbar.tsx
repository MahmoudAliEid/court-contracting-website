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
  HomeIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  PhoneIcon,
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
            
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/966566397317?text=أريد التواصل معكم وطلب خدمة من شركة كورت +966 56 639 7317"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 hidden sm:flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
              </svg>
              <span className="hidden md:inline">WhatsApp</span>
            </a>
            <div className="hidden ml-10 space-x-1 lg:block">
              {navigation.map((item) => {
                // Map navigation items to their corresponding icons
                const getIcon = (name: string) => {
                  const iconClass = "w-4 h-4 mr-2";
                  switch (name.toLowerCase()) {
                    case 'home':
                    case 'الرئيسية':
                      return <HomeIcon className={iconClass} />;
                    case 'about us':
                    case 'about':
                    case 'من نحن':
                      return <InformationCircleIcon className={iconClass} />;
                    case 'services':
                    case 'خدماتنا':
                      return <WrenchScrewdriverIcon className={iconClass} />;
                    case 'projects':
                    case 'مشاريعنا':
                      return <BriefcaseIcon className={iconClass} />;
                    case 'contact':
                    case 'تواصل معنا':
                      return <PhoneIcon className={iconClass} />;
                    default:
                      return null;
                  }
                };

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md transition-colors duration-200"
                  >
                    {getIcon(item.name)}
                    {item.name}
                  </Link>
                );
              })}
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
          <div className="flex items-center space-x-2">
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
            
            {/* Mobile WhatsApp Icon */}
            <a
              href="https://wa.me/966566397317?text=أريد التواصل معكم وطلب خدمة من شركة كورت +966 56 639 7317"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
              </svg>
            </a>
            
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
                  
                  <div className="flex items-center space-x-2">
                    {/* WhatsApp Contact - Mobile Header */}
                    <a
                      href="https://wa.me/966566397317?text=أريد التواصل معكم وطلب خدمة من شركة كورت +966 56 639 7317"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                      </svg>
                    </a>
                    
                    <button
                      type="button"
                      className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6 space-y-1">
                  {navigation.map((item) => {
                    // Map navigation items to their corresponding icons for mobile
                    const getIcon = (name: string) => {
                      const iconClass = "w-5 h-5 mr-3";
                      switch (name.toLowerCase()) {
                        case 'home':
                        case 'الرئيسية':
                          return <HomeIcon className={iconClass} />;
                        case 'about us':
                        case 'about':
                        case 'من نحن':
                          return <InformationCircleIcon className={iconClass} />;
                        case 'services':
                        case 'خدماتنا':
                          return <WrenchScrewdriverIcon className={iconClass} />;
                        case 'projects':
                        case 'مشاريعنا':
                          return <BriefcaseIcon className={iconClass} />;
                        case 'contact':
                        case 'تواصل معنا':
                          return <PhoneIcon className={iconClass} />;
                        default:
                          return null;
                      }
                    };

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-2 rounded-md text-base font-medium text-gray-800 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400 transition-colors duration-200"
                      >
                        {getIcon(item.name)}
                        {item.name}
                      </Link>
                    );
                  })}
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
                    className="block w-full bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-md text-center py-2 mb-3"
                  >
                    {cta.name}
                  </Link>
                  
                  {/* WhatsApp Contact - Mobile */}
                  <a
                    href="https://wa.me/966566397317?text=أريد التواصل معكم وطلب خدمة من شركة كورت +966 56 639 7317"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-md py-2 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
