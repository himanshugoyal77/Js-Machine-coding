export const generateGrid = (size) => {
  const list = [];
  for (let i = 1; i <= (size * size) / 2; i++) {
    list.push(i);
  }

  const shuffle = [...list, ...list];
  shuffle.sort(() => Math.random() - 0.5);

  return shuffle;
};
