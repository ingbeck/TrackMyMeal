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
import {Diary,FoodItem} from "./types/Diary.ts";
import AddFoodItem from "./pages/AddFoodItem.tsx";
import {getDateToday} from "./Utility/Utility.ts";

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
        isNewUser : true
    })
    const[diary, setDiary] = useState<Diary>({id:"", userId:"", diaryEntries:[]});
    const[currentRoute, setCurrentRoute] = useState<string>("")
    const[currentMeal, setCurrentMeal] = useState<string>("")

    const navigate = useNavigate();

    useEffect(() => {
        getAppUrl()
        const foundUser  = localStorage.getItem("user");
        if (foundUser) {
            const loggedInUser = JSON.parse(foundUser);
            setAppUser({
                id : loggedInUser.id,
                name : loggedInUser.name,
                birthdate : loggedInUser.birthdate,
                age : loggedInUser.age,
                avatarUrl : loggedInUser.avatarUrl,
                gender: loggedInUser.gender,
                height : loggedInUser.height,
                weight : loggedInUser.weight,
                activityLevel : loggedInUser.activityLevel,
                bmr : loggedInUser.bmr,
                bmrWithActivity : loggedInUser.bmrWithActivity,
                isNewUser : loggedInUser.isNewUser
            })
        }
    }, []);

    useEffect(() => {
        if(appUser.id !== "" && appUser.isNewUser){
            getDiaryByUserId(appUser.id)
        }
    }, [appUser]);

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/oauth2/authorization/google", "_self")
    }

    function logout(){
        axios.post("/api/users/logout")
            .then(() => navigate("/"));
        localStorage.clear();
    }

    function getMe(){
        axios.get("/api/users/me")
            .then(response => {
                getAppUserById(response.data.id);
            });
    }

    function getAppUserById(id: string | undefined){
        axios.get("/api/users/"+id)
            .then(response => {
                setAppUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            })
    }

    function getAppUrl(){
        axios.get("/api/currentUrl")
            .then(response => setAppUrl(response.data))
    }

    function getDiaryByUserId(userId:string | undefined){
        axios.get("/api/diaries/"+userId)
            .then(response => {
                setDiary(response.data);
            })
            .catch(error => console.log(error.message))
    }

    function createUser(id:string | undefined, appUserCreateDto:AppUserCreateDto){
        axios.put("/api/users/" + id, appUserCreateDto)
            .then(response => {
                setAppUser(response.data)
                localStorage.setItem("user", JSON.stringify(response.data));
            })
            .catch(error => console.log(error.message))
    }

    function createDiary(id:string | undefined){
        axios.post("/api/diaries/"+id)
            .then(response => setDiary(response.data))
    }

    function updateDiaryEntry(newFoodItem: FoodItem){
        axios.put("/api/diaries/"+appUser.id+"/"+getDateToday(), newFoodItem)
            .then(() => getDiaryByUserId(appUser.id));
    }

    function deleteUser(id: string | undefined){
        axios.delete("/api/users/"+ id)
            .then(() => {
                localStorage.clear();
                navigate("/")
            })
    }

    function deleteFoodItem(foodItemToDelete: FoodItem){
        axios.put("/api/diaries/removeFoodItem/"+appUser.id+"/"+getDateToday(), foodItemToDelete)
            .then(()  => getDiaryByUserId(appUser.id))
            .catch((error) => console.log(error.message))
    }

    return (
      <Layout currentRoute={currentRoute} appUser={appUser} appUrl={appUrl} setCurrentMeal={setCurrentMeal}>
          <Routes>
              <Route path={"/"} element={<StartScreen
                  login={login}
                  setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/login"} element={<LoginProcessingScreen
                  getMe={getMe}
                  appUser={appUser}/>}/>
              <Route path={"/home"} element={<HomeScreen
                  setCurrentRoute={setCurrentRoute}
                  deleteFoodItems={deleteFoodItem}
                  appUser={appUser}
                  diary={diary}/>
              }/>
              <Route path={"/registration/:id"} element={<RegistrationScreen
                  createUser={createUser}
                  createDiary={createDiary}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}/>
              }/>
              <Route path={"/calendar"} element={<CalendarScreen
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}
                  getDiaryByUserId={getDiaryByUserId}
                  diary={diary}/>}/>
              <Route path={"/recipes"} element={<RecipesScreen setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/profile"} element={<ProfileScreen
                  setCurrentRoute={setCurrentRoute}
                  appUser={appUser}
                  deleteUser={deleteUser}
                  logout={logout}
                  updateUser={createUser}/>
              }/>
              <Route path={"/add-food-item"} element={<AddFoodItem
                  mealType={currentMeal}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}
                  updateDiaryEntry={updateDiaryEntry}
                  diary={diary}
                  deleteFoodItem={deleteFoodItem}/>
              }/>
          </Routes>
      </Layout>
  )
}
