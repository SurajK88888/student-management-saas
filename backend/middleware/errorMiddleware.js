// Centralized Error Handling
// In express function with 4 parameter are global error handler.
export function errorHandler(err, req, res, next) {
//   console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
}
