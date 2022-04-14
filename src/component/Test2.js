import React, { useEffect, useState } from "react";

const CountA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`count : ${count}`);
  });
  return <div>{count}</div>;
}); //변화가 없고 버튼을 눌러도 재랜더링 안됨

const CountB = ({ obj }) => {
  useEffect(() => {
    console.log(`obj : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};
//변화가 없지만 버튼을 누르면 재랜더링 됨
//얕은 비교로 객체에 대한 주소를 비교하여 값이 같지만 주소가 달라서 다른것으로 취급

const areEqual = (prepProps, nextProps) => {
  //   if (prepProps.obj.count == nextProps.obj.count) {
  //     return true; //이전 props와 다음 props가 같음 > 리랜더링 발생 안함
  //   }
  //   return false; // 다름 > 리랜더링 발생

  return prepProps.obj.count == nextProps.obj.count;
};

const MemoCountB = React.memo(CountB, areEqual);

function Test2() {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState({
    count: 0,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>conunt a</h2>
        <CountA count={count} />
        <button onClick={() => setCount(count)}> a button</button>
      </div>
      <div>
        <h2>conunt b</h2>
        <MemoCountB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}> b button</button>
      </div>
    </div>
  );
}

export default Test2;
