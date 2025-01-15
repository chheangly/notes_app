
export const convertDatetime = (dateStr) => {
    if (dateStr) {
        const date = new Date(dateStr);
        const newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const newHours = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
        return `${newDate} ${newHours}`;
    } else {
        return "";
    }
}