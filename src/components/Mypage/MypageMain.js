import React from "react";
import MypageSidebar from "./MypageSidebar";
import MyStudyList from "./MyStudyList";

const MypageMain = () => {
    return (
        <>
            <MypageSidebar />
            <div className="ml-56 mt-12">
                <div className="ml-6 text-2xl">참가 중인 스터디 목록</div>
                <MyStudyList />
            </div>
        </>
    );
};

export default MypageMain;