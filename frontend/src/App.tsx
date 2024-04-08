import Layout from "./components/Layout.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import StartScreen from "./pages/StartScreen.tsx";
import {useEffect, useState} from "react";
import RegistrationScreen from "./pages/RegistrationScreen.tsx";
import {AppUser} from "./types/AppUser.ts";
import {AppUserCreateDto} from "./types/AppUserCreateDto.ts";
import HomeScreen from "./pages/HomeScreen.tsx";
import CalendarScreen from "./pages/CalendarScreen.tsx";
import RecipesScreen from "./pages/RecipesScreen.tsx";
import ProfileScreen from "./pages/ProfileScreen.tsx";
import LoginProcessingScreen from "./pages/LoginProcessingScreen.tsx";
import axios from "axios";

export default function App() {

    const[appUrl, setAppUrl] = useState<string>("")
    const[appUser, setAppUser] = useState<AppUser>({
        id : "",
        name : "",
        birthdate : "",
        age : 0,
        avatarUrl : "",
        gender: "",
        height : 0,
        weight : 0,
        activityLevel : "",
        bmr : 0,
        bmrWithActivity : 0,
        isNewUser : false
    })
    const[currentRoute, setCurrentRoute] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        getAppUrl()
    }, []);

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/oauth2/authorization/google", "_self")
    }

    function logout(){
        axios.post("/api/users/logout")
            .then(() => navigate("/"))
    }

    function getAppUser(id:string | undefined){
        axios.get("/api/users/" + id)
            .then(response => {
                setAppUser(response.data)
            })
    }

    function getAppUrl(){
        axios.get("/api/currentUrl")
            .then(response => setAppUrl(response.data))
    }

    function createUser(id:string | undefined, appUserCreateDto:AppUserCreateDto){
        axios.put("/api/users/" + id, appUserCreateDto)
            .then(response => {
                setAppUser(response.data)
            })
            .catch(error => console.log(error.message))
    }

    function deleteUser(id: string | undefined){
        axios.delete("/api/users/"+ id)
            .then(() => {
                navigate("/")
            })
    }

    return (
      <Layout currentRoute={currentRoute} appUser={appUser} appUrl={appUrl}>
          <Routes>
              <Route path={"/"} element={<StartScreen login={login} setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/login/:id"} element={<LoginProcessingScreen getUser={getAppUser}/>}/>
              <Route path={"/home/:id"} element={<HomeScreen setCurrentRoute={setCurrentRoute} getAppUser={getAppUser}/>}/>
              <Route path={"/registration/:id"}
                     element={<RegistrationScreen
                         getUser={getAppUser}
                         createUser={createUser}
                         appUser={appUser}
                     setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/calendar"} element={<CalendarScreen setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/recipes"} element={<RecipesScreen setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/profile/:id"} element={<ProfileScreen
                  setCurrentRoute={setCurrentRoute}
                  appUser={appUser}
                  getAppUser={getAppUser}
                  deleteUser={deleteUser}
                  logout={logout}
                  updateUser={createUser}/>
              }/>
          </Routes>
      </Layout>
  )
}
