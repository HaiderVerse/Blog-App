import React from 'react'

export default function Label({ children, htmlFor }) {
    return (
        <label htmlFor={htmlFor} className="z-2 text-[#585C67] pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all duration-200 ease text-[14px] peer-focus:text-[14px] peer-placeholder-shown:text-[14px] px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0 peer-focus:text-[#F03DA7] sm:peer-placeholder-shown:text-[16px]">{children}</label>
    )
}
