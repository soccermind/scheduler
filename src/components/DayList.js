import React from "react";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  const parsedDayList = props.days && props.days.map(day => 
    <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />)
  return(
    <ul>
      {parsedDayList && parsedDayList.length ? parsedDayList : "This list is empty"}
    </ul>
  );
}