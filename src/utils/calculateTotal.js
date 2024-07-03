export const calculateTotal = (purchaseList) => {
    let total = 0;
    purchaseList.forEach((item) => {
        if (item.props.bike?.price < 0) {
            console.log("Valor inválido");
            return 0;
        }
      total += item.props.bike?.price ?? 0;
    });
    return total;
  };