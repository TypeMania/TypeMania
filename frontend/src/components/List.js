//list for leaderboard

//file imports
import React from "react";
import Item from "./Item";

export default function List({ data }) {
  return (
    //maps data in rows 
    <ul className="item-wrapper">
      {data.map(row => (
        <Item row={row} key={row.userID} />
      ))}
    </ul>
  );
}
