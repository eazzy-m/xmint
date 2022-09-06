import React from "react";
import SignIn from "../page/SignIn/SignIn";
import Main from "../page/MainPage/Main";
import NotFound from "../page/NotFound/NotFound";

export interface IRoute {
    path: string,
    component: React.ComponentType;
    index?: boolean;
}

export enum RouteNames {
    SIGNIN="/sign-in",
    ABOUT="/",
    NOTFOUND="*"
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.SIGNIN, component: SignIn, index: true},
    {path: RouteNames.ABOUT, component: SignIn},
    {path: RouteNames.NOTFOUND, component: NotFound},
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.ABOUT, component: Main, index: true},
    {path: RouteNames.NOTFOUND, component: NotFound},
];