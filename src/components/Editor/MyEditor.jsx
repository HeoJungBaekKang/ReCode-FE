// 필요한 모듈 가져오기
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./MyEditor.css";

function MyEditor({ initialContent, onContentChange }) {
  const [noticeContent, setNoticeContent] = useState("");

  const handleEditorDataChange = (event, editor) => {
    const newContent = editor.getData();
    setNoticeContent(newContent);

    // 입력값이 변경될 때 부모컴포넌트로 값을 전달
    onContentChange(newContent);
  };



  return (
    <div className={0}>
      <CKEditor
        editor={ClassicEditor}
        data={initialContent}
        config={{
          placeholder: "내용을 입력하세요.",
          toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList']
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