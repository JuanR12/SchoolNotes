 const express = require('express')

const morgan = require('morgan')
const cors = require('cors')



const app = express()


require('./database')


app.use(morgan('dev'))


app.use(express.json()); 
//application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origen: '*' }))

app.use('/administrador', require('./routes/Jefe.route'))
app.use('/profesor', require('./routes/empleado.route'))



//Puerto

app.set('puerto', process.env.PORT || 4000); 
app.listen(app.get('puerto'), function () { 
    console.log('Example app listening on port'+ app.get('puerto')); 
});