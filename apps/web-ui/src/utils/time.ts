export function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${padZeroes(minutes, 2)}:${padZeroes(seconds % 60, 2)}`;
}

function padZeroes(n: number, maxDigits: number): string {
  let nStr = n.toString(10);
  const numZeroes = maxDigits - nStr.length;
  for (let i = 0; i < numZeroes; i++) {
    nStr = "0" + nStr;
  }
  return nStr;
}
