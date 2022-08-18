describe('Example Unit Test-case', () => {
    function testSumFunction(a: number, b: number) {
        return a + b;
    }

    it('should equal 4', () => {
        expect(testSumFunction(2, 2)).toBe(4);
    });

    test('also should equal 4', () => {
        expect(testSumFunction(2, 2)).toBe(4);
    });
});
