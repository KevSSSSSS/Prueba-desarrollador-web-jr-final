import React, { useState } from 'react';

const DateRangePicker = (props) => {
  const orderArray = props.orderArray;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);

    //Hacemos una verificacion para asignar las fechas
    if (!startDate) {
      setStartDate(selectedDate);
    } else if (!endDate) {
      if (selectedDate >= startDate) {
        setEndDate(selectedDate);
        //aqui ordenamos el array entre las fechas
        orderArray(startDate, selectedDate);
      } else {
        setStartDate(selectedDate);
        setEndDate(null);
      }
    } else {
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  return (
    <div style={{display: "flex"}}>
      <div style={{marginRight: 10}}>
        <label htmlFor="start-date">Primera fecha: </label>
        <input
          type="date"
          id="start-date"
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label htmlFor="end-date">Segunda fecha: </label>
        <input
          type="date"
          id="end-date"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;