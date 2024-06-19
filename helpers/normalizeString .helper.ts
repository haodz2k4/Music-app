import removeAccents from 'remove-accents';


export const normalizeString = (str: string): string =>{
    return removeAccents(str)
        .replace(/[^a-zA-Z0-9\s]/g, '') // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, ' ') // Loại bỏ khoảng trắng dư thừa
        .trim()
}