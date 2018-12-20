export function timestampToDate(stamp) {
  return new Date(stamp).getFullYear() +
    "-" +
    (new Date(stamp).getMonth() + 1) +
    "-" +
    new Date(stamp).getDate();
}
