import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast"; 
import Layout from "./components/Layout.jsx";

import { Navigate } from "react-router";
import PageLoader from "./components/PageLoader.jsx";
import { getAuthUser } from "./lib/api.js";
import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {


  const {theme} = useThemeStore();

  const {isLoading,authUser} = useAuthUser();

  const isAunthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  if(isLoading) return <PageLoader/>
  return (
    <div className=" h-screen " data-theme={theme}>

      <Routes>
        <Route path="/" element={isAunthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage/>
          </Layout>
        ) : (
          <Navigate to={!isAunthenticated ? "/login" : "/onboarding"}/>
        ) } />
        <Route path="/signup" element={!isAunthenticated ? <SignUpPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>} />
        <Route path="/login" element={!isAunthenticated ?<LoginPage/>: <Navigate to={isOnboarded ? "/" : "/onboarding"}/>} />
        <Route path="/notifications" element={isAunthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationsPage/>
          </Layout>
        ) : (
          <Navigate to={!isAunthenticated ? "/login" : "/onboarding"}/>
        )} />
        <Route path="/call/:id" element={isAunthenticated && isOnboarded ? (<CallPage/>) : (<Navigate to={!isAunthenticated ? "/login" : "/onboasrding"}/>)} />
        <Route path="/chat/:id" element={isAunthenticated && isOnboarded ? (<Layout showSidebar={false}><ChatPage/></Layout>):(<Navigate to={!isAunthenticated ? "/login" : "/onboarding"}/>)} />
        <Route path="/onboarding" element={isAunthenticated ? (!isOnboarded ? (<OnboardingPage/>) : (<Navigate to="/"/>)) : ( <Navigate to="/login"/> ) } />
      </Routes>

      <Toaster/>

    </div>
  );
};

export default App;
