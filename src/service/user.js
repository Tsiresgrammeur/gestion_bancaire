const userDAO = require('../dao/user');
const SECRET='any secrets';
const jwt = require('jsonwebtoken');


class UserService 
{
  authenticate(username)
  {
    return userDAO.authenticate(username);
  }
  getUsers()
  {
    return userDAO.getUsers();
  }

  getOneUser(id)
  {
    return userDAO.getOneUser(id);
  }
  async createUser(user)
  {
    const {username,user_id,name,password,type} = user;
    return await userDAO.createUser(username,user_id,name,password,type);
  }

  deleteUser(idUser)
  {
    return userDAO.deleteUser(idUser);
  }

  updateUser(username,user)
  {
    const {user_id,name,password,type} = user;
    return userDAO.updateUser(username,user_id,name,password,type);
  }
}

module.exports = new UserService();
