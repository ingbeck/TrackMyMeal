import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode,
}

export default function Layout(props: Readonly<LayoutProps>) {
    return (
        <>
            <main>
                {props.children}
            </main>
        </>
    );
}