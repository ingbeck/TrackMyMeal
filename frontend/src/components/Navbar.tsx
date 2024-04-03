import TodayIcon from "../assets/menu-icons/icon_today.svg"
import CalendarIcon from "../assets/menu-icons/icon_calendar.svg"
import RecipeIcon from "../assets/menu-icons/icon_recipe.svg"
import ProfileIcon from "../assets/menu-icons/icon_profile.svg"
import "./Navbar.css"
import {useNavigate} from "react-router-dom";

type NavbarProps = {
    currentRoute: string
}
export default function Navbar(props: Readonly<NavbarProps>) {

    const navigate = useNavigate()

    return (
        <nav className={"navbar"}>
            <div className={"navbar-wrapper"}>
                <a onClick={() => navigate("/home")}
                   className={props.currentRoute == "http://localhost:5173/home" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={TodayIcon} alt={""}/>
                        <label>Heute</label>
                    </div>
                </a>
                <a onClick={() => navigate("/calendar")}
                   className={props.currentRoute == "http://localhost:5173/calendar" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={CalendarIcon} alt={""}/>
                        <label>Kalender</label>
                    </div>
                </a>
                <a onClick={() => navigate("/recipes")}
                   className={props.currentRoute == "http://localhost:5173/recipes" ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={RecipeIcon} alt={""}/>
                        <label>Rezepte</label>
                    </div>
                </a>
                <a onClick={() => navigate("/profile")}
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
