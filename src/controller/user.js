const userService = require('../service/user');

class UserController {

  async authenticate(req,res)
  {
    var user= await userService.getOneUser(req.body.email)
    if(!user)
    {
      res.status(401).json({
        error: "No user with that email"
      })
    }

    else
    {
      const validPassword= await bcrypt.compare(req.body.password, user.password)
        if(validPassword)
        {
          return jwt.sign(user, SECRET, (error, token) => {
            res.status(200).json({token})
          })
        }
        else
        {
          return res.status(401).json({success: false,message:'password does not match'})
        }
      }

  }



  async getUsers(req,res)
  {
    try{
      const users = await userService.getUsers();
      res.status(201).json(users);
    }

    catch(err){
      console.error(err);
    }

  }

  async getOneUser(req, res)
  {
    try{
      const user = await userService.getOneUser(req.params.id);
      res.status(201).json(user);
    }

    catch(err){
      console.error(err);
    }
  }

  createUser = async (req,res) => {

    try {
      const id = await userService.createUser(req.body);
      if(id)
        res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteUser(req,res) {

    try{
      const id=await userService.deleteUser(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateUser(req,res) 
  {
    try{
      const id = await userService.updateUser(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}


module.exports = new UserController();
