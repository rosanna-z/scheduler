import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  return props.map((day) => {
    // <ul>
    //   <DayListItem
    //     key={day.id}
    //     name={day.name}
    //     spots={day.spots}
    //     selected={day.name === props.day}
    //     setDay={day.setDay}
    //   />
    // </ul>;
  });
}
