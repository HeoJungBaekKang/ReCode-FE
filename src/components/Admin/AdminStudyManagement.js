import React, { useEffect, useState } from "react";
import { getStudies } from "../../services/FilterService.js";
import AdminSidebar from "./AdminSidebar";
import AdminStudyList from "./AdminStudyList";

export default function AdminStudyManagement() {
  const [studies, setStudies] = useState([]);
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
      <div className="ml-56 mt-12">
        <div className="ml-12 text-4xl text-bold font-semibold">스터디 관리</div>
        <AdminStudyList filteredStudies={studies} selectedSkills={selectedSkills} />
      </div>
    </>
  );
}
