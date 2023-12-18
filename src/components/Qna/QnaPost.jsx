import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQna } from "../../services/QnaService";
import MyEditor from "../Editor/MyEditor";


export const QnaPost = () => {

    // const {qnaId} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //MyEditor 포맷 설정
    const plainTextContent = removeFormatting(content);

    // CKEditor에서 사용하는 서식 태그를 정규 표현식으로 제거
    function removeFormatting(content) {
        const formattedText = content.replace(/<[^>]*>/g, "");
        return formattedText;
    };

    //Qna 생성 핸들러
    const handlerSubmit = async (event) => {
        event.preventDefault();
        try {
            const qnaData = {title, content };
            const response = await createQna(qnaData);
           console.log("qnaId"+ response.data.id)
            navigate(`/qna/${response.data.id}`);
        } catch (error) {
        }
    };

    //Qna 저장 버튼 핸들러
    const handleEditorDataChange = (newContent) => {
        setContent(newContent);
    };


    return (
        <>
            <form onSubmit={handlerSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="flex gap-x-3">
                    <label
                        htmlFor="notice"
                        className="block text-xl font-semibold leading-2 text-gray-900">
                        Qna 문의 작성
                    </label>
                    <br />
                    <br />
                    <br />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-semibold leading-2 text-gray-900">
                        제목
                    </label>

                    <div className="mt-2.5 mb-4">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            id="title"
                            autoComplete="title"
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <br />

                <div className="sm:col-span-2 mt-2.5">
                    <label
                        htmlFor="title"
                        className="block text-sm font-semibold leading-3 text-gray-900">
                        내용
                    </label>

                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <React.Fragment>
                                <MyEditor
                                    onContentChange={handleEditorDataChange}
                                    dangerouslySetInnerHTML={{ __html: plainTextContent }}
                                />
                            </React.Fragment>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex gap-x-3">
                        <button
                            type="reset"
                            onClick={() => navigate("/qna")}
                            className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                            취소
                        </button>

                        <button
                            type="submit"
                            className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                            작성 완료
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
};

export default QnaPost;
