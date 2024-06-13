import Layout from "./components/Layout.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import StartPage from "./pages/start/StartPage.tsx";
import {useEffect, useState} from "react";
import RegistrationPage from "./pages/registration/RegistrationPage.tsx";
import {AppUser} from "./types/AppUser.ts";
import {AppUserCreateDto} from "./types/AppUserCreateDto.ts";
import HomePage from "./pages/home/HomePage.tsx";
import CalendarPage from "./pages/calendar/CalendarPage.tsx";
import MealsPage from "./pages/meals/MealsPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import LoginProcessingScreen from "./pages/LoginProcessingPage.tsx";
import axios from "axios";
import {Diary,FoodItem} from "./types/Diary.ts";
import AddFoodItem from "./pages/add-food-item/AddFoodItem.tsx";
import {getDateToday} from "./Utility/DateTime.ts";
import {Meal} from "./types/Meal.ts";

export default function App() {


    const initialMeals:Meal[] = [{id:"", userId:"", name:"", mealItems:[], totalCalories: 0}]

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
    const[meals, setMeals] = useState<Meal[]>(initialMeals)

    const navigate = useNavigate();


    useEffect(() => {
        getAppUrl()
    }, []);

    useEffect(() => {

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
        if(appUser.id !== "" && !appUser.isNewUser){
            getDiaryByUserId(appUser.id)
            getMealsByUserId(appUser.id)
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
            .then(response => {
                setAppUrl(response.data)
            })
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

    function getMealsByUserId(id: string |undefined){
        axios.get("/api/meals/"+id)
            .then(response => setMeals(response.data))
            .catch(error => console.log(error.message));
    }

    function addMealToDiary(mealType: string, meal: Meal){
        axios.put("/api/meals/"+appUser.id+"/"+getDateToday()+"/"+mealType, meal)
            .then(()  => getDiaryByUserId(appUser.id))
            .catch(error => console.log(error.message));
    }


    return (
      <Layout currentRoute={currentRoute} appUser={appUser} appUrl={appUrl} setCurrentMeal={setCurrentMeal}>
          <Routes>
              <Route path={"/"} element={<StartPage
                  login={login}
                  setCurrentRoute={setCurrentRoute}/>}/>
              <Route path={"/login"} element={<LoginProcessingScreen
                  getMe={getMe}
                  appUser={appUser}/>}/>
              <Route path={"/home"} element={<HomePage
                  setCurrentRoute={setCurrentRoute}
                  deleteFoodItems={deleteFoodItem}
                  appUser={appUser}
                  diary={diary}/>
              }/>
              <Route path={"/registration/:id"} element={<RegistrationPage
                  createUser={createUser}
                  createDiary={createDiary}
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}/>
              }/>
              <Route path={"/calendar"} element={<CalendarPage
                  appUser={appUser}
                  setCurrentRoute={setCurrentRoute}
                  diary={diary}/>}/>
              <Route path={"/recipes"} element={<MealsPage
                  setCurrentRoute={setCurrentRoute}
                  appUser={appUser}
                  meals={meals}
                  addMealToDiary={addMealToDiary}/>}/>
              <Route path={"/profile"} element={<ProfilePage
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
