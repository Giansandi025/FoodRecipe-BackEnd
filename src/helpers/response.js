module.exports = {
  success: (res, data, status, message, pagination) => {
    if (pagination) {
      res.json({
        code: 200,
        status,
        data,
        error: null,
        message,
        pagination
      })
    } else {
      res.json({
        code: 200,
        status,
        data,
        error: null,
        message
      })
    }
  },
  failed: (res, error, status, message) => {
    res.json({
      code: 500,
      status,
      data: null,
      error,
      message
    })
  },
  successWithToken: (res, token, data, status, message) => {
    res.json({
      status,
      token,
      data,
      message
    })
  }
}
