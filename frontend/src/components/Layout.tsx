import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";

type LayoutProps = {
    children: ReactNode,
    currentRoute: string,
    appUserId : string
}

export default function Layout(props: Readonly<LayoutProps>) {

    const startScreen:string = "http://localhost:5173/"
    const regScreen:string = "http://localhost:5173/registration/"+props.appUserId
    const isInApp = props.currentRoute != startScreen && props.currentRoute != regScreen

    return (
        <div>
            <main>
                {props.children}
            </main>
            {isInApp && <Navbar currentRoute={props.currentRoute}/>}
        </div>
    );
}