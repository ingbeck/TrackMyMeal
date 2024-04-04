import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";
import {AppUser} from "../types/AppUser.ts";

type LayoutProps = {
    children: ReactNode,
    currentRoute: string,
    appUrl : string,
    appUser : AppUser
}

export default function Layout(props: Readonly<LayoutProps>) {

    const startScreen:string = props.appUrl + "/"
    const regScreen:string = props.appUrl + "/registration/" + props.appUser.id
    const isInApp = props.currentRoute != startScreen && props.currentRoute != regScreen

    return (
        <div>
            <main>
                {props.children}
            </main>
            {isInApp && <Navbar currentRoute={props.currentRoute} appUrl={props.appUrl} appUser={props.appUser}/>}
        </div>
    );
}