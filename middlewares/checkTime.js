export const checkTime = (req, res, next) => {
  const currHour = new Date().getHours();

  if (currHour >= 11 || currHour < 7) {
    return res.send("Meglio dormire!");
  }

  next();
};
