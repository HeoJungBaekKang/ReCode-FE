import React, { useEffect, useState, useContext } from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQnaDetail, fetchReply } from "../../services/QnaService";
import { AuthContext } from "../../context/AuthContext";
import { format, parseISO } from 'date-fns';
import ReactHtmlParser from "react-html-parser";
import MyEditor from "../Editor/MyEditor";
import { saveQna } from "../../services/QnaService";

export default function QnaDetail() {
    const { authData } = useContext(AuthContext);
    const { qnaId } = useParams();
    const navigate = useNavigate();
    const [qnaTitle, setQnaTitle] = useState("");
    const [qnaCreatedAt, setQnaCreatedAt] = useState("");
    const [formatCreatedAt, setFormatreatedAt] = useState("");
    const [qnaUpdatedAt, setQnaUpdatedAt] = useState("");
    const [qnaContent, setQnaContent] = useState("");
    const [qnaCreateBy, setQnaCreateBy] = useState("");
    const [userId, setUserId] = useState("");
    const [qnaReply, setQnaReply] = useState([]);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    //Qna 단일 조회
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchQnaDetail(qnaId);
            const data = response.data;

            setQnaTitle(data.title);
            setQnaCreatedAt(data.createdAt);
            setQnaUpdatedAt(data.updatedAt);
            setQnaContent(data.content);
            setQnaCreateBy(data.userId.nickname);
            setUserId(data.userId.id);

            //날짜 포맷팅
            const parsedCreatedDate = parseISO(data.createdAt);
            const formattedCreatedDate = format(parsedCreatedDate, 'yyyy-MM-dd HH:mm');
            setFormatreatedAt(formattedCreatedDate)
        };
        fetchData();
    }, [qnaId]);

    //Qna 목록 버튼 핸들러
    const handleGoToList = () => {
        navigate("/qna");

    };

    //Qna 수정 취소 버튼 핸들러
    const handleGoToQna = () => {
        navigate(`/qna/#${qnaId}`);
    };

    //Qna 수정 버튼 핸들러
    const handleEditButtonClick = () => {
        setIsEditMode(true); // '수정' 버튼을 누르면 수정 모드로 변경
    };

    //Qna 제목 수정 핸들러
    const handleTitleChange = (event) => {
        setQnaTitle(event.target.value);
    };

    //Qna 내용 수정 핸들러
    const handleContentChange = (newContent) => {
        setQnaContent(newContent);
    };

    //Qna 저장 버튼 핸들러
    const handleSaveChanges = async () => {
        try {
            await saveQna(qnaId, qnaTitle, qnaContent);
            // 편집 모드 해제
            setIsEditMode(false);
            window.location.reload(true);
        } catch (error) {
        }
    };
    //Qna 댓글 목록 조회
    async function fetchData() {
        const response = await fetchReply(qnaId);
        setQnaReply(response.data);
    }
    useEffect(() => {
        fetchData();
    }, [qnaId]);

    //Qna 댓글 생성 핸들러
    const handleReplyButtonClick = () => {
        setIsReplyOpen(!isReplyOpen);
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
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    {isEditMode ? (
                                        <React.Fragment>
                                            <tr className="border-b">
                                                <td className="p-2 font-medium text-sm">제목</td>
                                                <td colSpan="3" className="p-2">
                                                    <input
                                                        type="text"
                                                        value={qnaTitle}
                                                        onChange={handleTitleChange}
                                                        className="border-2 border-gray-300 p-2 rounded-md w-full text-sm" />
                                                </td>
                                            </tr>

                                            <tr className="border-b">
                                                <td className="p-2 font-medium text-sm">작성일</td>
                                                <td className="p-2 text-sm" colSpan="3">
                                                    {formatCreatedAt}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="p-2 font-medium text-sm">작성자</td>
                                                <td className="p-2 text-sm" colSpan="3">
                                                    {qnaCreateBy}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <tr className="border-b">
                                                <td className="p-2 font-medium text-sm">제목</td>
                                                <td className="p-2 text-sm" colSpan="3">
                                                    {qnaTitle}
                                                </td>
                                            </tr>

                                            <tr className="border-b">
                                                <td className="p-2 font-medium text-sm">작성자</td>
                                                <td className="p-2 text-sm">{qnaCreateBy}</td>
                                            </tr>

                                            <tr className="border-b">
                                                <td className="p-2 font-medium text-sm">작성일</td>
                                                <td className="p-2 text-sm">
                                                    {formatCreatedAt}
                                                </td>
                                            </tr>

                                            {qnaCreatedAt !== qnaUpdatedAt ? (
                                                <React.Fragment>
                                                    <tr className="border-b">
                                                        <td className="p-2 font-medium text-sm">수정일</td>
                                                        <td className="p-2 text-sm">
                                                            {format(parseISO(qnaUpdatedAt), 'yyyy-MM-dd HH:mm')}
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ) : (
                                                <tr><td></td></tr>)}
                                        </React.Fragment>)}
                                </tbody>
                            </table>
                        </div>
                    </CardHeader>

                    <CardBody className="px-0">
                        <div className="ml-5 mr-5 sm:col-span-2">
                            <div className="mt-2.5">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <tbody>
                                        {isEditMode ? (
                                            <React.Fragment>
                                                <tr>
                                                    <td>
                                                        <MyEditor
                                                            data={qnaContent}
                                                            name="qnaContent"
                                                            id="qnaContent"
                                                            rows={11}
                                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            initialContent={qnaContent}
                                                            onContentChange={handleContentChange}
                                                        />
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <tr>
                                                    <td variant="small" color="blue-gray" className="font-normal">
                                                        {ReactHtmlParser(qnaContent)}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
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
                    {userId === authData.id ? (
                        <React.Fragment>
                            {isEditMode ? (
                                <React.Fragment>
                                    <button onClick={handleSaveChanges} className="px-3 py-1 my-2 w-24 bg-green-500 text-white rounded whitespace-nowrap">저장</button>
                                    <button onClick={handleGoToQna} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">취소</button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <button onClick={handleEditButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">수정</button>
                                    <button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                                    <button className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                            <button onClick={handleReplyButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">댓글 달기</button>
                        </React.Fragment>
                    )}
                </div>





                <Card className="h-full w-auto mx-4">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>

                                <div color="gray" className="mt-1 font-normal">
                                    답글
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-0">
                        <table className="w-full min-w-max table-auto text-left">
                            <tbody>
                                {qnaReply.map((reply) => (
                                    <tr

                                        key={reply.id}


                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                                    >

                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {reply.comment}
                                        </td>
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