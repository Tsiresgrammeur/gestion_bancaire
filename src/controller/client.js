const clientService = require('../service/client');

class clientController {

  async getClients(req,res)
  {
    try{
      const clients = await clientService.getClients();
      res.status(201).json(clients);
    }

    catch(err){
      console.error(err);
    }

  }
  
  async getOneClient(req,res)
  {
    try{
      const client = await clientService.getOneClient(req.params.id);
      res.status(201).json(client);
    }

    catch(err){
      console.error(err);
    }

  }

  async createClient(req,res) {
    try {
      const id = await clientService.createClient(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteClient(req,res) {

    try{
      const id=await clientService.deleteClient(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateClient(req,res) 
  {
    try{
      const id = await clientService.updateClient(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new clientController();
