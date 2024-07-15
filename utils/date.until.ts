

export const isValidateBirthDate = (date: string): boolean =>{ 

    const currentDate = new Date();
    const birthDate = new Date(date);

    if(birthDate > currentDate){
        return false;
    }
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();
    let age = currentDate.getFullYear() - birthDate.getFullYear(); 

    if(monthDifference < 0 || (monthDifference ===0 && dayDifference < 0)){
        age--;
    }
    if(age > 120){
        return false;
    }

    return true;

}
interface ToDay {start?: Date, end?: Date}
export const getDate = (type: string): ToDay => {
    const today = new Date();
    switch (type) {
        case 'day':
            const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // 0h (12h đêm) hôm nay
            const endDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0); // 0h (12h đêm) ngày mai

            return { start: startDay, end: endDay };
        case 'week':
            const startWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0); // Ngày đầu tuần (Chủ Nhật là ngày 0)
            const endWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7, 0, 0, 0); // Ngày cuối tuần

            return { start: startWeek, end: endWeek };
        case 'month':
            const startMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0); // Ngày đầu tiên của tháng hiện tại
            const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1, 0, 0, 0); // Ngày đầu tiên của tháng sau - chỉnh lại thành 0

            return { start: startMonth, end: endMonth };
        case 'year':
            const startYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0); // Ngày đầu năm
            const endYear = new Date(today.getFullYear() + 1, 0, 1, 0, 0, 0); // Ngày đầu năm sau

            return { start: startYear, end: endYear };
        default:
            return { start: today, end: today }; // Mặc định trả về ngày hôm nay nếu type không hợp lệ
    }
};

