export const saveLocalStorage = (item: any) => {
  const test = JSON.parse(localStorage.getItem("prod") || "[]");
  test.push(item);
  localStorage.setItem("prod", JSON.stringify(test));
};

export const deleteDataLocalStorage = (id: number) => {
  let prod = JSON.parse(localStorage.getItem("prod") || "[]");
  prod = prod.filter(
    (item: { id: number;}) => item.id !== id
  );
  localStorage.setItem("prod", JSON.stringify(prod));
  window.location.reload();
};
