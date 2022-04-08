
const versementService = require('../service/versement');

class versementController {

  async getVersements(req,res)
  {
    try{
      const versements = await versementService.getVersements();
      res.status(201).json(versements);
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }

  }
  
  async getOneVersement(req,res)
  {
    try{
      const versement = await versementService.getOneVersement(req.params.id);
      res.status(201).json(versement);
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }

  }

  async createVersement(req,res) {
    try {
      const id = await versementService.createVersement(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }
  }

  async deleteVersement(req,res) {

    try{
      const id=await versementService.deleteVersement(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }
  }

  async updateVersement(req,res) 
  {
    try{
      const id = await versementService.updateVersement(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      res.status(409).json({success: false, message: "check existant"}); 
    }
  }



}

module.exports = new versementController();
