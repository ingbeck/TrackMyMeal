import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import StartScreen from "./pages/StartScreen.tsx";

export default function App() {

  return (
      <Layout>
          <Routes>
              <Route path={"/"} element={<StartScreen />}/>
          </Routes>
      </Layout>
  )
}
