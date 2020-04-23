const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
    {
        board: { type: String, required: true},
        user: [{ type: Object/*, required: true*/}],
        List: [{ type: Object }]
    }, {
        timestamps: true
    });

module.exports = model('Board', boardSchema);