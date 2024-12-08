import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './page/login';
import ErrorPage from './page/ErrorPage';
import RegistrationPage from './page/RegistrationPage';
import UserInfoPage from './page/UserInfoPage';
import UpdatePasswordPage from './page/UpdatePasswordPage ';
import LectureListPage from './page/LectureListPage';
import LectureDetailsPage from './page/LectureDetailsPage';
import CreateCoursePage from './page/CreateCoursePage';
import CreateLecturePage from './page/CreateLecturePage';
import LectureNotes from './page/LectureNotes';
import Admin from './page/admin';
import User from './page/user';
import ProtectedRoute from './ProtectedRoute';
import Cookies from "js-cookie";
import AdminCoursesListPage from './page/AdminCreatedCourse';
function App() {
  const token = Cookies.get('token');
  console.log(token)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          ) : (
            <>
              <Route path='/UserInfoPage' element={<UserInfoPage/>}/>
              <Route path='/admin' element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>}/>
              <Route path='/user' element={<ProtectedRoute role="user"><User /></ProtectedRoute>}/>
              <Route path='/UpdatePasswordPage' element={<UpdatePasswordPage/>}/>
              <Route path='/LectureListPage' element={<LectureListPage/>}/>
              <Route path='/LectureDetailsPage/:id' element={<LectureDetailsPage/>}/>
              <Route path='/CreateCoursePage' element={<CreateCoursePage/>}/>
              <Route path='/LectureNotes' element={<LectureNotes/>}/>
              <Route path='/CreateLecturePage' element={<CreateLecturePage/>}/>
              <Route path='/AdminCoursesListPage' element={<AdminCoursesListPage/>}/>
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;