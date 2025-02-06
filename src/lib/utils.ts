export function pad(num: number, size: number) {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}