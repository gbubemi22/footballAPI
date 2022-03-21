<<<<<<< HEAD
const User = require('../models/UserModel')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')



const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({role: 'user'}).select('-password');
  console.log(users)
  res.status(StatusCodes.OK).json({ users: users})
};



const getSingleUser = async (req, res) => {
   const user = await User.findOne({_id: req.params.id}).select('-password');
   if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};


const getAdminAndSuperAdmin = async (req, res) => {
  const admins = await User.find({role: 'admin'}).select('-password')
  res.status(StatusCodes.OK).json({ admin: admins})
  
}





const updateUser = async (req, res) => {
  const { phonenumber, email } = req.body;
  if (!phonenumber || !email ) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { phonenumber , email  },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};


const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });
  
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;
  
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updatePassword,
    getAdminAndSuperAdmin,
    
}




=======
const User = require('../models/UserModel')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')



const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({role: 'user'}).select('-password');
  console.log(users)
  res.status(StatusCodes.OK).json({ users: users})
};



const getSingleUser = async (req, res) => {
   const user = await User.findOne({_id: req.params.id}).select('-password');
   if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};




const updateUser = async (req, res) => {
  const { phonenumber, email } = req.body;
  if (!phonenumber || !email ) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { phonenumber , email  },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};


const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });
  
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;
  
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    updatePassword,
}




>>>>>>> 918a5f82c0ccfb60e88115b12ca4cde95a5e2f87
