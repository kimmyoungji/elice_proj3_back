import './App.css';
import Layout from '@components/layout/Layout';
import TopBar from '@components/layout/TopBar';
import {
  defaultNavProps,
  getKeyFromUrl,
  getNavProps,
} from '@utils/getNavProps';
import { lazy, Suspense } from 'react';
import { useLocation, Navigate, Route, Routes } from 'react-router-dom';
import { TopNavKeyType } from 'typings/propTypes';
import Loading from '@components/UI/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@components/error/Error';
import {
  QueryErrorResetBoundary,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';

const Home = lazy(() => import('@components/pages/home/Home'));
const Login = lazy(() => import('@components/pages/login/Login'));
const Auth = lazy(() => import('@components/pages/join/Auth'));
const Onboarding = lazy(() => import('@components/pages/join/Onboarding'));
const Join = lazy(() => import('@components/pages/join/Join'));
const MyPage = lazy(() => import('@components/pages/my-page/MyPage'));
const MyPageEdit = lazy(() => import('@components/pages/my-page/MyPageEdit'));
const AddPhoto = lazy(() => import('@components/pages/add-photo/AddPhoto'));
const AddPhotoSearch = lazy(
  () => import('@components/pages/add-photo/AddPhotoSearch')
);
const AiAnalyze = lazy(() => import('@components/pages/ai-analyze/AiAnalyze'));
const AiDrawer = lazy(() => import('@components/pages/ai-analyze/AiDrawer'));
const AiDrawerDetail = lazy(
  () => import('@components/pages/ai-analyze/AiDrawerDetail')
);
const Record = lazy(() => import('@components/pages/record/Record'));
const RecordEdit = lazy(() => import('@components/pages/record/RecordEdit'));
const MealPage = lazy(() => import('@components/pages/record/MealPage'));
const Calender = lazy(() => import('@components/pages/calendar/Calendar'));

const preventNavArr = ['login', 'join', 'auth', 'onboardingstep'];
const preventTopNavArr = ['auth', 'sharestep'];

function App() {
  const location = useLocation();
  const nowLocation = location.pathname.slice(1);
  const key: TopNavKeyType | string = getKeyFromUrl(nowLocation);
  const navProps = getNavProps[key];
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary onReset={reset} fallback={<Error />}>
        <div className='App'>
          <div className='container'>
            {!preventTopNavArr.includes(key) && (
              <header style={{ boxSizing: 'border-box' }}>
                <TopBar {...defaultNavProps} {...navProps} />
              </header>
            )}
            <main className='main'>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path='/' element={<Navigate to='/home' />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/auth' element={<Auth />} />
                  <Route path='/onboarding/:step' element={<Onboarding />} />
                  <Route path='/join' element={<Join />} />
                  {/* <Route path='/join/onboarding' element={<JoinOnboard />} /> */}
                  <Route path='/home' element={<Home />} />
                  <Route path='/my-page' element={<MyPage />} />
                  <Route path='/my-page/edit' element={<MyPageEdit />} />
                  <Route
                    path='/add-photo/:date/:mealTime'
                    element={<AddPhoto />}
                  />
                  <Route
                    path='/add-photo/:date/:mealTime/search'
                    element={<AddPhotoSearch />}
                  />
                  <Route path='/ai-analyze' element={<AiAnalyze />} />
                  <Route path='/ai-drawer' element={<AiDrawer />} />
                  <Route
                    path='/ai-drawer/detail'
                    element={<AiDrawerDetail />}
                  />
                  <Route path='/record/:selectedDate' element={<Record />} />
                  <Route
                    path='/record/:date/:mealTime/edit'
                    element={<RecordEdit />}
                  />
                  <Route
                    path='/record/:date/:mealTime'
                    element={<MealPage />}
                  />
                  <Route path='/calendar' element={<Calender />} />
                </Routes>
              </Suspense>
            </main>

            {!preventNavArr.includes(key) && (
              <nav className='header'>
                <Layout />
              </nav>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}
export default App;
