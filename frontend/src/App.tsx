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
import {Diary, DiaryEntry, FoodItem} from "./types/Diary.ts";
import AddFoodItem from "./pages/AddFoodItem.tsx";
import {getDateToday} from "./Utility/Utility.ts";

export default function App() {

    const today = getDateToday()
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
    const[diary, setDiary] = useState<Diary>({id:"", userId:"", diaryEntries:[]});
    const[currentDiaryEntry, setCurrentDiaryEntry] = useState<DiaryEntry | undefined >()
    const[currentRoute, setCurrentRoute] = useState<string>("")
    const[currentMeal, setCurrentMeal] = useState<string>("")
    const navigate = useNavigate();

    useEffect(() => {
        getAppUrl()
    }, [])

    useEffect(() => {
        if(appUser.id !== ""){
            getDiaryByUserId(appUser.id)
        }
    }, [appUser]);

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/oauth2/authorization/google", "_self")
    }

    function logout(){
        axios.post("/api/users/logout")
            .then(() => navigate("/"))
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
                setCurrentDiaryEntry(diary.diaryEntries.find(entry => entry.date === today));
            })
            .catch(error => console.log(error.message))
    }

    function createUser(id:string | undefined, appUserCreateDto:AppUserCreateDto){
        axios.put("/api/users/" + id, appUserCreateDto)
            .then(response => {
                setAppUser(response.data)
            })
            .catch(error => console.log(error.message))
    }

    function createDiary(id:string | undefined){
        axios.post("/api/diaries/"+id)
            .then(response => setDiary(response.data))
    }

    function updateDiaryEntry(newFoodItem: FoodItem){
        axios.put("/api/diaries/"+appUser.id+"/"+getDateToday(), newFoodItem)
            .then((response) => {
                setCurrentDiaryEntry(response.data)
            })
    }

    function deleteUser(id: string | undefined){
        axios.delete("/api/users/"+ id)
            .then(() => {
                navigate("/")
            })
    }

    function deleteFoodItem(foodItemToDelete: FoodItem){
        axios.put("/api/diaries/removeFoodItem/"+appUser.id+"/"+getDateToday(), foodItemToDelete)
            .then(response => {
                if(response.data === ""){
                    setCurrentDiaryEntry(undefined)
                }else{
                    setCurrentDiaryEntry(response.data)
                }
            })
            .catch(() => setCurrentDiaryEntry(undefined))
    }

    return (
      <Layout currentRoute={currentRoute} appUser={appUser} appUrl={appUrl} setCurrentMeal={setCurrentMeal}>
          <Routes>
              <Route path={"/"} element={<StartScreen login={login} setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/login"} element={<LoginProcessingScreen getMe={getMe}/>}/>
              <Route path={"/home"} element={<HomeScreen
                  setCurrentRoute={setCurrentRoute}
                  deleteFoodItems={deleteFoodItem}
                  appUser={appUser}
                  currentDiaryEntry={currentDiaryEntry}
                  diary={diary}
                  getMe={getMe}/>
              }/>
              <Route path={"/registration/:id"} element={<RegistrationScreen
                  getUser={getAppUserById}
                  createUser={createUser}
                  createDiary={createDiary}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}/>
              }/>
              <Route path={"/calendar"} element={<CalendarScreen
                  getAppUser={getMe}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}
                  getDiaryByUserId={getDiaryByUserId}
                  diary={diary}/>}/>
              <Route path={"/recipes"} element={<RecipesScreen setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/profile"} element={<ProfileScreen
                  setCurrentRoute={setCurrentRoute}
                  appUser={appUser}
                  getAppUser={getMe}
                  deleteUser={deleteUser}
                  logout={logout}
                  updateUser={createUser}/>
              }/>
              <Route path={"/add-food-item"} element={<AddFoodItem
                  mealType={currentMeal}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}
                  updateDiaryEntry={updateDiaryEntry}
                  currentDiaryEntry={currentDiaryEntry}
                  deleteFoodItem={deleteFoodItem}/>
              }/>
          </Routes>
      </Layout>
  )
}
