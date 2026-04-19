import React from 'react'

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="bg-surface text-text-primary min-h-screen flex items-center justify-center">
            {children}
        </div>
    )
}
