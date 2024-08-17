import React from "react";

function SortButtons({ sortKey, sortUserTable }) {
    return (
      <div>
        <button onClick={() => sortUserTable('ascending', sortKey)}>↑</button>
        <button onClick={() => sortUserTable('descending', sortKey)}>↓</button>
        <button onClick={() => sortUserTable('none', sortKey)}>–</button>
      </div>
    );
  }

export default SortButtons;