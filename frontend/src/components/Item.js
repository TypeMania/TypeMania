//file imports
import React from "react";

//creates leaderboard row item
export default function Item({ row }) {
  return (
    <li className="item">
      <span className="item__name">{row.user[0].username}</span>
      <span className="item__score">{row.score}</span>
    </li>
  );
}
