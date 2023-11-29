import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
import axios from "axios";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import {
    Typography,
} from "@material-tailwind/react";


export default function Detail() {

    const navigate = useNavigate();
    const { study_room_id } = useParams();

    const [detail, setDetail] = useState({
        study_room_id: "",
        study_name: "",
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        current_num: "",
        max_num: "",
        master: "",
        skillNames: [],
        createdAt: "",
        updatedAt: "",
    });

    const handleGet = async () => {

        try {
            await axios.get(`http://15.164.85.184/api/study/${study_room_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response.data);

                    setDetail(response.data.data || {});

                    const code = response.data.code;

                    if (code === 1) {
                        console.log("스터디 상세보기 조회 성공");
                    } else {
                        console.log("스터디 상세보기 조회 실패");
                    }
                });
        } catch (error) {
            console.error("스터디 상세보기 조회 중 오류 발생 : ", error);
        }
    };

    useEffect(() => {
        handleGet(); // 페이지가 처음 렌더링될 때 handleGet함수를 실행
    }, []);

    const modalPosition = {
        width: "70%",
        maxWidth: "38rem",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    const [showModal, setShowModal] = useState(false);

    const TABLE_ROWS = [
        {
            name:
                <>
                    1. 스터디 탈퇴 시, 해당 스터디 룸에서 제공되는 서비스에 접근하실 수 없습니다.<br />
                    2. 탈퇴 시, 해당 스터디 룸에서의 모든 권한이 해제됩니다.<br />
                    3. 탈퇴 후 동일한 스터디로 재가입이 가능하나 기존의 데이터와 연동되지 않습니다.<br />
                    4. 탈퇴 버튼을 통해 탈퇴가 완료됩니다.
                </>
        },
    ];

    return (
        <>
            <div>
                <StudyRoom_Sidebar />

                <div className="max-w-screen-md mx-auto p-4">
                    {/* 글 상세 내용 */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold mb-4">{detail.title}</h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">{detail.master}</span>
                            <span className="mr-4">{detail.createdAt}</span>
                        </div>
                        <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">모집인원 {detail.max_num}</span>
                            <span className="mr-4">스터디 기간 {detail.start_date}</span><span>{detail.end_date}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">사용언어:</span>
                            {detail.skillNames.map((skill, index) => (
                                <span key={index} className="px-2 py-1 mr-1 bg-blue-200 text-blue-700 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <div className="text-2xl">소개</div>
                        <div className="mt-10 mb-10">
                            <p className="text-gray-800 dark:text-gray-200">{detail.description}</p>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <TERipple rippleColor="white">
                            <button
                                type="button"
                                className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => setShowModal(true)}
                            >
                                탈퇴
                            </button>
                        </TERipple>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog style={modalPosition}>
                    <TEModalContent>
                        <TEModalHeader>
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    탈퇴 안내
                                </Typography>
                                <Typography color="gray" className="mt-2 w-80 font-normal">
                                    스터디 탈퇴에 대한 안내 사항입니다.
                                </Typography>
                            </div>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(true)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        <TEModalBody>
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <tbody>
                                    {TABLE_ROWS.map(({ name }, index) => {
                                        const classes = index === TABLE_ROWS.length - 1
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";
                                        return (
                                            <tr key={index}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center">
                                                                <hr className="flex-grow border-t border-gray-300" />
                                                                <span className="px-3 text-gray-500">
                                                                    유의 사항
                                                                </span>
                                                                <hr className="flex-grow border-t border-gray-300" />
                                                            </div>
                                                            <br />
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {name}
                                                            </Typography>
                                                            <br />
                                                            <div className="flex items-center">
                                                                <hr className="flex-grow border-t border-gray-300" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </TEModalBody>
                        <TEModalFooter>
                            <TERipple rippleColor="light" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap mr-2"
                                >
                                    취소
                                </button>
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    onClick={() => setShowModal(false)}
                                >
                                    탈퇴
                                </button>
                            </TERipple>
                        </TEModalFooter>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </>
    );
}