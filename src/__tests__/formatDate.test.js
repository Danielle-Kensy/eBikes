import { formatDate } from "../utils/formatDate";

describe("formatDate", () => {
  it("should format the date correctly", () => {
    const date = "2024-06-24T20:24:11.000Z";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("24/06/2024");
  });

  it("should format the date correctly without time", () => {
    const date = "2024-06-24";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("24/06/2024");
  });

  it("should return an empty string if the date is invalid", () => {
    const date = "data inválida";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Formato de data inválido");
  });

});