const audit_versementService=require('../service/audit_versement');
class audit_versement{

  async getAudit(req,res)
  {
    try{
      const audit = await audit_versementService.getAudit(req.body);
      res.status(200).json(audit);
    }

    catch(err){
      console.error(err);
    }

  }
}

module.exports = new audit_versement();
