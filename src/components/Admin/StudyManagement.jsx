import React from "react";
import QnaSidebar from "../Qna/QnaSidebar";
import AdminStudyList from "./AdminStudyList";

export default function StudyManagement() {
    
    return(
        <>
            <QnaSidebar />
            <div className="ml-56">
                <div className="ml-6 text-7xl">스터디 관리</div>
                <AdminStudyList />
            </div>
        </>
    );
}