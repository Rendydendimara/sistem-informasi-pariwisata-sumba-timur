const asyncErrorHandler = (fn) =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)) // melakukan resolve
      .catch(next); // jika terjadi error
  }


module.exports = { asyncErrorHandler }