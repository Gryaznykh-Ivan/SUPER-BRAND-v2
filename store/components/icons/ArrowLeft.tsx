import React from 'react'
interface IProps {
  w?: number;
  h?: number;
}

export default function ArrowRight({ w = 24, h = 24 }: IProps) {
  return <svg width={w} height={h} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 19L8 12L15 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

}