const mongoose = require('mongoose');
const { Schema } = mongoose;

const game = new Schema({
    title: { type: String },
    platforms: { type: String },
    genre: { type: String },
    age: { type: String },
    description: { type: String },    
    qualification: { 
        meristation: { type: String },    
        meristationUsers: { type: String },    
        djuegos: { type: String },
        djuegosUsers: { type: String },
        meta: { type: String },
        metaUsers: { type: String }
    },
    keys: { 
        url: { type: String },
        price: { type: String }
    },    
    expansions: { type: Array },
    intro: { type: String },
    trailer: { type: String },
    gameplays: { type: Array },
    publishDate: { type: Date },
    lastUpdate: { type: Date },
})

module.exports = mongoose.model('Game', game);