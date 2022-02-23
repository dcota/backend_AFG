const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 50000,
    socketTimeoutMS: 45000,
    autoIndex: false
};

// -- Conecção inicial à base de dados
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('LINK DA CONEXÃO À DB', options).then(() => { 
    console.log('Conecção á BD feita com sucesso.');
    }).catch((err) => {
    console.log('Erro ao conectar-se à base de dados.');
    });

module.exports.readAndWrite = mongoose;
 
