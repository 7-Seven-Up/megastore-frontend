export function dateFormatter(date: string | [number, number, number]) {
  let dateObj: Date;

  if (Array.isArray(date)) {
    dateObj = new Date(date[0], date[1] - 1, date[2]);
  } else {
    dateObj = new Date(date);
  }

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
