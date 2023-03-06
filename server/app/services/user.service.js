const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../../config/jwt.config');
const User = require('../models/user.model');


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('222456991365-f3ltlkb9utlauipdaq0shode452uh39i.apps.googleusercontent.com');


exports.login = ({ username, password }) => {
	console.log("hi")
	return new Promise(async (resolve, reject) => {
		console.log("checking for user:")
		const user = await User.findOne({ username });
		console.log("user: ", user)
		if (user && bcrypt.compareSync(password, user.hash)) {
			const { hash, ...userWithoutHash } = user.toObject();
			const token = jwt.sign({ sub: user.id }, jwtConfig.secret);
			resolve({ ...userWithoutHash, token });
		}
		console.log("user check failed:")
		resolve({ram: "hello" });
	})
}

exports.googleUserLogin=async ({idToken,client_id}) =>{
	const ticket = await client.verifyIdToken({
		idToken: idToken,
		audience:client_id,  // Your client ID here
	  });
	  const payload = ticket.getPayload();
	  console.log(payload)
	  return payload;
}

exports.getAll = async () => {
	return await User.find().select('-hash');
}

exports.getById = async (id) => {
	return await User.findById(id).select('-hash');
}

exports.getByuserName = async (username) => {
	return await User.findOne({ username: username });
}

exports.create = async (userParam) => {
	// validate
	if (await User.findOne({ username: userParam.username })) {
		throw 'Username "' + userParam.username + '" is already taken';
	}
	const user = new User(userParam);
	// hash password
	if (userParam.password) {
		user.hash = bcrypt.hashSync(userParam.password, 10);
	}
	// save user
	await user.save();
}

exports.update = async (id, userParam) => {
	const user = await User.findById(id);
	// validate
	if (!user) throw 'User not found';
	if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
		throw 'Username "' + userParam.username + '" is already taken';
	}
	// hash password if it was entered
	if (userParam.password) {
		userParam.hash = bcrypt.hashSync(userParam.password, 10);
	}
	// copy userParam properties to user
	Object.assign(user, userParam);
	await user.save();
}

exports._delete = async (id) => {
	await User.findByIdAndRemove(id);
}