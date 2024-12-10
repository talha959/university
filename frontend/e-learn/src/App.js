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
import Editor from './page/Editor';
import ProtectedRoute from './ProtectedRoute';
import Cookies from "js-cookie";
import AdminCoursesListPage from './page/AdminCreatedCourse';
import AddLecturePage from './page/AddLecture';
import UserInfo from './UserComp/userInfo';
import Courses from './UserComp/Courses';
import Lecture from './UserComp/Lecture';
import HomePage from './HomePage';
function App() {
  const token = Cookies.get('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const [role, setRole] = React.useState(null);
  React.useEffect(() => {
    if (decodedToken) {
      setRole(decodedToken.existingUser.role);
      console.log(decodedToken.existingUser.role);
    }
  }, [decodedToken]);
  console.log(token);
  console.log(token)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!token ? (
            <>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          ) : (
            <>
              <Route path='/user' element={<ProtectedRoute role="user"><User /></ProtectedRoute>} />
              <Route path='/UpdatePasswordPage' element={<UpdatePasswordPage />} />
              {role ==='admin' && <><Route path='/UserInfoPage' element={<UserInfoPage />} /><Route path='/admin' element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} /><Route path='/LectureDetailsPage/:id' element={<ProtectedRoute role="admin"  ><LectureDetailsPage /></ProtectedRoute>} /><Route path='/CreateCoursePage' element={<ProtectedRoute role="admin" ><CreateCoursePage /></ProtectedRoute>} /><Route path='/AddLecturePage/:id' element={<ProtectedRoute role="admin"><AddLecturePage /></ProtectedRoute>} /><Route path='/CreateLecturePage' element={<ProtectedRoute role="admin"><CreateLecturePage /></ProtectedRoute>} /><Route path='/AdminCoursesListPage' element={<ProtectedRoute role="admin"><AdminCoursesListPage /></ProtectedRoute>} /></>}
              {role!=='admin' && <><Route path='/LectureListPage' element={<LectureListPage />} /><Route path='/LectureNotes' element={<LectureNotes />} />
              <Route path='/UserInfo' element={<UserInfo />}
               />
                             <Route path='/editor' element={<Editor />} />
              </>}
            </>
          )}
          <Route path="/course" element={<Courses />} />
          <Route path="/lecture/:id" element={<Lecture />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;