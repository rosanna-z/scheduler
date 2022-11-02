import React from "react";
import "./DayListItem.scss"
import classNames from "classnames";

export default function DayListItem(props) {
  function formatSpots() {
    if (props.spots == 1) {
      return "1 spot remaining"
    }
    else if (props.spots == 0) {
      return "no spots remaining"
    }
  }

  const dayClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots == 0 // <--- ask mentor
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}