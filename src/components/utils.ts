export function generateRandomKey() {
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = Date.now();
    const key = `${randomNum}-${uniqueId}`;
    return key;
}