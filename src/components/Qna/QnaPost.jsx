import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNotice } from "../../services/NoticeService";

export const QnaPost = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handlerSubmit = async (event) => {
        event.preventDefault();
        try {
            const qnaData = { title, content };
            const createQna = await CreateNotice(qnaData);
            console.log('생성된 공지사항 : ', createQna);

            // 성공 후 페이지 리디렉션
            navigate('/qna');
        } catch (error) {
            console.log('공지사항 생성 실패 : ', error);
        }
    };

    return (
        (
            <form onSubmit={handlerSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="flex gap-x-3">
                    <label
                        htmlFor="notice"
                        className="block text-xl font-semibold leading-2 text-gray-900"
                    >
                        Qna 문의 작성
                    </label>
                    <br />
                    <br />
                    <br />

                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-semibold leading-2 text-gray-900"
                    >
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
                        className="block text-sm font-semibold leading-3 text-gray-900"
                    >
                        내용
                    </label>
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <div>

                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    name="description"
                                    id="description"
                                    rows={20}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />

                            </div>

                        </div>

                    </div>
                </div>


                <div className="mt-10">
                    <div className="flex gap-x-3">
                        <button
                            type="reset"
                            onClick={() => navigate("/")}
                            className="flex-1 rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            작성 완료
                        </button>
                    </div>
                </div>
            </form>
        )
    )
};

export default QnaPost;