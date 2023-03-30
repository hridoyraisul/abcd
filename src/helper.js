export function formattedDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${month}, ${year}`;
}
function getOrdinalSuffix(day){
    const suffixes = ["th", "st", "nd", "rd"];
    const ones = day % 10;
    const tens = Math.floor((day % 100) / 10);
    return ones === 1 && tens !== 1 ? suffixes[1] : ones === 2 && tens !== 1 ? suffixes[2] : ones === 3 && tens !== 1 ? suffixes[3] : suffixes[0];
}
