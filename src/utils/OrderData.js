export const OrderData = (data, orderBy) =>{
  return data.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return 0;
  });
}

