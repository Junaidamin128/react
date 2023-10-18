export default (req, res, next) => {
  if (true) {
    res.status(403).json({ msg: "Not aunty" });
  }
  next();
};
