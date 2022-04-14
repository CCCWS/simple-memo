import React, { useEffect, useState } from "react";

const Textview = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`text : ${text}`);
  });
  return <div>{text}</div>;
});

const Countview = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`count : ${count}`);
  });
  return <div>{count}</div>;
});

function Test() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <Countview count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <Textview text={text} />
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default Test;
