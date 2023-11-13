import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import FindIdForm from "./components/Client/FindIdForm";
import FindPasswordForm from "./components/Client/FindPasswordForm";
import ChangePasswordForm from './components/Client/ChangePasswordForm';
import TermsofService from './components/Client/TermsOfService';
import Header from "./components/Fix/Header";
import Login from "./components/Client/Login";
import Join from "./components/Client/Join";
import StudyRecruitment from "./components/Study/StudyRecruitment";
import MultiSelect from "./components/Study/MultiSelect";
import FindEmailForm from "./components/Client/FindEmailForm";
import MypageMain from "./components/Mypage/MypageMain";
import Essay from "./components/Mypage/Essay";
import Withdraw from "./components/Mypage/Withdraw";
import Identifing from "./components/Mypage/Identifing";
import ModifyProfile from "./components/Mypage/ModifyProfile";
import ChangePassword from "./components/Mypage/ChangePassword";
import Mypage_Myprofile from "./components/Mypage/Mypage_Myprofile";
import Detail from './components/StudyRoom/StudyRoom_Detail';
import Board from "./components/StudyRoom/StudyRoom_Board";
import Qna from "./components/Qna/Qna";
<<<<<<< HEAD
import HelpDesk from "./components/StudyList";
import StudyRoom_Post from './components/StudyRoom/StudyRoom_Post';
import StudyRoom_Attendance from './components/StudyRoom/StudyRoom_Attendance';
import QnaDetail from "./components/Qna/QnaDetail";
import QnaPost from "./components/Qna/QnaPost";
import StudyManagement from "./components/Admin/StudyManagement";
import User_list from "./components/Admin/User_list";
import Leader_Permission from "./components/Admin/Leader_Permission";
import ChatList from "./components/Chat/ChatList";
=======
import HelpDesk from "./components/Mypage/StudyList";
import Post from './components/StudyRoom/StudyRoom_Post';
import Attendance from './components/StudyRoom/StudyRoom_Attendance';
import QnaDetail from "./components/Qna/QnaDetail";
import QnaPost from "./components/Qna/QnaPost";
import Manage from "./components/StudyRoom/StudyRoom_Manage";
import ApplicationStatus from "./components/StudyRoom/StudyRoom_ManageApplicationStatus";
import ApplicationDetail from "./components/StudyRoom/StudyRoom_ManageApplicationDetail";
import Quiz from "./components/StudyRoom/StudyRoom_Quiz";

>>>>>>> 0c6dd84d250939c8a834c032c318437af630b158

function App() {

  return (
    <Router>
      <Header /> {/* 모든 페이지 상단에 헤더를 렌더링합니다 */}
      <div className="main-content">
        {" "}
        {/* 이 div가 헤더와 나머지 컨텐츠 사이의 간격을 조정합니다 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
<<<<<<< HEAD
          <Route path="/studyroom/recruitment" element={<StudyRecruitment />} />
=======
          <Route path="/findId" element={<FindIdForm />} />
          <Route path="/findPassword" element={<FindPasswordForm />} />
          <Route path="/changePassword" element={<ChangePasswordForm />} />
>>>>>>> 0c6dd84d250939c8a834c032c318437af630b158
          <Route path="/mypage" element={<MypageMain />} />
          <Route path="/mypage/myprofile" element={<Mypage_Myprofile />} />
          <Route path="/mypage/myprofile/essay" element={<Essay />} />
          <Route path="/mypage/myprofile/modifyProfile" element={<ModifyProfile />} />
          <Route path="/mypage/myprofile/identifing" element={<Identifing />} />
          <Route path="/mypage/myprofile/changePassword" element={<ChangePassword />} />
          <Route path="/mypage/myprofile/Withdraw" element={<Withdraw />} />
          <Route path="/mypage/helpDesk" element={<HelpDesk />} />
          <Route path="/mypage/multiselect" element={<MultiSelect />} />
          <Route path="/client/recruitment" element={<StudyRecruitment />} />
          <Route path="/client/findId" element={<FindIdForm />} />
          <Route path="/client/findPassword" element={<FindPasswordForm />} />
<<<<<<< HEAD
          <Route path="/client/termsofService" element={<TermsofService/>} />
          <Route path="/client/findEmail" element={<FindEmailForm/>} />
          <Route path="/" element={<Main />} />
          <Route path="/studyroom" element={<StudyRoom_Detail/>} />
          <Route path="/studyroom/board" element={<Board/>} />
          <Route path="/qna" element={<Qna/>} />
          <Route path="/qna/detail" element={<QnaDetail/>} />
          <Route path="/qna/post" element={<QnaPost/>} />
          <Route path="/mypage/helpDesk" element={<HelpDesk />} />
          <Route path="/studyroom/post" element={<StudyRoom_Post />} />
          <Route path="/studyroom/attendance" element={<StudyRoom_Attendance />} />
          <Route path="/admin/studymanagement" element={<StudyManagement />} />
          <Route path="/admin/userList" element={<User_list />} />
          <Route path="/admin/leaderPermission" element={<Leader_Permission />} />
          <Route path="/chat/chatList" element={<ChatList />} />
=======
          <Route path="/client/termsofService" element={<TermsofService />} />
          <Route path="/client/findEmail" element={<FindEmailForm />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/qna/detail" element={<QnaDetail />} />
          <Route path="/qna/post" element={<QnaPost />} />
          <Route path="/studyroom" element={<Detail />} />
          <Route path="/studyroom/board" element={<Board />} />
          <Route path="/studyroom/post" element={<Post />} />
          <Route path="/studyroom/attendance" element={<Attendance />} />
          <Route path="/studyroom/manage" element={<Manage />} />
          <Route path="/studyroom/application" exact element={<ApplicationStatus />} />
          <Route path="/studyroom/applicationdetail/:id" element={<ApplicationDetail />} />
          <Route path="/studyroom/quiz" element={<Quiz />} />
>>>>>>> 0c6dd84d250939c8a834c032c318437af630b158
        </Routes>
      </div>
    </Router>
  );
}

export default App;
