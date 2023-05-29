export function getFormatedDateTime(date: string | Date) {
  const parsedDate = new Date(date)

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();
  const hour = String(parsedDate.getHours()).padStart(2, "0");
  const minute = String(parsedDate.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} - ${hour}:${minute}`;
  return formattedDateTime
}
