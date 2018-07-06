// const sum = require('./sum.js')
import sum from "./sum.js"
test("adds 1 + 2  equal 3",() => {
    expect(sum(1,2)).toBe(3)
})
test("object assign",() => {
    var a = {"a":1}
    a.b = 2
    expect(a).toEqual({"a":1,"b":2})
})
test("two positive number is not zero",()=>{
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            expect(i+j).not.toBe(0)
            
        }
        
    }
})
test("null",() => {
    expect(null).toBeNull()
})