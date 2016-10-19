module.exports = function(app, directory){
  app.get('/*', function(req, res){
    res.sendFile(directory + "/public/views/index.html");
  });
};
