import React from 'react'

export default function Container({ children, fullWidth = false, }) {
    return (
        <div className={`px-4 md:5 lg:px-7 xl:px-8 ${fullWidth ? 'max-w-full' : 'max-w-[90rem]'} mx-auto`}>{children}</div>
    )
}
