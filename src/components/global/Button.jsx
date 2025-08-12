import React from 'react'
import { Link } from 'react-router-dom'
export default function GlobalButton({ children, type = "button", link, disabled = false, customClass, onClick }) {
    const buttonCss = `
    text-white
    bg-gradient-to-r from-[#F03DA7] via-[#F03DA7] to-[#F03DA7]
    hover:bg-gradient-to-br
    focus:outline-none focus:ring-4 focus:ring-[#F03DA7]/30 dark:focus:ring-[#F03DA7]/80
    shadow-lg shadow-[#F03DA7]/50 dark:shadow-lg dark:shadow-[#F03DA7]/80
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
