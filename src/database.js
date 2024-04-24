const mongoose = require('mongoose');

const uri = 'mongodb+srv://user_1:12345@cluster1.gfwor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = {useNewUrlParser: true,  useUnifiedTopology: true};

mongoose.connect(uri, options).then(
    () => { console.log('Conectado a la BD') },
    err => { console.log(err) } 
);

module.exports=mongoose