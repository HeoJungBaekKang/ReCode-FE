import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import FindIdForm from "./components/Client/FindIdForm";
import Header from "./components/Fix/Header";
import Login from "./components/Client/Login";
import Join from "./components/Client/Join";
import StudyRecruitment from "./components/Study/StudyRecruitmentForm";
import MultiSelect from "./components/Study/MultiSelect";
import MypageMain from "./components/Mypage/MypageMain";
import Essay from "./components/Mypage/Essay";
import Withdraw from "./components/Mypage/Withdraw";
import Identifing from "./components/Mypage/Identifing";
import ModifyProfile from "./components/Mypage/ModifyProfile";
import ChangePassword from "./components/Client/ChangePassword";
import MypageMyprofile from "./components/Mypage/Mypage_Myprofile";
import Board from "./components/StudyRoom/StudyRoom_Board";
import Qna from "./components/Qna/Qna";
import HelpDesk from "./components/StudyList";
import QnaDetail from "./components/Qna/QnaDetail";
import QnaPost from "./components/Qna/QnaPost";
import { AuthProvider } from "./context/AuthContext";
import Participants from "./components/StudyRoom/Participants";
import ApplyStatus from "./components/StudyRoom/StudyRoom_ManageApplicationStatus";
import ApplicationDetail from "./components/StudyRoom/StudyRoom_ManageApplicationDetail";
import StudyModify2 from "./components/StudyRoom/StudyModify2";
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
import AdminStudyManagement from "./components/Admin/AdminStudyManagement";
import UserList from "./components/Admin/Leader_Permission";
import NaverBook from "./components/NaverBook/BookList";
import EditPost from "./components/StudyRoom/StudyRoom_PostDetailEditForm";
import NotificationPage from "./components/Notification/NotificationPage";
import Estimate from "./components/StudyRoom/EstimateMember";



function App() {

  return (
    <Router>
      <AuthProvider>
        <Header /> {/* 모든 페이지 상단에 헤더를 렌더링합니다 */}
        <div className="main-content">
          {" "}
      
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/findId" element={<FindIdForm />} />
            <Route path="/email" element={<Email />} />
            <Route path="/client/findId" element={<FindIdForm />} />
            <Route path="/mypage/:id" element={<MypageMain />} />
            <Route path="/mypage/myprofile" element={<MypageMyprofile />} />
            <Route path="/mypage/myprofile/essay" element={<Essay />} />
            <Route path="/mypage/myprofile/modifyProfile" element={<ModifyProfile />} />
            <Route path="/mypage/myprofile/identifing" element={<Identifing />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="/mypage/myprofile/Withdraw" element={<Withdraw />} />
            <Route path="/mypage/multiselect" element={<MultiSelect />} />
            <Route path="/mypage/helpDesk" element={<HelpDesk />} />
            <Route path="/studyroom/:study_id" element={<Detail />} />
            <Route path="/studyroomNotLogin/:study_id" element={<StudyRoomNotLogin />} />
            <Route path="/studyroom/board/:study_id" element={<Board />} />
            <Route path="/studyroom/post/:study_id" element={<Post />} />
            <Route path="/studyroom/attendance" element={<Attendance />} />
            <Route path="/studyroom/:study_id/participants" element={<Participants />} />
            <Route path="/studyroom/:study_id/manage" element={<Manage />} />
            <Route path="/studyroom/:study_id/manage/apply" exact element={<ApplyStatus />} />
            <Route path="/studyroom/:study_id/manage/applicationdetail/:id" element={<ApplicationDetail />} />
            <Route path="/studyroom/quiz/:study_id" element={<Quiz />} />
            <Route path="/studyroom/:study_id/post/:post_id" element={<PostDetail />} />
            <Route path="/studyroom/:study_id/manage/modify" element={<StudyModify2 />} />
            <Route path="/AdminstudyroomDetail/:study_id" element={<AdminStudyRoomDetail />} />
            <Route path="/qna" element={<Qna />} />
            <Route path="/qna/:qnaId" element={<QnaDetail />} />
            <Route path="/qna/post" element={<QnaPost />} />
            <Route path="/admin/leaderPermission/:study_id" element={<UserList />} />
            <Route path="/admin/modifyskill" element={<ModifySkill />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/notice/create" element={<NoticeForm />} />
            <Route path="/notice/:noticeId" element={<NoticeDetailPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/filter" element={<MainPageFilter />} />
            <Route path="/termsOfCondtions" element={<TermsAndConditions />} />
            <Route path="/studyroom/:study_id/post/edit/:post_id" element={<EditPost />} />
            <Route path="/admin/studyList" element={<AdminStudyList />} />
            <Route path="/admin/studymanagement" element={<AdminStudyManagement />} />
            <Route path="/naverbook" element={<NaverBook />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/studyroom/:study_id/estimate" element={<Estimate />} />
            <Route path="/client/recruitment" element={<StudyRecruitment/>}/>
        </Routes>

        </div>
      </AuthProvider>
    </Router >
  );
}

export default App;