import React from "react";
import SignIn from "../page/SignIn/SignIn";
import About from "../page/About/About";
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
    {path: RouteNames.ABOUT, component: About, index: true},
    {path: RouteNames.NOTFOUND, component: NotFound},
];