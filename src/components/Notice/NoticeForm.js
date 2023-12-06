import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CreateNotice } from "../../services/NoticeService";
import MyEditor from "../Editor/MyEditor";
import { data } from "autoprefixer";

export const NoticeForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { authData } = useContext(AuthContext);
  const plainTextContent = removeFormatting(content);

  function removeFormatting(content) {
    // CKEditor에서 사용하는 서식 태그를 정규 표현식으로 제거
    const formattedText = content.replace(/<[^>]*>/g, "");
    return formattedText;
  }

  // MyEditord에서 전달한 값을 처리하는 함수
  const handleEditorDataChange = (newContent) => {
    // 자식 컴포넌트로 부터 받은 값을 상태에 따라 저장하거나 원하는 작업을 수행
    setContent(newContent);
    console.log("newContent in form : ", newContent);
  };

  // 사용자의 권한 확인
  useEffect(() => {
    if (!authData.isAdmin) {
      navigate("/"); // 권한이 없다면 홈페이지나 로그인 페이지 등으로 리디렉션
    }
  }, [authData, navigate]);

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const noticeData = { title, content };
      const createNotice = await CreateNotice(noticeData);
      console.log("생성된 공지사항 : ", createNotice);
    

      // 성공 후 페이지 리디렉션
      navigate("/notice");
    } catch (error) {
      console.log("공지사항 생성 실패 : ", error);
    }
  };


  // 권한이 admin인 경우에만 페이지 내용 렌더링
  return (
    authData.isAdmin && (
      <form
        onSubmit={handlerSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="flex gap-x-3">
          <label
            htmlFor="notice"
            className="block text-xl font-semibold leading-2 text-gray-900"
          >
            관리자 공지사항 작성
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
            htmlFor="content"
            className="block text-sm font-semibold leading-3 text-gray-900"
          >
            내용
          </label>
          <div className="sm:col-span-2">
            <div className="mt-2.5">
              <div>
                <MyEditor
                  onContentChange={handleEditorDataChange}
                  dangerouslySetInnerHTML={{ __html: plainTextContent }}
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
              작성완료
            </button>
          </div>
        </div>
      </form>
    )
  );
};

export default NoticeForm;