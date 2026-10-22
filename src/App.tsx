import { Routes, Route, Navigate } from "react-router-dom"
import PublicRoute from "./components/layout/PublicRoute"
import { ROUTES } from "./constants/routes"
import PrivateRoute from "./components/layout/PrivateRoute"
import LoginPage from "./pages/Auth/LoginPage"
import MainLayout from "./components/layout/MainLayout"
import { useAppDispatch } from "./store/hooks"
import { useEffect } from "react"
import { subscribeToAuth } from "./services/authService"
import { setUser } from "./store/authSlice"
import HomePage from "./pages/Home/HomePage"
import ReportsPage from "./pages/Reports/ReportsPage"
import Notification from "./components/ui/Notification"
import PublicLayout from "./components/layout/PublicLayout"

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => dispatch(setUser(user)))
    return unsubscribe;
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>

      <Notification />
    </>
  )
}

export default App
