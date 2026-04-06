import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "@inertiajs/react";
import { FiBarChart2, FiCalendar } from 'react-icons/fi'; // Import de l'icône BarChart2
import { BiCheckCircle, BiArchive, BiUser, BiCog, BiUserPlus, BiSolidUserDetail } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineUndo, AiOutlineFile, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineBank, } from "react-icons/ai";
import { FiUsers, FiLayers, FiBriefcase, FiTool, FiFileText, FiArchive, FiUser, FiLogOut } from 'react-icons/fi'; // Import des icônes nécessaires
import { FaRegObjectUngroup } from "react-icons/fa";
export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="sticky top-0 z-50 border-b border-emerald-100 dark:border-emerald-900 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 shadow-md dark:shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/" style={{ width: 55 }}>
                  <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink
                  href={route("dashboard")}
                  active={route().current("dashboard")}
                >
                  <FiBarChart2 className="text-gray-600 dark:text-gray-300 mr-2" />
                  {t('nav.dashboard')}
                </NavLink>

                {user.role === "admin" ? (
                  <>
                    <NavLink
                      href={route("user.index")}
                      active={route().current("user.index")}
                    >
                      <FiUsers className="inline-block align-middle mr-1" />
                      {t('nav.users')}
                    </NavLink>

                    <NavLink
                      href={route("service.index")}
                      active={route().current("service.index")}
                    >
                      <FiLayers className="inline-block align-middle mr-1" />
                      {t('nav.services')}
                    </NavLink>

                    <NavLink
                      href={route("project.index")}
                      active={route().current("project.index")}
                    >
                      <FiCalendar className="inline-block align-middle mr-1" />
                      {t('nav.projects')}
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      href={route("entreprise.index")}
                      active={route().current("entreprise.index")}
                    >
                      <AiOutlineBank className="inline-block align-middle mr-1" />
                      {t('nav.enterprises')}
                    </NavLink>

                    <NavLink
                      href={route("attestation.myAttestations")}
                      active={route().current("attestation.myAttestations")}
                    >
                      <BiArchive className="inline-block align-middle mr-1" />
                      {t('nav.myAttestations')}
                    </NavLink>

                    <NavLink
                      href={route("attestation.myAttestationsArchivees")}
                      active={route().current(
                        "attestation.myAttestationsArchivees"
                      )}
                    >
                      <FiArchive className="inline-block align-middle mr-1" />
                      {t('nav.archivedAttestations')}
                    </NavLink>
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="pr-4 border-r border-gray-200 dark:border-gray-700">
                <LanguageSwitcher />
              </div>
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                      >
                        <FiUser className="h-5 w-5 mr-2" />
                        {user.name}
                        <svg
                          className="ms-2 -me-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}
                      style={{ display: "flex", justifyContent: "start", alignItems: "center" }}
                    >

                      <BiSolidUserDetail className="h-4 w-4 mr-2" />
                      {t('nav.profile')}
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      style={{ display: "flex", justifyContent: "start", alignItems: "center" }}
                    >
                      <FiLogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              {t('nav.dashboard')}
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                {user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.edit")} >
                {t('nav.profile')}
              </ResponsiveNavLink>
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                {t('nav.logout')}
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
