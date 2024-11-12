import { useEffect, useState } from 'react';
import './App.css';
import { getMyanmarDate } from "mm-cal-js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
}

let months = [
  "LeapWaso",
  "Tagu",
  "Kason",
  "Nayon",
  "Waso",
  "Wagaung",
  "Tawthalin",
  "Thadingyut",
  "Tazaungmon",
  "Nadaw",
  "Pyatho",
  "Tabodwe",
  "Tabaung"
]

// Function to convert Gregorian date to Myanmar date
function GregorianToMyanmar(gregorianDate) {
  // Split the Myanmar date input into day, month, and year, converting each to a number
  const [day, month, year] = gregorianDate.split('-').map(Number);
  const date = new Date(year, month - 1, day); // Month index in JS Date is zero-based

  // Convert gregorian date to myanmar date using mm-cal-js library
  const myanmarDate = getMyanmarDate(date)
  if (!myanmarDate) throw new Error("Invalid date conversion.");

  // Extract Myanmar day, month and year
  const myanmarDay = myanmarDate.monthDay > 15 ? myanmarDate.monthDay - 15 : myanmarDate.monthDay;
  const myanmarMonth = myanmarDate.month;
  const myanmarYear = myanmarDate.myanmarYear

  // Convert Myanmar month number to month name string
  const myanmarMonthName = months[parseInt(myanmarMonth)] || myanmarMonth;

  // Determine lunar phase using monthType from myanmarDate
  // [0=Hnaung, 1=Oo]
  let phase;
  if (myanmarDate?.monthType == 0) {
    phase = 'Waxing';
  } else if (myanmarDate?.monthType == 1) {
    phase = 'Waning';
  }

  // Format the myanmar date as Lunar Phase, Day, Myanmar MonthName, Myanmar Year
  return `${phase}-${myanmarDay}, ${myanmarMonthName}, ${myanmarYear}`;
}

function App() {
  const [gregorianDate, setGregorianDate] = useState(new Date());
  const [myanmarDate, setMyanmarDate] = useState("");

  useEffect(() => {
    console.log(gregorianDate, "gregorianDate.replace('-')")
    let mmDate = GregorianToMyanmar(formatDate(gregorianDate));
    setMyanmarDate(mmDate)
  }, [gregorianDate])


  return (
    <div className="App">
      myanmarEquivalent: {myanmarDate}
      <br />
      gregorianDate:  <DatePicker selected={gregorianDate} onChange={(date) => setGregorianDate(date)} />
      <br />
    </div>
  );
}

export default App;
