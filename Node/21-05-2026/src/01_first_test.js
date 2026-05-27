const getEnrollmentMessage =(seat)=>{
    if(seat === 0){
        return "Sold out"
    }
    else if(seat === 1 ){
        return "Only one seat available"
    }
    else{
        return `${seat} seats available`
    }
} 
const getCourseAccessMessage = (access)=>{
    if(access){
        return "Access Granted"
    }
    else{
        return "Unauthorized Access"
    }
}

module.exports = { getEnrollmentMessage ,getCourseAccessMessage};