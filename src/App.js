import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MypageMain from "./components/Mypage/MypageMain";
import Main from "./components/Main";
import FindIdForm from "./components/Client/FindIdForm";
import FindPasswordForm from "./components/Client/FindPasswordForm";
import FindEmailForm from "./components/Client/FindEmailForm";
import Header from './components/Fix/Header';
import Mypage_Myprofile from './components/Mypage/Mypage_Myprofile';
import ChangePasswordForm from './components/Client/ChangePasswordForm';
import TermsofService from './components/Client/TermsOfService';
import StudyRoom_Detail from './components/StudyRoom/StudyRoom_Detail';

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
          <Route path="/mypage/multiselect" element={<MultiSelect />} />
          <Route path="/client/findId" element={<FindIdForm />} />
          <Route path="/client/findPassword" element={<FindPasswordForm />} />
          <Route path="/client/changePassword" element={<ChangePasswordForm/>} />
          <Route path="/client/termsofService" element={<TermsofService/>} />
          <Route path="/client/findEmail" element={<FindEmailForm/>} />
          <Route path="/" element={<Main />} />
          <Route path="/studyroom" element={<StudyRoom_Detail/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
