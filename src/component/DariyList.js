import React from "react";
import DariyItem from "./DariyItem";

function DariyList({ propData, onDel, onEditUp }) {
  return (
    <div className="DariyList">
      <div>
        {propData.map((item) => (
          <DariyItem
            key={item.id}
            {...item}
            onDel={onDel}
            onEditUp={onEditUp}
          />
        ))}
      </div>
    </div>
  );
}

export default DariyList;
