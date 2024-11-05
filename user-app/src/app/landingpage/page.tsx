import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./landingpage"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
