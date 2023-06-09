import { useEffect, useRef, useState } from "react";
import DoorClosed from "../icons/DoorClosed";
import DoorOpen from "../icons/DoorOpen";
import ThermometerHigh from "../icons/ThermometerHigh";
import ThermometerLow from "../icons/ThermometerLow";
import LineGraph from "../components/LineGraph";
import DateRangePicker from "../components/DateRangePicker";
import { getCurrentValues, getDoors, getThermometers, postDoors, postThermometer, updateCurrentValue } from "../services/methods";

/**
 * Autor: Kevin Daniel Flores López
 * Fecha de creación: 08/06/2023
 * Nombre del proyecto: prueba-desarrollo-web-softel
 * Descripcion: Este es un proyecto de prueba para el puesto de desarrollador web jr
 */

function Main() {

  //Estados de los iconos
  const [doorState, setDoorState] = useState(false);
  const [thermometerState, setThermometerState] = useState(false);

  //Estados del historial
  const [dataGraphState, setDataGraphState] = useState([{ id: 0, value: 0, date: "" }]);
  const [dataOriginal, setDataOriginal] = useState([{ id: 0, value: 0, date: "" }]);
  const [historyTitleState, setHistoryTitleState] = useState("");
  const [showGraphState, setShowGraphState] = useState(false);

  useEffect(() => {
    //Obtenemos los valos actuales de los iconos y los seteamos en sus respectivos estados
    getCurrentValues(setDoorState, setThermometerState);
  }, [])

  const orderArray = (startDate, endDate) => {
    //Filtra los datos conforme a las fechas establecidas en el picker
    const dataFiltred = dataOriginal.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= endDate;
    });
    if (dataFiltred.length < 1) {
      setDataGraphState([{ id: 0, value: 0, date: "" }]);
    } else {
      setDataGraphState(dataFiltred);
    }

  }

  return (
    <div style={{ backgroundColor: "#10152b", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#ffffff" }}>
      <div style={{ backgroundColor: "#03303E", width: "80%", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <div style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}>
          <div onClick={() => {
            getDoors(setDataGraphState, setDataOriginal);
            setShowGraphState(true);
            setHistoryTitleState("de la Puerta")
          }}>
            {doorState ?
              (
                <DoorOpen fill={"#FFFBBD"} width={200} height={200} />
              )
              :
              (
                <DoorClosed fill={"#FFFBBD"} width={200} height={200} />
              )}
          </div>
          <button
            style={{ cursor: "pointer", backgroundColor: "#10152b", color: "#FFFFFF", borderRadius: 20, padding: 12, borderWidth: 1, fontSize: 18, margin: 20 }}
            onClick={() => {
              postDoors(doorState, new Date().toISOString().split('T')[0], setDataGraphState);
              updateCurrentValue("door", doorState, new Date().toISOString().split('T')[0], setThermometerState, setDoorState, setDataGraphState);
            }}>{doorState ? ("Cerrar") : ("Abrir")}</button>
        </div>
        <div style={{ cursor: "pointer", display: "flex", flexDirection: "column" }} >
          <div onClick={() => {
            getThermometers(setDataGraphState, setDataOriginal);
            setShowGraphState(true);
            setHistoryTitleState("del Termómetro");
          }}>
            {thermometerState ?
              (
                <ThermometerHigh fill={"#EE4E53"} width={200} height={200} />
              )
              :
              (
                <ThermometerLow fill={"#118AB2"} width={200} height={200} />
              )}
          </div>
          <button
            style={{ cursor: "pointer", backgroundColor: "#10152b", color: "#FFFFFF", borderRadius: 20, padding: 12, borderWidth: 1, fontSize: 18, margin: 20 }}
            onClick={() => {
              postThermometer(thermometerState, new Date().toISOString().split('T')[0], setDataGraphState);
              updateCurrentValue("thermometer", thermometerState, new Date().toISOString().split('T')[0], setThermometerState, setDoorState, setDataGraphState);
            }}>{thermometerState ? ("Frio") : ("Caliente")}</button>
        </div>
        {showGraphState && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>Historico {historyTitleState}</h2>
              <DateRangePicker orderArray={orderArray} />
              <button style={{ cursor: "pointer", backgroundColor: "#10152b", color: "#FFFFFF", borderRadius: 8, padding: 4, borderWidth: 1, fontSize: 12, margin: 10 }} onClick={() => { setShowGraphState(false) }}>Cerrar</button>
            </div>
            <LineGraph data={dataGraphState} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
