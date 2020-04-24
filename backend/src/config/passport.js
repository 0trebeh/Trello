const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
	usernameField: 'name'
}, async (name, password, done) => {
	const user = await User.findOne({name: name});
	if (!user) {
		return done(null, false, {message: 'Usuario no encontrado'}); // Este Callback done sirve para terminar el proceso de autentificacion, en este caso con un mensaje de error
	} else {
		const match = await user.matchPassword(password);
		if (match) {
			return done(null, user);
		}else {
			return done(null, false, {message: 'Contraseña incorrecta'});
		}
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
		done(err, user);
	});
});