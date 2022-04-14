import React, { useContext } from "react";
import DariyItem from "./DariyItem";
import { DataContext } from "./Home";

function DariyList() {
  // context로 데이터를 받음  { propData, onDel, onEditUp } prop X
  const propData = useContext(DataContext);

  return (
    <div className="DariyList">
      <div>
        {propData.map((item) => (
          <DariyItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default DariyList;
