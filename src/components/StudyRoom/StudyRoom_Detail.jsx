import React, { useState } from "react";
import StudyRoom_Sidebar from "./StudyRoom_Sidebar";
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


const Detail = () => {

    // test
    const post = {
        title: '카카오톡 클론 코딩 스터디',
        studyName: 'Recode',
        createdBy: '정성현',
        createdAt: '2023-08-29',
        maxNum: '6',
        category: '백엔드',
        startDate: '2023-09-10',
        endDate: '2023-11-15',
        skill: 'Java SpringBoot',
        discription: '카카오톡 클론 코딩으로 실력 함께 키우실 분 구합니다. MSA 전문가 적극 환영',
    };

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
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">{post.createdBy}</span>
                            <span className="mr-4">{post.createdAt}</span>
                        </div>
                        <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">모집인원 {post.maxNum}</span>
                            <span className="mr-4">스터디 기간 {post.startDate}</span><span>{post.endDate}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                            <span className="mr-4">사용언어 {post.skill}</span>
                        </div>
                        <hr className="my-10 h-1 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <div className="text-2xl">소개</div>
                        <div className="mt-10 mb-10">
                            <p className="text-gray-800 dark:text-gray-200">{post.discription}</p>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <TERipple rippleColor="white">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
};


export default Detail;