import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  
  return props.days.map((day) => 
    <ul>
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(props.name)}
      />
    </ul>
  );
}
