import React, { useEffect, useMemo, useRef, useState } from "react";
import Dairy from "./Dairy";
import DariyList from "./DariyList";
import Test from "./Test";

//https://jsonplaceholder.typicode.com/comments

function Home() {
  const [propData, setPropData] = useState([]);
  const id = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://api.rawg.io/api/games?key=17058e11301a4bf892f409d4ea85d5ff&dates=2010-01-01,2022-09-30&ordering=-metacritic&platforms=187&page_size=50"
    ).then((res) => res.json());
    const data = res.results;
    const initData = data.map((data) => {
      return {
        name: data.name,
        content: data.slug,
        score: data.metacritic,
        createTime: data.released,
        id: id.current++,
      };
    });
    setPropData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (name, content, score) => {
    const createTime = new Date().getTime();
    const newData = {
      name,
      content,
      score,
      createTime,
      id: id.current,
    };
    id.current += 1;
    setPropData([newData, ...propData]);
  };

  const onDel = (id) => {
    if (window.confirm("삭제?")) {
      setPropData(propData.filter((data) => data.id !== id));
    }
  };

  const onEditUp = (targetId, newContent) => {
    setPropData(
      propData.map((data) =>
        data.id === targetId ? { ...data, content: newContent } : data
      )
    );
  };

  const dataInfo = useMemo(() => {
    const goodCount = propData.filter((data) => data.score >= 90).length;
    const badCount = propData.length - goodCount;
    const goodRatio = ((goodCount / propData.length) * 100).toFixed(1);

    return { goodCount, badCount, goodRatio };
  }, [propData.length]);
  //useMemo를 사용하여 propData.length가 변화할때만 수행됨
  //useMemo를 안써주면 수정과 같이 데이터가 변화가 안될때도 재랜더링됨
  //dataInfo는 더이상 함수가 아닌 useMemo가 retrun해주는 값이 들어감

  // const { goodCount, badCount, goodRatio } = dataInfo;

  return (
    <div>
      <Test />
      <Dairy onCreate={onCreate} />
      <hr />
      <h2 style={{ textAlign: "center" }}>메모 리스트</h2>
      <h3>{propData.length}개의 리스트</h3>
      <div>90점 이상 : {dataInfo.goodCount}개</div>
      <div>90점 미만 : {dataInfo.badCount}개</div>
      <div>90점 이상 비율 : {dataInfo.goodRatio}%</div>
      <hr />

      <DariyList propData={propData} onDel={onDel} onEditUp={onEditUp} />
    </div>
  );
}

export default Home;
