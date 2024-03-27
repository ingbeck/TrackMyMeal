import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import StartScreen from "./pages/StartScreen.tsx";
import {useEffect} from "react";
import axios from "axios";

export default function App() {

    useEffect(() => {
        fetchMe()
    }, []);

    function login(){
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/oauth2/authorization/google", "_self")
    }

    function fetchMe(){
        axios.get("/api/users/me")
            .then(response => {
                console.log(response.data)
            })
    }


    return (
      <Layout>
          <Routes>
              <Route path={"/"} element={<StartScreen login={login}/>}/>
              <Route path={"/registration/:id"} element={<h1>Registration</h1>}/>
          </Routes>
      </Layout>
  )
}
