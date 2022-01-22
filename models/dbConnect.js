const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://hduy:Abc123@cluster0.t6nuq.mongodb.net/newWeb?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true} )
mongoose.connect("mongodb://localhost/k12nodemy_project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = mongoose;