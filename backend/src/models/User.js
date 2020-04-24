const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true},
	password: { type: String, required: true},
	date: { type: Date, default: Date.now}
});

UserSquema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hash(password, salt);
	return hash;
};

UserSquema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);