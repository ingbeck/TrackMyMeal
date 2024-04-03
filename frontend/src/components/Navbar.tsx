import TodayIcon from "../assets/menu-icons/icon_today.svg"
import CalendarIcon from "../assets/menu-icons/icon_calendar.svg"
import RecipeIcon from "../assets/menu-icons/icon_recipe.svg"
import ProfileIcon from "../assets/menu-icons/icon_profile.svg"
import "./Navbar.css"

type NavbarProps = {
    currentRoute: string
}
export default function Navbar(props: Readonly<NavbarProps>) {

    return (
        <nav className={"navbar"}>
            <div className={"navbar-wrapper"}>
                <a href={"/home"}
                   className={props.currentRoute == "http://localhost:5173/home" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={TodayIcon} alt={""}/>
                        <label>Heute</label>
                    </div>
                </a>
                <a href={"/calendar"}
                   className={props.currentRoute == "http://localhost:5173/calendar" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={CalendarIcon} alt={""}/>
                        <label>Kalender</label>
                    </div>
                </a>
                <a href={"/recipes"}
                   className={props.currentRoute == "http://localhost:5173/recipes" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={RecipeIcon} alt={""}/>
                        <label>Rezepte</label>
                    </div>
                </a>
                <a href={"/profile"}
                   className={props.currentRoute == "http://localhost:5173/profile" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={ProfileIcon} alt={""}/>
                        <label>Profil</label>
                    </div>
                </a>
            </div>

        </nav>
    );
}
