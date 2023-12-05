import React, { useState, useContext, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Pagination from "../Fix/Pagination";
import { AuthContext } from "../../context/AuthContext";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import Search from "../Fix/Search";

export default function UserList() {
    const [studyRoomId, setStudyRoomId] = useState(1);
    const [studyMembers, setStudyMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const { authData } = useContext(AuthContext);

    // UserList 컴포넌트 상단에 검색어 상태 변수 추가
    const [searchTerm, setSearchTerm] = useState('');

    // 검색어 업데이트 함수
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    // 검색어를 사용하여 목록 필터링
    const filteredMembers = studyMembers.filter((member) =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStudyMembers = async (studyRoomId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v1/study/${studyRoomId}/memberlistandstatus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            if (!response.ok) {
                console.error("Error response:", response);
                return [];
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error fetching study members:", error);
            return [];  // If there's an error, return an empty array
        }
    };


    const updateRole = async (studyId, userId) => {
        try {
            // studyMembers array에서 멤버 찾기
            const member = studyMembers.find((member) => member.user_id === userId);

            if (!member) {
                console.error("Member not found:", userId);
                return;
            }

            // Determine the new role based on the current role
            const newRole = member.created_by === member.user_id ? "group_member" : "group_leader";

            // Send PUT request to update role
            await fetch(`http://localhost:8081/api/admin/v1/study-member/${studyId}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                },
                body: JSON.stringify({
                    role: newRole
                }),
            });

            // Fetch updated study members after role update
            const members = await getStudyMembers(studyRoomId);
            setStudyMembers(members);
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    useEffect(() => {
        const fetchStudyMembers = async () => {
            const members = await getStudyMembers(studyRoomId);
            setStudyMembers(members);
        };

        fetchStudyMembers();
    }, [studyRoomId]);

    const chunkedMembers = chunk(filteredMembers, 10)

    return (
        <>
            <AdminSidebar />
            <div className="ml-56 mt-12">
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    스터디 권한 관리
                                </Typography>
                                <br />
                                <Typography variant="h6" color="blue-gray">
                                    스터디 멤버 목록
                                </Typography>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Search onChange={handleSearchChange}></Search>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-4 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                                <tr>
                                                    <th scope="col" className="px-4 py-4">
                                                        사용자 번호
                                                    </th>
                                                    <th scope="col" className="px-4 py-4">
                                                        사용자 이름
                                                    </th>
                                                    <th scope="col" className="px-4 py-4">
                                                        역할
                                                    </th>
                                                    <th scope="col" className="px-4 py-4">
                                                        계정관리
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {chunkedMembers[currentPage] ? (
                                                    chunkedMembers[currentPage].map((member, index) => (
                                                        <tr key={member.user_id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 pt-10">
                                                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                                {index + 1 + currentPage * 10}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4">
                                                                {member.username}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4">{member.created_by === member.user_id ? "팀장" : "팀원"}</td>
                                                            <td>
                                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs w-20 rounded" onClick={() => updateRole(member.study_room_id, member.user_id)}>
                                                                    역할변경
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ):(
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-4">
                                                            해당 스터디에 가입된 멤버가 존재하지 않습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <div className="mt-6 flex justify-center">
                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none flex">
                            <li key="previous-button">
                                <button
                                    disabled={currentPage === 0}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === 0 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                                >
                                    Previous
                                </button>
                            </li>
                            {chunkedMembers.map((_, index) => (
                                <li key={`page-button-${index}`}>
                                    <button
                                        onClick={() => setCurrentPage(index)}
                                        className={`relative block rounded px-3 py-1.5 text-sm ${index === currentPage ? 'text-neutral-50 bg-blue-200' : 'text-neutral-600'} transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li key="next-button">
                                <button
                                    disabled={currentPage === chunkedMembers.length - 1}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedMembers.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

function chunk(array, size) {
    const chunked_arr = []
    let copied = [...array]

    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size))
    }

    return chunked_arr
}