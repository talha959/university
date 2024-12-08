import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
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
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/UserInfoPage' element={<UserInfoPage/>}/>
          <Route path='/UpdatePasswordPage' element={<UpdatePasswordPage/>}/>
          <Route path='/LectureListPage' element={<LectureListPage/>}/>
          <Route path='/LectureDetailsPage/:id' element={<LectureDetailsPage/>}/>
          <Route path='/CreateCoursePage' element={<CreateCoursePage/>}/>
          <Route path='/LectureNotes' element={<LectureNotes/>}/>
          <Route path='/CreateLecturePage' element={<CreateLecturePage/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;