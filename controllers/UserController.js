const UserService = require("../services/UserService");

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const userExists = await UserService.findUserByEmail(userData.email);
    if(userExists){
    return res.status(409).json({
      message: "User already exists"
    });
    }
    const addUser = await UserService.createUser(userData);
    if(addUser){
        return res.status(201).json({
            data: addUser,
            message: "user added"
        })
    } else {
        res.status(409).send('Failed to save')
    }
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.queryUsers();
    if (users) {
      return res.status(200).json({
        data: users,
        message: "users retrieved",
      });
    } else {
      res.status(404).send("No data found");
    }
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserService.findUserById(req.params.id);
    if (!user) return res.status(404).send("no user found");
    return res.status(200).json({ data: user });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async(req, res, next) => {
    try {
        const userDetails = req.body;
        const userExists = await UserService.findUserById(req.params.id);
        if(!userExists) return res.status(409).send('user not found');
        await UserService.updateUser(userDetails, req.params.id);
        return res.status(201).json({
            message:" User updated"
        })
    } catch (error) {
        return next(error);
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const userExists = await UserService.findUserById(req.params.id);
        if(!userExists) return res.status(409).send('user not found');
        await UserService.deleteUser(req.params.id);
        return res.status(201).json({
            message:" User deleted"
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
