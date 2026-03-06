function apiResponse(res, statusCode, message, data = null) {
  res.status(statusCode).json({
    success: statusCode < 400,
    message: message,
    data: data,
  });
}

export default apiResponse;
