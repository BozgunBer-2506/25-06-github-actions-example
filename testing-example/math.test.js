const {addieren, subtrahieren, multiplizieren, dividieren} = require("./math");


test("addiert 7 + 2, ergebnis soll 9 sein", () => {
    expect(addieren(7,2)).toBe(9);
})

test("addiert 7 + 2, soll NICHT 10 ergeben", () => {
    expect(addieren(7,2)).not.toBe(10);
})

test("subtrahiert 7 - 2, ergebnis soll 5 sein", () => {
    expect(subtrahieren(7,2)).toBe(5);
})

test("multipliziert 7 * 2, ergebnis soll 14 sein", () => {
    expect(multiplizieren(7,2)).toBe(14);
})

test("dividiert 7 / 2, ergebnis soll 3.5 sein", () => {
    expect(dividieren(7,2)).toBe(3.5);
})

test("dividiert 7 / 0, soll einen Fehler werfen", () => {
    expect(() => dividieren(7,0)).toThrow("Division durch 0 ist nicht erlaubt")
})