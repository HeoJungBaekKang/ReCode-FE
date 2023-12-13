import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AdminSidebar from "./AdminSidebar";
import MultiSelect from "../Study/MultiSelect";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";

export default function ModifySkill() {
    const navigate = useNavigate();
    const { authData } = useContext(AuthContext);

    const [skill, setSkill] = useState({
        skills: "",
    });


    const handlePost = async () => {
        try {
            await axios.post(`http:/localhost:8081/api/v1/amin/addskill`, skill, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {

                    setSkill({ skill: response.data.data.skill || '' }); // 가져온 데이터로 essay 상태를 업데이트

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("스택 등록 성공");
                    } else {
                        console.log("스택 등록 실패");
                    }
                });
        } catch (error) {
            console.error("스택 등록 중 오류 발생 : ", error);
        }
    };


    return (
        <>
            <AdminSidebar />
            <div className="ml-56 mt-12">
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    사용자 기술 스택 수정
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="flex items-center">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal mr-3"
                                            >
                                                현재 기술 스택
                                            </Typography>
                                            <div>
                                                <MultiSelect />
                                            </div>
                                        </div>
                                        <div>
                                            <textarea
                                                id="skill"
                                                rows="3"
                                                className="block p-2.5 max-w-[400px] mt-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-4 mr-4"
                                                value={skill.skills || ''}
                                                onChange={(e) => setSkill({ ...skill, skills: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                onClick={handlePost}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                완료
                            </button>
                        </div>
                    </CardBody>
                </Card>
            </div >
        </>
    );
}