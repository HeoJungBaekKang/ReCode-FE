import React, { useState } from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";


export default function QnaDetail() {
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [postTitle, setPostTitle] = useState("회원 탈퇴는 어떻게 하나요?");
    const [postDate, setPostDate] = useState("2023-10-31");
    const [postContent, setPostContent] = useState("다른 계정과 연동을 하고 싶어서 이 계정은 탈퇴를 하려합니다.");

    const handleReplyButtonClick = () => {
        setIsReplyOpen(!isReplyOpen);
    };

    const handleEditButtonClick = () => {
        setIsEditMode(true); // '수정' 버튼을 누르면 수정 모드로 변경
    };

    const handleTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handleDateChange = (event) => {
        setPostDate(event.target.value);
    };

    const handleContentChange = (event) => {
        setPostContent(event.target.value); // 글 내용 입력란의 값이 변경되면 상태 업데이트
    };

    const userRole = 'admin';

    const postOwnerId = '';
    const userId = '';

    return (
        <>
            <QnaSidebar />
            <div className="ml-56">
                <div className="ml-3 text-7xl">QnA</div>
                <br />
                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={postTitle}
                                    onChange={handleTitleChange}
                                    className="border-2 border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                <Typography variant="h5" color="blue-gray">
                                    {postTitle}
                                </Typography>
                            )}
                            {isEditMode ? (
                                <input
                                    type="date"
                                    value={postDate}
                                    onChange={handleDateChange}
                                    className="border-2 border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                <Typography color="gray" className="mt-1 font-normal">
                                    {postDate}
                                </Typography>
                            )}
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <tbody>
                                <div className="ml-5 mr-5 sm:col-span-2">
                                    <div className="mt-2.5">
                                        {isEditMode ? (
                                            <textarea
                                                name="discription"
                                                id="discription"
                                                rows={11}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={postContent}
                                                onChange={handleContentChange}
                                            />
                                        ) : (
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {postContent}
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div >
            <div className="ml-56">
                <div className="flex justify-end mt-4 mr-5 space-x-4">
                    {userRole === 'admin' ? (
                        <>
                    <button className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                    <button onClick={handleReplyButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">답글 달기</button>
                    <button className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                    </>
                    ) : (
                        <>
                    {postOwnerId === userId && (
                        <button onClick={handleEditButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">수정</button>
                    )}
                    <button className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                    <button className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                    </>
                    )}
                </div>
                {isReplyOpen && (
                    <Card className="h-full w-auto mx-4">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-8 flex items-center justify-between gap-8">
                                <div>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        답글
                                    </Typography>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="px-0">
                            <table className="w-full min-w-max table-auto text-left">
                                <tbody>
                                    <div className="ml-5 mr-5 sm:col-span-2">
                                        <div className="mt-2.5">
                                            <textarea
                                                name="discription"
                                                id="discription"
                                                rows={11}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                </tbody>
                            </table>
                            <div className="flex justify-end mt-4 mr-5 space-x-4">
                                <button className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">등록</button>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div>
        </>
    );
}