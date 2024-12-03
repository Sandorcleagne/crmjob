import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const Form_Editor = (props) => {
  const { label, div_class, label_class, onChange,id,initaltext} = props;
  return (
    <div className={`${div_class} form-group`}>
      <label className={`${label_class}`}>{label}</label>
      <Editor
        initialValue={initaltext}
        apiKey="q4pnkvprysmd9g4b9yzb6kpxcd2lxs7dyzlgth68g1755dai"
        plugins="wordcount insertdatetime visualblocks code searchreplace preview lists link image code"
        toolbar= 'undo redo | styleselect | forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | numlist bullist'
        onChange={onChange}
        id={id}
      />
      {/* <Editor
        initialValue={initaltext}
        apiKey="q4pnkvprysmd9g4b9yzb6kpxcd2lxs7dyzlgth68g1755dai"
        plugins="wordcount insertdatetime visualblocks code searchreplace preview"
        onChange={onChange}
        id={id}
      /> */}
      {/* <Editor
        initialValue="<p>This is the initial content of the editor.</p>"
        onChange={onChange}
        value={value}
        id={id}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      /> */}
    </div>
  );
};
export default Form_Editor;