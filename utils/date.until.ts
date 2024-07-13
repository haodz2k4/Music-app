

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