import React from 'react'
import NavLink from './NavLink'

interface IProps {
    onClick?: () => void
}

export default function SideBar({ onClick }: IProps) {
    return (
        <div className="w-full my-2 px-2 space-y-1 text-sm" onClick={onClick}>
            <NavLink href="/" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive ? "stroke-green-700 text-green-700 bg-gray-200" : ""}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H9M19 10L21 12M19 10V20C19 20.2652 18.8946 20.5196 18.7071 20.7071C18.5196 20.8946 18.2652 21 18 21H15M9 21C9.26522 21 9.51957 20.8946 9.70711 20.7071C9.89464 20.5196 10 20.2652 10 20V16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 14 15.7348 14 16V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21M9 21H15" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Главная</span>
            </NavLink>
            <NavLink href="/orders" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8H19M5 8C4.46957 8 3.96086 7.78929 3.58579 7.41421C3.21071 7.03914 3 6.53043 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6C21 6.53043 20.7893 7.03914 20.4142 7.41421C20.0391 7.78929 19.5304 8 19 8M5 8V18C5 18.5304 5.21071 19.0391 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V8M10 12H14" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Заказы</span>
            </NavLink>
            <NavLink href="/products" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7H7.01M7 3H12C12.512 3 13.024 3.195 13.414 3.586L20.414 10.586C20.7889 10.9611 20.9996 11.4697 20.9996 12C20.9996 12.5303 20.7889 13.0389 20.414 13.414L13.414 20.414C13.0389 20.7889 12.5303 20.9996 12 20.9996C11.4697 20.9996 10.9611 20.7889 10.586 20.414L3.586 13.414C3.4 13.2285 3.25249 13.0081 3.15192 12.7655C3.05136 12.5228 2.99973 12.2627 3 12V7C3 5.93913 3.42143 4.92172 4.17157 4.17157C4.92172 3.42143 5.93913 3 7 3Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Товары</span>
            </NavLink>
            <NavLink href="/offers" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Офферы</span>
            </NavLink>
            <NavLink href="/collections" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C19.5304 11 20.0391 11.2107 20.4142 11.5858C20.7893 11.9609 21 12.4696 21 13V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V13C3 12.4696 3.21071 11.9609 3.58579 11.5858C3.96086 11.2107 4.46957 11 5 11M19 11V9C19 8.46957 18.7893 7.96086 18.4142 7.58579C18.0391 7.21071 17.5304 7 17 7M5 11V9C5 8.46957 5.21071 7.96086 5.58579 7.58579C5.96086 7.21071 6.46957 7 7 7M17 7V5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3H9C8.46957 3 7.96086 3.21071 7.58579 3.58579C7.21071 3.96086 7 4.46957 7 5V7M17 7H7" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Коллекции</span>
            </NavLink>
            <NavLink href="/clients" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 20H22V18C22 17.3765 21.8057 16.7686 21.4441 16.2606C21.0826 15.7527 20.5718 15.37 19.9827 15.1658C19.3937 14.9615 18.7556 14.9459 18.1573 15.121C17.5589 15.2962 17.03 15.6534 16.644 16.143M17 20H7M17 20V18C17 17.344 16.874 16.717 16.644 16.143M16.644 16.143C16.2726 15.215 15.6318 14.4195 14.804 13.8591C13.9762 13.2988 12.9996 12.9993 12 12.9993C11.0004 12.9993 10.0238 13.2988 9.196 13.8591C8.36825 14.4195 7.72736 15.215 7.356 16.143M7 20H2V18C2.00005 17.3765 2.19434 16.7686 2.55586 16.2606C2.91739 15.7527 3.42819 15.37 4.01725 15.1658C4.60632 14.9615 5.24438 14.9459 5.84274 15.121C6.4411 15.2962 6.97003 15.6534 7.356 16.143M7 20V18C7 17.344 7.126 16.717 7.356 16.143M15 7C15 7.79565 14.6839 8.55871 14.1213 9.12132C13.5587 9.68393 12.7956 10 12 10C11.2044 10 10.4413 9.68393 9.87868 9.12132C9.31607 8.55871 9 7.79565 9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7ZM21 10C21 10.5304 20.7893 11.0391 20.4142 11.4142C20.0391 11.7893 19.5304 12 19 12C18.4696 12 17.9609 11.7893 17.5858 11.4142C17.2107 11.0391 17 10.5304 17 10C17 9.46957 17.2107 8.96086 17.5858 8.58579C17.9609 8.21071 18.4696 8 19 8C19.5304 8 20.0391 8.21071 20.4142 8.58579C20.7893 8.96086 21 9.46957 21 10ZM7 10C7 10.5304 6.78929 11.0391 6.41421 11.4142C6.03914 11.7893 5.53043 12 5 12C4.46957 12 3.96086 11.7893 3.58579 11.4142C3.21071 11.0391 3 10.5304 3 10C3 9.46957 3.21071 8.96086 3.58579 8.58579C3.96086 8.21071 4.46957 8 5 8C5.53043 8 6.03914 8.21071 6.41421 8.58579C6.78929 8.96086 7 9.46957 7 10Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Клиенты</span>
            </NavLink>
            <NavLink href="/shipping" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17C9 16.4696 8.78929 15.9609 8.41421 15.5858C8.03914 15.2107 7.53043 15 7 15C6.46957 15 5.96086 15.2107 5.58579 15.5858C5.21071 15.9609 5 16.4696 5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142Z" stroke="inherit" />
                    <path d="M18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17C19 16.4696 18.7893 15.9609 18.4142 15.5858C18.0391 15.2107 17.5304 15 17 15C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19C17.5304 19 18.0391 18.7893 18.4142 18.4142Z" stroke="inherit" />
                    <path d="M13 16V6C13 5.73478 12.8946 5.48043 12.7071 5.29289C12.5196 5.10536 12.2652 5 12 5H4C3.73478 5 3.48043 5.10536 3.29289 5.29289C3.10536 5.48043 3 5.73478 3 6V16C3 16.2652 3.10536 16.5196 3.29289 16.7071C3.48043 16.8946 3.73478 17 4 17H5M13 16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17H9M13 16V8C13 7.73478 13.1054 7.48043 13.2929 7.29289C13.4804 7.10536 13.7348 7 14 7H16.586C16.8512 7.00006 17.1055 7.10545 17.293 7.293L20.707 10.707C20.8946 10.8945 20.9999 11.1488 21 11.414V16C21 16.2652 20.8946 16.5196 20.7071 16.7071C20.5196 16.8946 20.2652 17 20 17H19M13 16C13 16.2652 13.1054 16.5196 13.2929 16.7071C13.4804 16.8946 13.7348 17 14 17H15M5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17M5 17C5 16.4696 5.21071 15.9609 5.58579 15.5858C5.96086 15.2107 6.46957 15 7 15C7.53043 15 8.03914 15.2107 8.41421 15.5858C8.78929 15.9609 9 16.4696 9 17M19 17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19C16.4696 19 15.9609 18.7893 15.5858 18.4142C15.2107 18.0391 15 17.5304 15 17M19 17C19 16.4696 18.7893 15.9609 18.4142 15.5858C18.0391 15.2107 17.5304 15 17 15C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Доставка</span>
            </NavLink>
            <NavLink href="/settings" className={({ isActive }) => `flex items-center font-semibold px-3 py-2 hover:bg-gray-200 rounded-md stroke-black ${isActive && "stroke-green-700 text-green-700 bg-gray-200"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.675 4.317C13.249 2.561 10.751 2.561 10.325 4.317C10.049 5.452 8.749 5.99 7.753 5.382C6.209 4.442 4.443 6.209 5.383 7.752C5.5243 7.98375 5.60889 8.24559 5.62987 8.51621C5.65085 8.78683 5.60764 9.05859 5.50375 9.30935C5.39985 9.56011 5.23822 9.7828 5.032 9.95929C4.82578 10.1358 4.5808 10.2611 4.317 10.325C2.561 10.751 2.561 13.249 4.317 13.675C4.58056 13.7391 4.82529 13.8645 5.03127 14.0409C5.23726 14.2174 5.3987 14.44 5.50247 14.6906C5.60624 14.9412 5.64942 15.2128 5.62848 15.4832C5.60755 15.7537 5.5231 16.0153 5.382 16.247C4.442 17.791 6.209 19.557 7.752 18.617C7.98375 18.4757 8.24559 18.3911 8.51621 18.3701C8.78683 18.3491 9.05859 18.3924 9.30935 18.4963C9.56011 18.6001 9.7828 18.7618 9.95929 18.968C10.1358 19.1742 10.2611 19.4192 10.325 19.683C10.751 21.439 13.249 21.439 13.675 19.683C13.7391 19.4194 13.8645 19.1747 14.0409 18.9687C14.2174 18.7627 14.44 18.6013 14.6906 18.4975C14.9412 18.3938 15.2128 18.3506 15.4832 18.3715C15.7537 18.3924 16.0153 18.4769 16.247 18.618C17.791 19.558 19.557 17.791 18.617 16.248C18.4757 16.0162 18.3911 15.7544 18.3701 15.4838C18.3491 15.2132 18.3924 14.9414 18.4963 14.6907C18.6001 14.4399 18.7618 14.2172 18.968 14.0407C19.1742 13.8642 19.4192 13.7389 19.683 13.675C21.439 13.249 21.439 10.751 19.683 10.325C19.4194 10.2609 19.1747 10.1355 18.9687 9.95905C18.7627 9.78258 18.6013 9.55999 18.4975 9.30938C18.3938 9.05877 18.3506 8.78721 18.3715 8.51677C18.3924 8.24634 18.4769 7.98466 18.618 7.753C19.558 6.209 17.791 4.443 16.248 5.383C16.0162 5.5243 15.7544 5.60889 15.4838 5.62987C15.2132 5.65085 14.9414 5.60764 14.6907 5.50375C14.4399 5.39985 14.2172 5.23822 14.0407 5.032C13.8642 4.82578 13.7389 4.5808 13.675 4.317Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="ml-2">Настройки</span>
            </NavLink>
        </div>
    )
}
