const audit_CompteService=require('../service/audit_compte');
class audit_Compte{

  async getAudit(req,res)
  {
    try{
      const audit = await audit_CompteService.getAudit(req.body);
      res.status(200).json(audit);
    }

    catch(err){
      console.error(err);
    }

  }
}

module.exports = new audit_Compte();
