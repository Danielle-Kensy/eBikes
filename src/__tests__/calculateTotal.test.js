import { calculateTotal } from "../utils/calculateTotal";

describe("calculateTotal", () => {
  it("should calculate the correct total of the order", () => {
    const purchaseListMock = [
      {
        props: {
          bike: {
            id: 1,
            model: "Aro 12",
            price: 100,
            brand: "Bike 1",
            marches: 1,
            img: "https://i.imgur.com/q3n3g6a.jpg",
            categorys: ["mountain"],
          },
        },
        removeItemFromCart: jest.fn(),
        showRemoveButton: true,
      },
      {
        props: {
          bike: {
            id: 1,
            model: "Aro 12",
            price: 100,
            brand: "Bike 1",
            marches: 1,
            img: "https://i.imgur.com/q3n3g6a.jpg",
            categorys: ["mountain"],
          },
        },
      }
    ];

    const total = calculateTotal(purchaseListMock);
    expect(total).toBe(200);
  });

  it("shouldn't calculate the total of the order with a negative price", () => {
    const purchaseListMock = [
      {
        props: {
          bike: {
            id: 1,
            model: "Aro 12",
            price: -100,
            brand: "Bike 1",
            marches: 1,
            img: "https://i.imgur.com/q3n3g6a.jpg",
            categorys: ["mountain"],
          },
        },
        removeItemFromCart: jest.fn(),
        showRemoveButton: true,
      },
      {
        props: {
          bike: {
            id: 1,
            model: "Aro 12",
            price: -100,
            brand: "Bike 1",
            marches: 1,
            img: "https://i.imgur.com/q3n3g6a.jpg",
            categorys: ["mountain"],
          },
        },
        removeItemFromCart: jest.fn(),
        showRemoveButton: true,
      }
    ];

    const total = calculateTotal(purchaseListMock);
    expect(total).toBe(0);
  });
});