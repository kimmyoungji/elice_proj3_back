import './App.css';
import Layout from '@components/layout/Layout';
import TopBar from '@components/layout/TopBar';
import { lazy, Suspense } from 'react';
import { useLocation, Navigate, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@components/pages/home/Home'));
const Login = lazy(() => import('@components/pages/login/Login'));
const Join = lazy(() => import('@components/pages/join/Join'));
const MyPage = lazy(() => import('@components/pages/my-page/MyPage'));
const MyPageEdit = lazy(() => import('@components/pages/my-page/MyPageEdit'));
const AddPhoto = lazy(() => import('@components/pages/add-photo/AddPhoto'));
const AddPhotoSearch = lazy(
  () => import('@components/pages/add-photo/AddPhotoSearch')
);
const AiAnalyze = lazy(() => import('@components/pages/ai-analyze/AiAnalyze'));
const Record = lazy(() => import('@components/pages/record/Record'));
const RecordEdit = lazy(() => import('@components/pages/record/RecordEdit'));
const MealPage = lazy(() => import('@components/pages/record/MealPage'));
const MealDeatilPage = lazy(
  () => import('@components/pages/record/MealDetailPage')
);
const Calender = lazy(() => import('@components/pages/calendar/Calendar'));

function App() {
  const location = useLocation();
  return (
    <div className='App'>
      <div className='container'>
        <main className='main'>
          <Suspense fallback='...loading'>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/login' element={<Login />} />
              <Route path='/join' element={<Join />} />
              <Route path='/home' element={<Home />} />
              <Route path='/my-page' element={<MyPage />} />
              <Route path='/my-page/edit' element={<MyPageEdit />} />
              <Route path='/add-photo' element={<AddPhoto />} />
              <Route path='/add-photo/search' element={<AddPhotoSearch />} />
              <Route path='/ai-analyze' element={<AiAnalyze />} />
              <Route path='/record/:selectedDate' element={<Record />} />
              <Route path='/record/edit' element={<RecordEdit />} />
              <Route path='/record/:date' element={<MealPage />}>
                <Route path=':mealTime' element={<MealDeatilPage />} />
              </Route>
              {/* <Route path='/record/edit' element={<RecordEdit />} /> */}
              <Route path='/calendar' element={<Calender />} />
            </Routes>
          </Suspense>
        </main>
        <header className='header'>
          {location.pathname !== '/login' && location.pathname !== '/join' && (
            <Layout />
          )}
        </header>
      </div>
    </div>
  );
}

export default App;
