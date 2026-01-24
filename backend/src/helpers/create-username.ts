export const generateUsername = (firstName: string, lastName: string) => {
    
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const base = `${firstName}_${lastName}`
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_');


    return `${base}${randomNumber}`;
}
