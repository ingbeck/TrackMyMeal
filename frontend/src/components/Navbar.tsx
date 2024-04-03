import TodayIcon from "../assets/menu-icons/icon_today.svg"
import CalendarIcon from "../assets/menu-icons/icon_calendar.svg"
import RecipeIcon from "../assets/menu-icons/icon_recipe.svg"
import ProfileIcon from "../assets/menu-icons/icon_profile.svg"
import "./Navbar.css"
import {useNavigate} from "react-router-dom";

type NavbarProps = {
    currentRoute : string,
    appUrl : string
}
export default function Navbar(props: Readonly<NavbarProps>) {

    const navigate = useNavigate()
    const homeRoute = props.appUrl + "/home"
    const calendarRoute = props.appUrl + "/calendar"
    const recipesRoute = props.appUrl + "/recipes"
    const profileRoute = props.appUrl + "/profile"

    return (
        <nav className={"navbar"}>
            <div className={"navbar-wrapper"}>
                <button onClick={() => navigate("/home")}
                   className={props.currentRoute == homeRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={TodayIcon} alt={""}/>
                        <span>Heute</span>
                    </div>
                </button>
                <button onClick={() => navigate("/calendar")}
                   className={props.currentRoute == calendarRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={CalendarIcon} alt={""}/>
                        <span>Kalender</span>
                    </div>
                </button>
                <button onClick={() => navigate("/recipes")}
                   className={props.currentRoute == recipesRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={RecipeIcon} alt={""}/>
                        <span>Rezepte</span>
                    </div>
                </button>
                <button onClick={() => navigate("/profile")}
                   className={props.currentRoute == profileRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={ProfileIcon} alt={""}/>
                        <span>Profil</span>
                    </div>
                </button>
            </div>

        </nav>
    );
}
