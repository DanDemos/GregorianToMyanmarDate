import './App.css';
import { getMyanmarDate } from "mm-cal-js";

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
  const myanmarDay = myanmarDate.monthDay-15;
  const myanmarMonth = myanmarDate.month;
  const myanmarYear = myanmarDate.myanmarYear

  // Convert Myanmar month number to month name string
  const myanmarMonthName = months[parseInt(myanmarMonth)] || myanmarMonth;

  // Determine lunar phase using monthType from myanmarDate
  // [0=Hnaung, 1=Oo]
  let phase;
  if (myanmarDate?.monthType  == 0) {
    phase = 'Waxing';
  } else if (myanmarDate?.monthType  == 1) {
    phase = 'Waning';
  }

  // Format the myanmar date as Lunar Phase, Day, Myanmar MonthName, Myanmar Year
  return `${phase} ${myanmarDay} ${myanmarMonthName}, ${myanmarYear}`;
}

function App() {

  // Example usage:
  const gregorianDate = "31-3-1975";
  const myanmarEquivalent = GregorianToMyanmar(gregorianDate);

  return (
    <div className="App">
      gregorianDate: {gregorianDate}
      <br />
      myanmarEquivalent: {myanmarEquivalent}
      <br />
    </div>
  );
}

export default App;
