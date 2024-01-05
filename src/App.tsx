import "./App.css";
import Layout from "./components/layout/Layout";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./components/pages/home/Home"));
const Login = lazy(() => import("./components/pages/login/Login"));
const Join = lazy(() => import("./components/pages/join/Join"));
const MyPage = lazy(() => import("./components/pages/my-page/MyPage"));
const MyPageEdit = lazy(() => import("./components/pages/my-page/MyPageEdit"));
const AddPhoto = lazy(() => import("./components/pages/add-photo/AddPhoto"));
const AiAnalyze = lazy(() => import("./components/pages/ai-analyze/AiAnalyze"));
const Record = lazy(() => import("./components/pages/record/Rocord"));
const RecordEdit = lazy(() => import("./components/pages/record/RecordEdit"));
const Calender = lazy(() => import("./components/pages/calender/Calender"));

function App() {
  return (
    <div className="App">
      <div className="container">
        <main className="main">
          <Suspense fallback="...loading">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/my-page/edit" element={<MyPageEdit />} />
            <Route path="/add-photo" element={<AddPhoto />} />
            <Route path="/ai-analyze" element={<AiAnalyze />} />
            <Route path="/record" element={<Record />} />
            <Route path="/record/edit" element={<RecordEdit />} />
            <Route path="/calender" element={<Calender />} />
            </Routes>
            </Suspense>
        </main>
        <header className="header">
          <Layout />
        </header>
      </div>
    </div>
  );
}

export default App;
