import HomeLogo from "../assets/AppIcons/57.png"
import "./Navbar.css"
export default function Navbar() {
    return (
        <div className={"navbar"}>
            <a href={"/home"}>
                <div className={"navbar-item"}>
                    <img src={HomeLogo}/>
                    <label>Home</label>
                </div>
            </a>
            <a href={"/home"}>
                <div className={"navbar-item"}>
                    <img src={HomeLogo}/>
                    <label>Home</label>
                </div>
            </a>
            <a href={"/home"}>
                <div className={"navbar-item"}>
                    <img src={HomeLogo}/>
                    <label>Home</label>
                </div>
            </a>
            <a href={"/home"}>
                <div className={"navbar-item"}>
                    <img src={HomeLogo}/>
                    <label>Home</label>
                </div>
            </a>
        </div>
    );
}
