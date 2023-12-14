import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageUpload from "@ckeditor/ckeditor5-build-classic/build/ckeditor";

function MyEditor({ initialContent, onContentChange }) {
  const [noticeContent, setNoticeContent] = useState("");

  const handleEditorDataChange = (event, editor) => {
    const newContent = editor.getData();
    setNoticeContent(newContent);

    // 입력값이 변경될 때 부모컴포넌트로 값을 전달
    onContentChange(newContent);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={initialContent} // 초기내용 설정
        config={{
          placeholder: "내용을 입력하세요.",
          toolbar: [
            "heading",
            "undo",
            "redo",
            "bold",
            "italic",
            "numberedList",
            "bulletedList",
            "uploadImage",
            "|",
            "codeBlock",
          ],
          codeBlock: {
            // 여기에 코드 블록 관련 설정 추가 가능
            languages: [
              { language: "plaintext", label: "Plain Text" },
              { language: "c", label: "C" },
              { language: "cpp", label: "C++" },
            ],
            defaultLanguage: "plaintext",
            syntaxHighlighting: true,
          },
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
            ],
          },
        }}
        onChange={handleEditorDataChange}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}

export default MyEditor;
