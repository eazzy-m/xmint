import React from "react";
import SignIn from "../page/SignIn/SignIn";
import Main from "../page/MainPage/Main";
import NotFound from "../page/NotFound/NotFound";
import LearnMore from "../page/LearnMore/LearnMore";
import Profile from "../page/Profile/Profile";
import EditProfile from "../page/EditProfile/EditProfile";
export interface IRoute {
    path: string,
    component: React.ComponentType;
    index?: boolean;
}

export enum RouteNames {
    SIGNIN="/sign-in",
    MAIN="/",
    NOTFOUND="*",
    LEARNMORE="/learn-more",
    PROFILE="/profile",
    EDITPROFILE="/edit-profile"
};

export const publicRoutes: IRoute[] = [
    {path: RouteNames.SIGNIN, component: SignIn, index: true},
    {path: RouteNames.MAIN, component: SignIn},
    {path: RouteNames.NOTFOUND, component: NotFound},
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.MAIN, component: Main, index: true},
    {path: RouteNames.NOTFOUND, component: NotFound},
    {path: RouteNames.LEARNMORE, component: LearnMore},
    {path: RouteNames.PROFILE, component: Profile},
    {path: RouteNames.EDITPROFILE, component: EditProfile},
];