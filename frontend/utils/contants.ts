export function getDayOfWeek(dateString: string): string {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date: Date = new Date(dateString);
  const dayIndex: number = date.getUTCDay(); // Use getUTCDay() to get the day of the week in UTC
  return daysOfWeek[dayIndex];
}

export function getFormattedDate(dateString: string): string {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date: Date = new Date(dateString);
  const dayIndex: number = date.getUTCDay();
  const day: number = date.getUTCDate();
  const monthIndex: number = date.getUTCMonth();
  const year: number = date.getUTCFullYear();

  const dayOfWeek: string = daysOfWeek[dayIndex];
  const month: string = months[monthIndex];

  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

export function getGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning 👋";
  } else if (currentHour < 18) {
    greeting = "Good afternoon 👋";
  } else {
    greeting = "Good evening 👋";
  }

  return greeting;
}

export function getStartAndEndDate(selectedWeek) {
  const [year, week] = selectedWeek
    ? selectedWeek.split("-W")
    : getCurrentWeek().split("-W"); // Extract year and week number

  // Calculate the date for Monday (start of the week)
  const startDate = new Date(`${year}-01-01`);
  startDate.setDate(
    startDate.getDate() + (parseInt(week, 10) - 1) * 7 - startDate.getDay() + 1
  );

  // Calculate the date for Sunday (end of the week)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    startDate: startDate.toISOString().slice(0, 10), // Start date in 'YYYY-MM-DD' format
    endDate: endDate.toISOString().slice(0, 10), // End date in 'YYYY-MM-DD' format
  };
}

export function getCurrentWeek() {
  const today = new Date();
  const year = today.getFullYear();
  const weekNumber = getWeekNumber(today);
  return `${year}-W${weekNumber}`;
}

function getWeekNumber(date: Date): number {
  // Copy date so don't modify original
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  ) as number;
  // Return week number
  return weekNo;
}
