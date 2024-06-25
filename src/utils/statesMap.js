export const statesMap = (state) => {
  switch (state) {
    case "pending":
      return (
        <button
          style={{
            backgroundColor: "#e2ba6b",
            height: "30px",
            marginBottom: 0,
            width: "100px",
          }}
        >
          Pendente
        </button>
      );
    case "paid":
      return (
        <button
          style={{
            backgroundColor: "#98e48b",
            height: "30px",
            marginBottom: 0,
            width: "100px",
          }}
        >
          Pago
        </button>
      );
    case "cancelled":
      return (
        <button
          style={{
            backgroundColor: "#e27d6b",
            height: "30px",
            marginBottom: 0,
            width: "100px",
          }}
        >
          Cancelado
        </button>
      );
      default:
        return (
          <button
            style={{
              backgroundColor: "#6bc6e2",
              height: "30px",
              marginBottom: 0,
              width: "100px",
            }}
          >
            Status não encontrado
          </button>
        );
  }
};
