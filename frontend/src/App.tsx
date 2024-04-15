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
import {getDateToday} from "./Utility.ts";

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
    }, []);

    useEffect(() => {
        if(appUser.id !== ""){
            getDiaryByUserId(appUser.id)
        }
    }, [appUser.id === ""]);

    useEffect(() => {
        setCurrentDiaryEntry(diary.diaryEntries.find(entry => entry.date === today))
    }, [diary]);

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

    function getDiaryByUserId(userId:string | undefined){
        axios.get("/api/diaries/"+userId)
            .then(response => setDiary(response.data))
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
            .then(response => setCurrentDiaryEntry(response.data))
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
    }

    function deleteUser(id: string | undefined){
        axios.delete("/api/users/"+ id)
            .then(() => {
                navigate("/")
            })
    }

    return (
      <Layout currentRoute={currentRoute} appUser={appUser} appUrl={appUrl} setCurrentMeal={setCurrentMeal}>
          <Routes>
              <Route path={"/"} element={<StartScreen login={login} setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/login/:id"} element={<LoginProcessingScreen getUser={getAppUser}/>}/>
              <Route path={"/home/:id"} element={<HomeScreen
                  setCurrentRoute={setCurrentRoute}
                  getAppUser={getAppUser}
                  appUser={appUser}
                  currentDiaryEntry={currentDiaryEntry}
                  deleteFoodItem={deleteFoodItem}/>
              }/>
              <Route path={"/registration/:id"} element={<RegistrationScreen
                  getUser={getAppUser}
                  createUser={createUser}
                  createDiary={createDiary}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}/>
              }/>
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
              <Route path={"/add-food-item"} element={<AddFoodItem
                  mealType={currentMeal}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}
                  updateDiaryEntry={updateDiaryEntry}
                  deleteFoodItem={deleteFoodItem}
                  currentDiaryEntry={currentDiaryEntry}/>
              }/>
          </Routes>
      </Layout>
  )
}
