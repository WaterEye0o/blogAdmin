module.exports = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Mehods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS')

  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
}