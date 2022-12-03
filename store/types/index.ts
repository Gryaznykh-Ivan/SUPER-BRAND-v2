import { UrlObject } from "url";

interface INavMenuItemLinkType {
    type: "LINK";
    title: string;
    link: string;
    menu: Array<INavMenuItemLinkType>;
}

interface INavMenuHistoryItem {
    title: string;
    menu: NavMenuType;
}

export type NavMenuType = Array<INavMenuItemLinkType>

export interface IBurgerNavMenuState {
    current: NavMenuType;
    history: Array<INavMenuHistoryItem>;
}

export interface INavMenuState {
    current: NavMenuType;
    activeIndex: number;
}

export interface IProductGridCols {
    mobile: number;
    laptop: number;
}

export interface IPaginationPage {
    id: number;
    title: string;
    isActive: boolean;
    search: UrlObject;
    skip: number;
    limit: number;
}