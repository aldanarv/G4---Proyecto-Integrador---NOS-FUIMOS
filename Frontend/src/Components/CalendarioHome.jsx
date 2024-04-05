import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/Calendar.css";
import es from "date-fns/locale/es";

function CalendarioHome({ onDateSelect }) {
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  const [monthsToShow, setMonthsToShow] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );

  const now = new Date(); // Fecha y hora actual en el huso horario local
  const offset = now.getTimezoneOffset() * 60000; // Offset en milisegundos

  // Crear las fechas para startDate y endDate ajustadas al huso horario de Argentina (UTC-3)
  const startDate = new Date(now - offset - (3 * 60 * 60 * 1000)); // Restar 3 horas en milisegundos
  const endDate = new Date(now - offset - (3 * 60 * 60 * 1000)); // Restar 3 horas en milisegundos

  const [selectionRange, setSelectionRange] = useState({
    startDate,
    endDate,
    key: "selection",
  });
  console.log(selectionRange.startDate?.toISOString().split("T").shift());
  console.log(selectionRange.endDate?.toISOString().split("T").shift());

  useEffect(() => {
    const reservationsFromServer = [
      /*
      { start: "2024-04-12", end: "2024-04-18" },
      { start: "2024-04-27", end: "2024-04-30" },
      */
    ];

    const disabledDates = [];

    reservationsFromServer.forEach((reservation) => {
      const { start, end } = reservation;
      const startDate = new Date(start + "T00:00:00-03:00");

      const endDate = new Date(end + "T00:00:00-03:00");

      const currentDate = startDate;
      while (currentDate <= endDate) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    setFechasOcupadas(disabledDates);
  }, []);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    onDateSelect(ranges.selection);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMonthsToShow(1);
      } else {
        setMonthsToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="calendario-container">
      <div className="calendario-card">
        <DateRange
          ranges={[selectionRange]}
          onChange={handleSelect}
          rangeColors={["#005B8D"]}
          disabledDates={fechasOcupadas}
          showDateDisplay={false}
          months={monthsToShow}
          direction="horizontal"
          locale={es}
          minDate={new Date()}
        />
      </div>
    </div>
  );
}

export default CalendarioHome;
