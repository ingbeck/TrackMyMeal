import TodayIcon from "../assets/menu-icons/icon_today.svg"
import CalendarIcon from "../assets/menu-icons/icon_calendar.svg"
import RecipeIcon from "../assets/menu-icons/icon_recipe.svg"
import ProfileIcon from "../assets/menu-icons/icon_profile.svg"
import "./Navbar.css"
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.ts";

type NavbarProps = {
    currentRoute : string,
    appUrl : string,
    appUser : AppUser
}
export default function Navbar(props: Readonly<NavbarProps>) {

    const navigate = useNavigate()
    const appUrl = props.appUrl
    const homeRoute = "/home/" + props.appUser.id
    const calendarRoute = "/calendar/" + props.appUser.id
    const recipesRoute = "/recipes"
    const profileRoute = "/profile/" + props.appUser.id

    return (
        <nav className={"navbar"}>
            <div className={"navbar-wrapper"}>
                <button onClick={() => navigate(homeRoute)}
                   className={props.currentRoute == appUrl+homeRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={TodayIcon} alt={""}/>
                        <span>Heute</span>
                    </div>
                </button>
                <button onClick={() => navigate(calendarRoute)}
                   className={props.currentRoute == appUrl+calendarRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={CalendarIcon} alt={""}/>
                        <span>Kalender</span>
                    </div>
                </button>
                <button onClick={() => navigate(recipesRoute)}
                   className={props.currentRoute == appUrl+recipesRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={RecipeIcon} alt={""}/>
                        <span>Rezepte</span>
                    </div>
                </button>
                <button onClick={() => navigate(profileRoute)}
                   className={props.currentRoute == appUrl+profileRoute ? "navbar-item-active" : "navbar-item"}>
                    <div>
                        <img src={ProfileIcon} alt={""}/>
                        <span>Profil</span>
                    </div>
                </button>
            </div>

        </nav>
    );
}
