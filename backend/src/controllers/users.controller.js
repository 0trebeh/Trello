const userCtrl = {};

const User = require('../models/User');

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ 
            name: username, 
            email, 
            password
        });
        await newUser.save();
        res.json('User register');

    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

userCtrl.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({name: username});
        if (user) {
            if (password == user.password) {
                res.json(user);
            } else {
                res.status(400).json('incorrect password');
            }
        } else {
            res.status(400).json('user not found');
        }
        
    } catch (e) {
        console.log(e)
        res.json(e.errmsg);
    }
};

userCtrl.updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(password.length)
    if(password.length >= 4){
        await User.findByIdAndUpdate(req.params.id,{
            name: username, 
            email, 
            password
        });
        res.json('User updated');
    } else if ( password.length == 0 ) {
        await User.findByIdAndUpdate(req.params.id,{
            name: username, 
            email
        });
        res.json('User updated');
    }else{
        res.json('The password has to be greater than or equals to four caract');
    }
    
}

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json('User deleted');
}

module.exports = userCtrl;