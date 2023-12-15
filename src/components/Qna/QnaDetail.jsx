import React, { useEffect, useState, useContext } from "react";
import QnaSidebar from "./QnaSidebar";
import {
    Card,
    CardHeader,
    CardBody,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQnaDetail, saveQna, deleteQna } from "../../services/QnaService";
import { createQnaReply, deleteQnaReply } from "../../services/QnaReplyService";
import { AuthContext } from "../../context/AuthContext";
import { format, parseISO } from 'date-fns';
import ReactHtmlParser from "html-react-parser"
import MyEditor from "../Editor/MyEditor";

export default function QnaDetail() {
    const { authData } = useContext(AuthContext);
    const { qnaId } = useParams();
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();


    const [qnaTitle, setQnaTitle] = useState("");
    const [qnaCreatedAt, setQnaCreatedAt] = useState("");
    const [formatCreatedAt, setFormatCreatedAt] = useState("");
    const [qnaUpdatedAt, setQnaUpdatedAt] = useState("");
    const [qnaContent, setQnaContent] = useState("");
    const [qnaCreateBy, setQnaCreateBy] = useState("");


    const [qnaReplies, setQnaReplies] = useState([]);
    const [qnaReplyId, setQnaReplyId] = useState("");
    const [comment, setComment] = useState("");
    const [replyCreatedAt, setReplyCreatedAt] = useState("");
    const [replyUpdatedAt, setReplyUpdatedAt] = useState("");
    const replyUserId = authData.id
    const replyUserNickname = authData.nickname
    // const loginUserId = authData.id

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
            setQnaCreateBy(data.nickname);
            setUserId(data.userId);
            setQnaReplies(data.qnaReplyList)

            //날짜 포맷팅
            const parsedCreatedDate = parseISO(data.createdAt);
            const formattedCreatedDate = format(parsedCreatedDate, 'yyyy-MM-dd HH:mm');
            setFormatCreatedAt(formattedCreatedDate)
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

        setIsEditMode(true);
    };

    //Qna 제목 수정 핸들러
    const handleTitleChange = (event) => {
        setQnaTitle(event.target.value);
    };

    //Qna 내용 수정 핸들러
    const handleContentChange = (newContent) => {

        setQnaContent(newContent);
    };
    const loginUser = authData.id;

    //Qna 수정 저장 버튼
    const handleSaveChanges = async () => {


        try {
            // const loginUser = authData.id;
            const qnaModifyData = { qnaTitle, loginUser, qnaContent };
            await saveQna(qnaId, qnaModifyData);

            // 편집 모드 해제
            setIsEditMode(false);
            window.location.reload(true);
        } catch (error) {
            console.error(error);
        }
    };

    //Qna 삭제 버튼 핸들러
    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deleteQna(qnaId);
                // 삭제 후 목록 페이지로 이동
                navigate("/qna");
            } catch (error) {
                console.error("삭제 중 오류 발생", error);
            }
        }
    };

    //Qna 댓글 생성
    const handlerSubmitReply = async (event) => {
        event.preventDefault();

        try {

            const qnaReplyData = { comment, replyCreatedAt, replyUpdatedAt, replyUserId, replyUserNickname };
            await createQnaReply(qnaId, qnaReplyData);

            window.location.reload(true);

        } catch (error) {
        }
    };


    // Qna 댓글 생성 핸들러
    const newReply = (newQnaReply) => {
        setComment(newQnaReply)

    };


    //Qna 댓글 삭제 핸들러
    const replyDelete = async (currentReplyId) => {
        if (window.confirm("진짜루 댓글 삭제할고야...?")) {
            try {
                await deleteQnaReply(qnaId, currentReplyId);
                window.location.reload(true);
            } catch (error) {

                console.error("삭제 중 오류 발생", error);
            }
        }
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
                    {userId === authData.id || authData.role === "ADMIN" ? (
                        <React.Fragment>
                            {isEditMode ? (
                                <React.Fragment>
                                    <button onClick={handleSaveChanges} className="px-3 py-1 my-2 w-24 bg-green-500 text-white rounded whitespace-nowrap">저장</button>
                                    <button onClick={handleGoToQna} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">취소</button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {userId === authData.id ? (
                                        <React.Fragment>
                                            <button onClick={handleEditButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">수정</button>
                                            <button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                                            <button onClick={handleDelete} className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment><button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                                            <button onClick={handleDelete} className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button></React.Fragment>)}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button onClick={handleGoToList} className="px-3 py-1 my-2 w-24 bg-gray-500 text-white rounded whitespace-nowrap">목록</button>
                            {/* <button onClick={handleReplyButtonClick} className="px-3 py-1 my-2 w-24 bg-blue-500 text-white rounded whitespace-nowrap">댓글 달기</button> */}
                        </React.Fragment>
                    )}
                </div>



                <div>
                    {isEditMode === false ? (
                        <React.Fragment>
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-8 flex items-center justify-between gap-8">
                                    <div>

                                        <div color="gray" className="mt-1 font-normal">
                                            댓글
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0 w-full">
                                <table className="w-full table-auto text-left">
                                    <tbody >


                                        <tr className="w-full">
                                            <th className="w-full pr-5 mt-4 mr-5 space-x-4">
                                                <input
                                                    type="text"
                                                    value={comment}
                                                    onChange={(e) => newReply(e.target.value)}

                                                    className="mx-5  border-2 border-gray-300 p-2 rounded-md w-full text-sm" />
                                            </th>
                                            <button onClick={handlerSubmitReply} className=" m-5 px-3 py-1 w-24 bg-blue-500 text-white rounded whitespace-nowrap">등록</button>



                                        </tr>


                                        {/* replyId 역순 정렬 */}
                                        {qnaReplies.slice().reverse().map((reply) => (
                                            <tr
                                                key={[reply.id, reply.qnaId]}
                                                className=" w-full border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                <td className="whitespace-nowrap px-6 py-4 font-medium flex justify-between">
                                                    <span className="text-gray-400">
                                                        {reply.nickname}
                                                    </span>
                                                    <span className="mr-20">
                                                        {reply.comment}
                                                    </span>
                                                    {userId === authData.id || authData.role === "ADMIN" ? (
                                                        <React.Fragment>
                                                            <button onClick={() => {
                                                                const currentReplyId = reply.id;
                                                                replyDelete(currentReplyId);
                                                            }} value={reply.id} className="px-3 py-1 my-2 w-20 bg-red-500 text-white rounded">삭제</button>
                                                        </React.Fragment>) : (<tr><td></td></tr>)}

                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-400">

                                                    {format(parseISO(reply.createdAt), 'MM-dd HH:mm')}

                                                </td>





                                            </tr>

                                        ))}

                                    </tbody>
                                </table>

                            </CardBody>
                        </React.Fragment>
                    ) : (<tr><td></td></tr>)}
                    <Card className="h-full w-auto mx-4">

                    </Card>
                </div>
            </div>
        </>
    );
}