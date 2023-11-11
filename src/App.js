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
import StudyRoom_Detail from './components/StudyRoom/StudyRoom_Detail';
import Board from "./components/StudyRoom/StudyRoom_Board";
import Qna from "./components/Qna/Qna";
import HelpDesk from "./components/Mypage/StudyList";
import StudyRoom_Post from './components/StudyRoom/StudyRoom_Post';
import StudyRoom_Attendance from './components/StudyRoom/StudyRoom_Attendance';
import QnaDetail from "./components/Qna/QnaDetail";
import QnaPost from "./components/Qna/QnaPost";

function App() {
  return (
    <Router>
      <Header /> {/* 모든 페이지 상단에 헤더를 렌더링합니다 */}
      <div className="main-content">
        {" "}
        {/* 이 div가 헤더와 나머지 컨텐츠 사이의 간격을 조정합니다 */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/client/recruitment" element={<StudyRecruitment />} />
          <Route path="/mypage" element={<MypageMain />} />
          <Route path="/mypage/myprofile" element={<Mypage_Myprofile />} />
          <Route path="/mypage/myprofile/essay" element={<Essay />} />
          <Route path="/mypage/myprofile/modifyProfile" element={<ModifyProfile />} />
          <Route path="/mypage/myprofile/identifing" element={<Identifing />} />
          <Route path="/mypage/myprofile/changePassword" element={<ChangePassword />} />
          <Route path="/mypage/myprofile/Withdraw" element={<Withdraw />} />
          <Route path="/findId" element={<FindIdForm />} />
          <Route path="/findPassword" element={<FindPasswordForm />} />
          <Route path="/changePassword" element={<ChangePasswordForm/>} />
          <Route path="/mypage/multiselect" element={<MultiSelect />} />
          <Route path="/client/findId" element={<FindIdForm />} />
          <Route path="/client/findPassword" element={<FindPasswordForm />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
