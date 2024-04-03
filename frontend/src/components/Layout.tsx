import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";

type LayoutProps = {
    children: ReactNode,
    currentRoute: string,
    appUrl : string,
    appUserId : string
}

export default function Layout(props: Readonly<LayoutProps>) {

    const startScreen:string = props.appUrl + "/"
    const regScreen:string = props.appUrl + "/registration/" + props.appUserId
    const isInApp = props.currentRoute != startScreen && props.currentRoute != regScreen

    return (
        <div>
            <main>
                {props.children}
            </main>
            {isInApp && <Navbar currentRoute={props.currentRoute} appUrl={props.appUrl}/>}
        </div>
    );
}