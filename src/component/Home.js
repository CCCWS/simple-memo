import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import Dairy from "./Dairy";
import DariyList from "./DariyList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const createTime = new Date().getTime();
      const newData = {
        ...action.data,
        createTime,
      };
      return [newData, ...state];
    }
    case "DEL": {
      return state.filter((data) => data.id !== action.id);
    }
    case "EDIT": {
      return state.map((data) =>
        data.id === action.targetId
          ? { ...data, content: action.newContent }
          : data
      );
    }
    default:
      return state; //변화 X
  }
};

// export default > 다은 파일에서 import시에 이름 변경해서 사용 가능
// export > { }로 감싸 비구조화할당으로 내보내는 요소의 이름을 그대로 사용
export const DataContext = React.createContext();
//context로 자식노드에 전역으로 데이터 공급
//prop을 통해 단계별로 불필요한 데이터 전달 방지

export const FunctionContext = React.createContext();
// context 하나에 여러 value를 넣으면 data가 변화할때마다 재랜더링 발생
// context를 여러개 생성하여 따로 관리

function Home() {
  // const [propData, setPropData] = useState([]);
  const [propData, dispatch] = useReducer(reducer, []);
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
    dispatch({ type: "INIT", data: initData }); //reducer에 데이터 전달
    // setPropData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((name, content, score) => {
    dispatch({
      type: "CREATE",
      data: { name, content, score, id: id.current },
    });

    // const createTime = new Date().getTime();
    // const newData = {
    //   name,
    //   content,
    //   score,
    //   createTime,
    //   id: id.current,
    // };
    id.current += 1;
    // setPropData((propData) => [newData, ...propData]);
  }, []);
  //[newData, ...propData]만 해주면 함수 실행시 [] 빈배열을 참조하여 항상 빈배열인 상태로 실행됨
  //(propData) => [newData, ...propData] 이전의 데이터를 참조하여 기존의 값을 그대로 받아옴

  //onCreate로 인하여 삭제를 할때도 작성폼이 재랜더링됨
  //useCallback을 사용하여 변화가 없을때 랜더링이 안됨

  const onDel = useCallback((id) => {
    dispatch({ type: "DEL", id });
    // if (window.confirm("삭제?")) {
    //   setPropData((propData) => propData.filter((data) => data.id !== id));
    // }
  }, []);

  const onEditUp = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    // setPropData((propData) =>
    //   propData.map((data) =>
    //     data.id === targetId ? { ...data, content: newContent } : data
    //   )
    // );
  }, []);

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

  const funtionData = useMemo(() => {
    return { onCreate, onDel, onEditUp };
  }, []);
  // useMemo를 사용하지 않고 객체로 묶으면 HOME컴포넌트가 재생성될때 같이 재생성됨

  return (
    <DataContext.Provider value={propData}>
      <FunctionContext.Provider value={funtionData}>
        <div>
          <Dairy />
          {/*context로 데이터를 전달 onCreate={onCreate}넘겨줄 필요 없음 */}
          <hr />
          <h2 style={{ textAlign: "center" }}>메모 리스트</h2>
          <h3>{propData.length}개의 리스트</h3>
          <div>90점 이상 : {dataInfo.goodCount}개</div>
          <div>90점 미만 : {dataInfo.badCount}개</div>
          <div>90점 이상 비율 : {dataInfo.goodRatio}%</div>
          <hr />
          <DariyList />
          {/*context로 데이터를 전달 onDel={onDel} onEditUp={onEditUp} propData={propData} 넘겨줄 필요 없음 */}
        </div>
      </FunctionContext.Provider>
    </DataContext.Provider>
  );
}

export default Home;
