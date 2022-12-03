import React from 'react'

interface IProps {
    className?: string;
    w?: number;
    h?: number;
}

export default function wall({ w = 32, h = 32, className = "" }: IProps) {
    return (
        <svg className={className} width={w} height={h} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.96777" y="1.96777" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="9.70947" y="1.96777" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="17.4517" y="1.96777" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="25.1934" y="1.96777" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="1.96777" y="9.70972" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="9.70947" y="9.70972" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="17.4517" y="9.70972" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="25.1934" y="9.70972" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="25.1934" y="17.4517" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="25.1934" y="25.1936" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="17.4517" y="25.1936" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="9.70947" y="25.1936" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="1.96777" y="25.1936" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="1.96777" y="17.4517" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="9.70947" y="17.4517" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
            <rect x="17.4517" y="17.4517" width="4.83871" height="4.83871" rx="2" stroke="inherit" strokeWidth="2" />
        </svg>
    )
}