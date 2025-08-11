import React from 'react'

export default function Input({ type = "text", placeholder = "", value, onInputChange, name }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={name}
            value={value}
            name={name}
            onChange={onInputChange}
            autoComplete='off'
            className="peer transition-all duration-200 ease px-5 py-4 w-full text-[14px] text-[#171B26] bg-white font-medium rounded-xl border border-[#D2D3D6] focus:border-[#F03DA7] focus:ring-0 focus:text-[16px] outline-none select-all sm:text-[16px]"
        />
    )
}
