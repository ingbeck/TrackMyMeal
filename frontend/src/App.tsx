import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import StartScreen from "./pages/StartScreen.tsx";
import {useState} from "react";
import axios from "axios";
import RegistrationScreen from "./pages/RegistrationScreen.tsx";
import {AppUser} from "./types/AppUser.ts";
import {AppUserCreateDto} from "./types/AppUserCreateDto.ts";
import HomeScreen from "./pages/HomeScreen.tsx";

export default function App() {

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

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/oauth2/authorization/google", "_self")
    }

    function getAppUser(id:string | undefined){
        axios.get("/api/users/" + id)
            .then(response => {
                setAppUser(response.data)
                console.log(response.data)
            })
    }

    function createUser(id:string | undefined, appUserCreateDto:AppUserCreateDto){
        axios.put("/api/users/" + id, appUserCreateDto)
            .then(response => {
                setAppUser(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error.message))
    }

    return (
      <Layout currentRoute={currentRoute} appUserId={appUser.id}>
          <Routes>
              <Route path={"/"} element={<StartScreen login={login} setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/home"} element={<HomeScreen setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/registration/:id"}
                     element={<RegistrationScreen
                         getUser={getAppUser}
                         createUser={createUser}
                         appUser={appUser}
                     setCurrentRoute={setCurrentRoute}/>}/>
          </Routes>
      </Layout>
  )
}
