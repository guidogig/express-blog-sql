export const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
  });
};

export const notFound = (req, res, next) => {
  res.status(404);
  res.send({
    errore: "Not Found",
    message: "Pagina non trovata",
  });
};
