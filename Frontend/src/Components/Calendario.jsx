import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/Calendar.css";
import es from "date-fns/locale/es";

function Calendario({ fechasSeleccionadas }) {
  const [monthsToShow, setMonthsToShow] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );

  const startDateString = fechasSeleccionadas.startDate;
  const parts = startDateString.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  const startDate = new Date(year, month, day);

  const endDateString = fechasSeleccionadas.endDate;
  const partsDos = endDateString.split('-');
  const yearDos = parseInt(partsDos[0]);
  const monthDos = parseInt(partsDos[1]) - 1;
  const dayDos = parseInt(partsDos[2]);
  const endDate = new Date(yearDos, monthDos, dayDos);

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
          ranges={[{ startDate, endDate, key: 'selection' }]}
          onChange={() => { }}
          rangeColors={["#01A9D6"]}
          showDateDisplay={false}
          direction="horizontal"
          months={monthsToShow}
          locale={es}
          minDate={new Date()}
          disabled
        />
      </div>
    </div>
  );
}

export default Calendario;
