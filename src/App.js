import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import FindIdForm from "./components/Client/FindIdForm";
import FindPasswordForm from "./components/Client/FindPasswordForm";
import Header from "./components/Fix/Header";
import Login from "./components/Client/Login";
import Join from "./components/Client/Join";
import StudyRecruitment from "./components/Study/StudyRecruitmentForm";
import MultiSelect from "./components/Study/MultiSelect";
import FindEmailForm from "./components/Client/FindEmailForm";
import MypageMain from "./components/Mypage/MypageMain";
import Essay from "./components/Mypage/Essay";
import Withdraw from "./components/Mypage/Withdraw";
import Identifing from "./components/Mypage/Identifing";
import ModifyProfile from "./components/Mypage/ModifyProfile";
import ChangePassword from "./components/Client/ChangePassword";
import Mypage_Myprofile from "./components/Mypage/Mypage_Myprofile";
import Board from "./components/StudyRoom/StudyRoom_Board";
import Qna from "./components/Qna/Qna";
import HelpDesk from "./components/StudyList";
import QnaDetail from "./components/Qna/QnaDetail";
import QnaPost from "./components/Qna/QnaPost";
import User_list from "./components/Admin/User_list";
import Leader_Permission from "./components/Admin/Leader_Permission";
import { AuthProvider } from "./context/AuthContext";
import Participants from "./components/StudyRoom/Participants";
import ApplicationStatus from "./components/StudyRoom/StudyRoom_ManageApplicationStatus";
import ApplicationDetail from "./components/StudyRoom/StudyRoom_ManageApplicationDetail";
import StudyModify from "./components/StudyRoom/StudyModify";
import StudyRoomNotLogin from "./components/StudyRoom/StudyroomDetailNotLogin";
import PostDetail from "./components/StudyRoom/StudyRoom_PostDetail";
import Quiz from "./components/StudyRoom/StudyRoom_Quiz";
import Detail from './components/StudyRoom/StudyRoom_Detail';
import Post from './components/StudyRoom/StudyRoom_Post';
import Attendance from './components/StudyRoom/StudyRoom_Attendance';
import Manage from "./components/StudyRoom/StudyRoom_Manage";
import ModifySkill from "./components/Admin/ModifySkill";
import NoticePage from "./components/Pages/NoticePage";
import NoticeForm from "./components/Notice/NoticeForm";
import Email from "./components/Client/EmailForm";
import NoticeDetailPage from "./components/Pages/NoticeDetailPage";
import FaqPage from "./components/Pages/FaqPage";
import MainPageFilter from "./components/Pages/MainPageFilter";
import TermsAndConditions from "./components/Client/Agreement";
import AdminStudyRoomDetail from "./components/StudyRoom/AdminStudyRoomDetail";
import AdminStudyList from "./components/Admin/AdminStudyList";
import AdjustRight from "./components/Admin/AdjustRight";
import AdminStudyManagement from "./components/Admin/AdminStudyManagement";
import ChatList from "./components/Chat/ChatList";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Header /> {/* 모든 페이지 상단에 헤더를 렌더링합니다 */}
        <div className="main-content">
          {" "}
          {/* 이 div가 헤더와 나머지 컨텐츠 사이의 간격을 조정합니다 */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/findId" element={<FindIdForm />} />
            <Route path="/findPassword" element={<FindPasswordForm />} />
            <Route path="/email" element={<Email />} />
            <Route path="/client/recruitment" element={<StudyRecruitment />} />
            <Route path="/client/findId" element={<FindIdForm />} />
            <Route path="/client/findPassword" element={<FindPasswordForm />} />
            <Route path="/client/findEmail" element={<FindEmailForm />} />
            <Route path="/mypage/:id" element={<MypageMain />} />
            <Route path="/mypage/myprofile" element={<Mypage_Myprofile />} />
            <Route path="/mypage/myprofile/essay" element={<Essay />} />
            <Route path="/mypage/myprofile/modifyProfile" element={<ModifyProfile />} />
            <Route path="/mypage/myprofile/identifing" element={<Identifing />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="/mypage/myprofile/Withdraw" element={<Withdraw />} />
            <Route path="/mypage/multiselect" element={<MultiSelect />} />
            <Route path="/mypage/helpDesk" element={<HelpDesk />} />
            <Route path="/studyroom/:study_room_id" element={<Detail />} />
            <Route path="/studyroomNotLogin/:study_room_id" element={<StudyRoomNotLogin />} />
            <Route path="/studyroom/board/:study_id" element={<Board />} />
            <Route path="/AdminstudyroomDetail/:study_room_id" element={<AdminStudyRoomDetail />} />
            <Route path="/studyroom/post" element={<Post />} />
            <Route path="/studyroom/attendance" element={<Attendance />} />
            <Route path="/studyroom/participants" element={<Participants />} />
            <Route path="/studyroom/manage" element={<Manage />} />
            <Route path="/studyroom/application" exact element={<ApplicationStatus />} />
            <Route path="/studyroom/applicationdetail/:id" element={<ApplicationDetail />} />
            <Route path="/studyroom/quiz/:study_room_id" element={<Quiz />} />
            <Route path="/studyroom/post" exact element={Post} />
            <Route path="/studyroom/postdetail/:postId" element={<PostDetail />} />
            <Route path="/studyroom/manage" element={<Manage />} />
            <Route path="/studyroom/manage/modify" element={<StudyModify />} />
            <Route path="/qna" element={<Qna />} />
            <Route path="/qna/detail" element={<QnaDetail />} />
            <Route path="/qna/post" element={<QnaPost />} />
            <Route path="/admin/userList" element={<User_list />} />
            <Route path="/admin/leaderPermission/:study_room_id" element={<Leader_Permission />} />
            <Route path="/admin/modifyskill" element={<ModifySkill />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/create" element={<NoticeForm />} />
            <Route path="/notice/:noticeId" element={<NoticeDetailPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/filter" element={<MainPageFilter />} />
            <Route path="/termsOfCondtions" element={<TermsAndConditions />} />
            <Route path="/admin/studyList" element={<AdminStudyList />} />
            <Route path="/admin/adjust/:study_room_id" element={<AdjustRight />} />
            <Route path="/admin/studymanagement" element={<AdminStudyManagement />} />
            <Route path="/chat/chatList/:user_id" element={<ChatList />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router >
  );
}

export default App;
