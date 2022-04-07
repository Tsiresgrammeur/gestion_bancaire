const retraitService = require('../service/retrait');

class retraitController {

  async getRetraits(req,res)
  {
    try{
      const retraits = await retraitService.getRetraits();
      res.status(201).json(retraits);
    }

    catch(err){
      console.error(err);
    }

  }
  
  async getOneRetrait(req,res)
  {
    try{
      const retrait = await retraitService.getOneRetrait(req.params.id);
      res.status(201).json(retrait);
    }

    catch(err){
      console.error(err);
    }

  }

  async createRetrait(req,res) {
    try {
      const id = await retraitService.createRetrait(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteRetrait(req,res) {

    try{
      const id=await retraitService.deleteRetrait(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateRetrait(req,res) 
  {
    try{
      const id = await retraitService.updateRetrait(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new retraitController();
