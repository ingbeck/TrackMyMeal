import Layout from "./components/Layout.tsx";
import {Route, Routes} from "react-router-dom";

export default function App() {

  return (
      <Layout>
          <Routes>
              <Route path={"/"} element={<h1>Track My Meal</h1>}/>
          </Routes>
      </Layout>
  )
}
