import {ReactNode} from "react";
import Navbar from "./Navbar.tsx";

type LayoutProps = {
    children: ReactNode,
    currentRoute: string,
    appUserId : string
}

export default function Layout(props: Readonly<LayoutProps>) {

    const homeScreenUrl:string = "http://localhost:5173/home"

    return (
        <>
            <main>
                {props.children}
            </main>
            <footer>
                {props.currentRoute === homeScreenUrl && <Navbar/>}
            </footer>
        </>
    );
}