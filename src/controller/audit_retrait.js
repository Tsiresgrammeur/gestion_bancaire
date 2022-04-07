const audit_retraitService=require('../service/audit_retrait');
class audit_retrait{

  async getAudit(req,res)
  {
    try{
      const audit = await audit_retraitService.getAudit(req.body);
      res.status(200).json(audit);
    }

    catch(err){
      console.error(err);
    }

  }
}

module.exports = new audit_retrait();
