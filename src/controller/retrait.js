const retraitService = require('../service/retrait');

class retraitController {

  async getRetraits(req,res)
  {
    try{
      const retraits = await retraitService.getRetraits();
      res.status(201).json(retraits);
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }

  }
  
  async getOneRetrait(req,res)
  {
    try{
      const retrait = await retraitService.getOneRetrait(req.params.id);
      res.status(201).json(retrait);
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }

  }

  async createRetrait(req,res) {
    try {
      const id = await retraitService.createRetrait(req.body);
      if(id)
      res.status(201).json({success: true}); 
      else
      res.status(409).json({success: false, message: "solde insuffisant"}); 
    }
    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }
  }

  async deleteRetrait(req,res) {

    try{
      const id=await retraitService.deleteRetrait(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }
  }

  async updateRetrait(req,res) 
  {
    try{
      const id = await retraitService.updateRetrait(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
      else
      {
        res.status(409).json({success: false, message: "solde insuffisant"});

      }
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }
  }



}

module.exports = new retraitController();
