import "./App.css";
import Layout from "./components/layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import MyPage from "./components/pages/my-page/MyPage";
import Calender from "./components/pages/calender/Calender";
import Record from "./components/pages/record/Rocord";
import AddPhoto from "./components/pages/add-photo/AddPhoto";
import RecordEdit from "./components/pages/record/RecordEdit";
import MyPageEdit from "./components/pages/my-page/MyPageEdit";
import Login from "./components/pages/login/Login";
import Join from "./components/pages/join/Join";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <Layout />
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/my-page/edit" element={<MyPageEdit />} />
            <Route path="/add-photo" element={<AddPhoto />} />
            <Route path="/record" element={<Record />} />
            <Route path="/record/edit" element={<RecordEdit />} />
            <Route path="/calender" element={<Calender />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
