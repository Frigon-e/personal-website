"use client";
import Link from 'next/link'
import clsx from 'clsx'
import {usePathname} from "next/navigation";
import {useRef, useState} from "react";
import {v4 as uuid} from "uuid";

function NavItem({href, children}: { href: string, children: React.ReactNode }) {
    let isActive = usePathname() === href

    return (
        <Link
            href={href}
            className={clsx(
                'relative block px-3 py-2 transition',
                isActive
                    ? 'text-teal-400'
                    : 'hover:text-teal-400'
            )}
        >
            {children}
            {isActive && (
                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0"/>
            )}
        </Link>
    )
}

type DesktopNavProps = {
    className?: string
}

function DesktopNavigation(props: DesktopNavProps) {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLUListElement>(null)

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        if (dropdownRef.current?.contains(event.target as Node)) {
            setShowDropdown(false)
        }
    }

    return (
        <nav {...props}
             onMouseEnter={() => setShowDropdown(true)}
             onMouseLeave={(event) => handleMouseLeave(event)}>
            <ul className="flex rounded-full px-3 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur bg-zinc-800/90 text-zinc-200 ring-white/10">
                <li>
                    <NavItem href="/">Home</NavItem>
                </li>
                <li>
                    <div className="block transition">
                        <NavItem href="/projects">Projects</NavItem>
                        {showDropdown && (
                            <ul ref={dropdownRef} className="absolute right-0 py-2 mt-2 bg-zinc-800/90 rounded-md shadow-lg w-32 list-none">
                                <li className="px-3 py-2" key={uuid()}>
                                    <NavItem href={"/projects/tictactoe"}>TicTacToe</NavItem>
                                </li>
                            </ul>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default function Header() {

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)',
                }}
            >
                <div className={`top-0 h-16 pt-6 z-10 grid justify-center`}>
                    <DesktopNavigation className="pointer-events-auto md:block"/>
                </div>
            </header>
        </>
    )

}