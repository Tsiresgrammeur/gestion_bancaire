const db= require('../../db/db');

class userDAO {

  async getUsers()
  {
    return await db.select().table('user');
  }

  async getOneUser(id)
  {
    return await db('user').where('username',id).first();

  }

  async createUser(username,user_id,name,password,type)
  {
    await db('user').insert({
      username,
      user_id,
      name,
      password,
      type
    });

    return username;
  }

  async deleteUser(id)
  {
   return db('user').where('username',id).del();
  }

  async updateUser(username,user_id,name,password,type)
  {
    if(password)
    {
      return db('user').where({ username: username}).update({
        user_id,
        name,
        password,
        type
      });
    }
    else
    {
      return db('user').where({ username: username}).update({
        username,
        user_id,
        name,
        type
      });
    }
  }

}

module.exports = new userDAO();
