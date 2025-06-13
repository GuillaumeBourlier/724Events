import { getMonth } from ".";

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const date = new Date("2022-01-01");
            expect(getMonth(date)).toBe("janvier");
        });
        it("the function return décembre for 2022-12-08 as date", () => {
        const date = new Date("2022-12-08");
            expect(getMonth(date)).toBe("décembre");
        });
    });
})

