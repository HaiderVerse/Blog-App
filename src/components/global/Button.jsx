import React from 'react'
import { Link } from 'react-router-dom'
export default function GlobalButton({ children, type = "button", link, disabled = false, customClass, onClick }) {
    const buttonCss = `
    flex items-center justify-center gap-x-[10px]
    text-white
    bg-gradient-to-bl from-[#5CD2E7] to-[#F03DA7]
    transition-all duration-700
    hover:bg-gradient-to-tr
    focus:outline-none focus:ring-2 focus:ring-[#5CD2E7]/100 dark:focus:ring-[#F03DA7]/100
    shadow-lg shadow-[#C850C0]/50 dark:shadow-lg dark:shadow-[#C850C0]/80
    font-medium rounded-lg
    text-base/6
    px-8 py-2.5
    text-center
    font-[cursive,sans-serif]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
    ${customClass}
`

    return (
        <>
            {link ? (
                <Link to={link} className={buttonCss}>
                    {children}
                </Link>
            ) : (
                <button type={type} disabled={disabled} className={buttonCss} onClick={onClick}>
                    {children}
                </button>
            )}
        </>
    )
}
