const { getEnrollmentMessage,getCourseAccessMessage } = require("../src/01_first_test")

describe("getEnrollmentMessage", () => {
    test("returns 'Sold out' when seat count is 0", () => {
        const result = getEnrollmentMessage(0)
        expect(result).toBe("Sold out")
    })
    test("returns 'Only one seat available' when seat count is 1", () => {
        const result = getEnrollmentMessage(1)
        expect(result).toBe("Only one seat available")
    })
    test("returns more than one seat available when seat count is greater than 1", () => {
        const result = getEnrollmentMessage(10)
        expect(result).toBe("10 seats available")
    })
})
describe("getCourseAccessMessage",()=>{
    test("returns 'Access Granted' when the access is true",()=>{
        const result = getCourseAccessMessage(true);
        expect(result).toBe("Access Granted")
    })
    test("returns 'Unauthorized Access' when the access is false",()=>{
        const result = getCourseAccessMessage(false);
        expect(result).toBe("Unauthorized Access")
    })
})