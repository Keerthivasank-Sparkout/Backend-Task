const { getCoursePriceLabel, buildCourseMeta } = require("../src/02_second_test")
describe("getCoursePriceLable", () => {
    test("return 'Free' when the price is 0", () => {
        const result = getCoursePriceLabel(0)
        expect(result).toBe("Free")
    })
    test("return 'Invalid price' when the price is Negative", () => {
        const result = getCoursePriceLabel(-1)
        expect(result).toBe("Invalid Price")
    })
    test("return 'price' when the price is greter than 0", () => {
        const result = getCoursePriceLabel(10)
        expect(result).toBe("₹10")
    })
    test("return 'null' when the price is null", () => {
        const result = getCoursePriceLabel(null)
        expect(result).toBeNull()
    })
})
describe("buildCourseMeta", () => {
    test("return same the output give by user", () => {
        const result = buildCourseMeta("Node Testing", ["Unit testing", "Devops"])
        expect(result).toEqual({
            title: "Node Testing",
            lessons: ["Unit testing", "Devops"],
            totalLessons: 2,
            firstLesson: "Unit testing",
            hasLessons: true,
            errors:[]
        })
    })
    test("want to check the lession array to contain the lession", () => {
        const result = buildCourseMeta("Node Testing", ["Unit testing", "Devops"])
        expect(result.lessons).toContain("Devops")
    })
    test("want to check the lession array size", () => {
        const result = buildCourseMeta("Node Testing", ["Unit testing", "Devops"])
        expect(result.lessons).toHaveLength(2)
    })
})