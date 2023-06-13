export const httpDateToClient = (date: string) => {
  const dateTime = new Date(date);

  const options = {
    timeZone: "America/Sao_Paulo",
  };

  const brazilDateTime = dateTime.toLocaleString("pt-BR", options);
  return brazilDateTime;
};
