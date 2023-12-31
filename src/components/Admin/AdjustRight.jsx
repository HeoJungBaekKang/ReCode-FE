import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";

export default function AdjustRight() {
    const { study_room_id } = useParams();
    const { study_id } = useParams();
    const { user_id } = useParams();
    const { authData } = useContext(AuthContext);

    const [members, setMembers] = useState([]);

    const handleGet = async () => {

        try {
            let url = `/api/v1/study/${study_room_id}/memberlist`;

            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {

                    const code = response.data.code;

                    setMembers(response.data.data || []);

                    if (code === 1) {

                    } else {
                    }
                });
        } catch (error) {
        }
    }

    useEffect(() => {
        handleGet();
    }, [study_room_id])

    const [rignt, setRight] = useState({
        user_id: "",
        role: "",
        study_id: ""
    })

    const handlePut = async (event) => {

        try {
            await axios.put(`/api/admin/v1/study-member/${study_id}/${user_id}`, rignt, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })
                .then(response => {

                    const code = response.data.code;

                    if (code === 1) {
                    } else {
                    }
                });
        } catch (error) {
        }
    };


    const handleAdjust = async () => {

    }

    return (
        <>
            <div className="ml-56 mt-12">
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    스터디룸 인원 권한 조정
                                </Typography>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0 ml-5 mr-5">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            이름
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            권한
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr key={member.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {member.nickname}
                                            </th>
                                            <td className="px-6 py-4">
                                                {member.status}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button onClick={() => handlePut(member)} className="font-medium text-blue-600 bg-transparent transition duration-300 ease-in-out hover:scale-150 hover:bg-transparent w-40">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

