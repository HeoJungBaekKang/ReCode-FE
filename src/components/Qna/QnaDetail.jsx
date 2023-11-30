import React, { useEffect, useState, useContext } from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQnaDetail, fetchReply } from "../../services/QnaService";
import { AuthContext } from "../../context/AuthContext";
import { format, parseISO } from 'date-fns';


export default function QnaDetail() {
    const { authData } = useContext(AuthContext);
    const { qnaId } = useParams();
    const navigate = useNavigate();


    const handleGoToList = () => {
        navigate("/qna");

    };
    const [qnaTitle, setQnaTitle] = useState("");
    const [qnaCreatedAt, setQnaCreatedAt] = useState("");
    const [qnaContent, setQnaContent] = useState("");
    const [qnaCreateBy, setQnaCreateBy] = useState("");
    const [qnaReply, setQnaReply] = useState([]);

    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchQnaDetail(qnaId);
            const data = response.data;
            setQnaTitle(data.title);
            const parsedDate = parseISO(data.createdAt);
            const formattedDate = format(parsedDate, 'yyyy-MM-dd');
            setQnaCreatedAt(formattedDate);
            setQnaContent(data.content);
            setQnaCreateBy(data.userId);
        };
        fetchData();
    }, [qnaId]);

    async function fetchData() {
        const response = await fetchReply(qnaId);
        setQnaReply(response.data);

    }
    useEffect(() => {
        fetchData();
    }, [qnaId]);

    const handleReplyButtonClick = () => {
        setIsReplyOpen(!isReplyOpen);
    };

    const handleEditButtonClick = () => {
        setIsEditMode(true); // '수정' 버튼을 누르면 수정 모드로 변경
    };

    const handleTitleChange = (event) => {
        setQnaTitle(event.target.value);
    };

    const handleDateChange = (event) => {
        setQnaCreateBy(event.target.value);
    };

    const handleContentChange = (event) => {
        setQnaContent(event.target.value); // 글 내용 입력란의 값이 변경되면 상태 업데이트
    };

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
                                    value={qnaTitle}
                                    onChange={handleTitleChange}
                                    className="border-2 border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                <Typography variant="h5" color="blue-gray">
                                    {qnaTitle}
                                </Typography>
                            )}
                            {isEditMode ? (
                                <input
                                    type="date"
                                    value={qnaCreatedAt}
                                    onChange={handleDateChange}
                                    className="border-2 border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                <Typography color="gray" className="mt-1 font-normal">
                                    {qnaCreatedAt}

                                </Typography>
                            )}
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                    <div className="ml-5 mr-5 sm:col-span-2">
                                <div className="mt-2.5">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                           
                                    <tbody>

                                        {isEditMode ? (
                                            <textarea
                                                name="discription"
                                                id="discription"
                                                rows={11}
                                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={qnaContent}
                                                onChange={handleContentChange}
                                            />
                                        ) : (
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {qnaContent}
                                            </Typography>
                                        )}
                                    </tbody>

                               
                        </table>
                        </div>
                            </div>
                    </CardBody>
                </Card>
            </div >
            <div className="ml-56">
                <div className="flex justify-end mt-4 mr-5 space-x-4">
                    {authData.userRole === 'ADMIN' ? (
                        <>

                            <button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                            <button onClick={handleReplyButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">답글 달기</button>
                            <button className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                        </>
                    ) : (
                        <>
                            {qnaCreateBy === authData.userId && (
                                <button onClick={handleEditButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">수정</button>
                            )}
                            <button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                            <button className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                        </>
                    )}
                </div>

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
                                {qnaReply.map((reply) => (<tr
                                    // onClick={() => handleRowClick(qna.id)}
                                    key={reply.id}


                                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                >

                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {reply.comment}
                                    </td>

                                    {console.log("asdfasd" + reply.comment)}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4 mr-5 space-x-4">
                            <button className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">등록</button>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </>
    );
}