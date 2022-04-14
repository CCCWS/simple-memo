import React, { useContext, useEffect, useRef, useState } from "react";
import "./Dairy.css";
import { FunctionContext } from "./Home";

function Dairy() {
  //context로 데이터를 받음, prop으로 안받아도됨 { onCreate }

  const { onCreate } = useContext(FunctionContext);

  const nameInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    name: "",
    content: "",
    score: "1",
  });

  const stateSave = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const saveBtn = () => {
    if (state.name.length < 1) {
      nameInput.current.focus();
      return;
    }

    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    } else {
      onCreate(state.name, state.content, state.score);
      alert("저장");
      setState({
        name: "",
        content: "",
        score: "",
      });
    }
  };

  return (
    <>
      <div className="Dairy">
        <h2>메모</h2>
        <input
          ref={nameInput}
          name="name"
          value={state.name}
          onChange={stateSave}
          className="nameInput"
          placeholder="이름"
        ></input>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={stateSave}
          className="contentInput"
          placeholder="내용"
        ></textarea>

        <label>
          오늘의 점수 :
          <select name="score" onChange={stateSave} className="select">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button onClick={saveBtn} className="save">
          저장
        </button>
      </div>
    </>
  );
}

export default React.memo(Dairy);
