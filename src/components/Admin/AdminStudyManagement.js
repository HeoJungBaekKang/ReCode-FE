import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudies } from "../../services/FilterService.js";
import AdminSidebar from "./AdminSidebar";
import AdminStudyList from "./AdminStudyList";

export default function AdminStudyManagement() {
  const [currentPage, setCurrentPage] = useState(0);
  const [studies, setStudies] = useState([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      const loadStudies = await getStudies();
      setStudies(loadStudies);
    };
    getSkills();
  }, []);


  return (
    <>
    <AdminSidebar />
    <div className="ml-56">
        <div className="ml-6 text-7xl">스터디 관리</div>
        <AdminStudyList filteredStudies={studies} selectedSkills={selectedSkills} />
    </div>
</>
  );
}
