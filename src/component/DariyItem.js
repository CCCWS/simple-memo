import React, { useState, useRef, useEffect, useContext } from "react";
import "./DariyItem.css";
import { FunctionContext } from "./Home";

function DariyItem({ id, name, content, score, createTime }) {
  // useEffect(() => {
  //   console.log(`${id}번 render`);
  // });

  const { onDel, onEditUp } = useContext(FunctionContext);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const contentInput = useRef();

  const onEdit = () => {
    setEdit(!edit);
    setEditContent(content);
  };

  const onEdited = () => {
    if (editContent.length < 1) {
      contentInput.current.focus();
    } else {
      if (window.confirm("수정?")) {
        onEditUp(id, editContent);
        setEdit(!edit);
      }
    }
  };

  const onDelete = () => {
    if (window.confirm("삭제?")) {
      onDel(id);
    }
  };

  const onChange = (event) => {
    setEditContent(event.target.value);
  };

  return (
    <div className="DariyItem">
      <div>
        <span>
          이름 : {name} | 점수 : {score}
        </span>
        <br />
        <span className="date">{new Date(createTime).toLocaleString()}</span>
        <hr />
        {edit ? (
          <textarea
            ref={contentInput}
            value={editContent}
            onChange={onChange}
          ></textarea>
        ) : (
          <div className="content">{content}</div>
        )}
      </div>

      {edit ? (
        <>
          <button onClick={onEdit}>취소</button>
          <button onClick={onEdited}>완료</button>
        </>
      ) : (
        <>
          <button onClick={onDelete}>삭제</button>
          <button onClick={onEdit}>수정</button>
        </>
      )}
    </div>
  );
}

export default React.memo(DariyItem);
