export const convertFloat = (number: number | undefined) => {
    if (!number) return;
    if (!Number.isInteger(number)) {
        return number.toFixed(3);
    }
    return number.toString();
}