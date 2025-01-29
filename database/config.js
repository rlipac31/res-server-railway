const mongoose = require('mongoose');

const dbConections = async () => {


    try {
        
       await mongoose.connect(process.env.MONGODB_CONECCTION);
        console.log('se conecto');
    } catch (error) {
        console.log(error);
        throw new Error('EError    al hora de inniciaar la baase de  datoos');
    }
}



module.exports = {
    dbConections
}