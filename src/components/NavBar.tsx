"use client";
import Link from 'next/link'
import clsx from 'clsx'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";

const projects = [
  { name: "TicTacToe", href: "/projects/tictactoe" },
  { name: "Dogs", href: "/projects/TicTacToe" },
  { name: "Cats ", href: "/projects/TicTacToe" },
  { name: "Crap", href: "/projects/TicTacToe" },
]

function NavItem({ href, children }: { href: string, children: React.ReactNode }) {
  let isActive = usePathname() === href

  return (
    <Link
      href={href}
      className={clsx(
        'relative block px-3 py-2',
        isActive
          ? 'text-teal-400'
          : 'hover:text-teal-400'
      )}
    >
      {children}
      {isActive && (
        <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0" />
      )}
    </Link>
  )
}

type DesktopNavProps = {
  className?: string
}

function DesktopNavigation(props: DesktopNavProps) {
  return (
    <>
      <header className={`pt-6 grid justify-center`}>
        <nav className="flex rounded-full bg-zinc-800/90 px-3 text-sm leading-6 font-medium text-zinc-200 shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur" aria-label='Global'>
          <NavItem href='/'>Home</NavItem>
          <div className="flex items-center gap-x-1">
            <Popover className={"relative"}>
              <Popover.Button className={"flex items-center gap-x-1 leading-6"}>
                <NavItem href='/projects'>Projects</NavItem>
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enterFrom="opacity-0 translate-y-1"

                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className={"absolute right-0 mt-2 w-32 list-none rounded-md bg-zinc-800/90 shadow-lg"}>
                  <div className={"p-4 z-50"}>
                    {projects.map((item) => (
                      <div
                        className={"group relative flex items-center gap-x-6 rounded-lg hover:bg-zinc-700"}
                        key={item.name}>
                        <div className={"flex-auto"}>
                          <NavItem href={item.href}>{item.name}</NavItem>

                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </nav >
      </header>


    </>
  )
}

export default function NavBar() {

  return (
    <>
      <DesktopNavigation />
    </>
  )
}
