const audit_operationService=require('../service/audit_operation');
class audit_operation{

  async getAudit(req,res)
  {
    try{
      const audit = await audit_operationService.getAudit(req.body);
      res.status(200).json(audit);
    }

    catch(err){
      console.error(err);
    }

  }
}

module.exports = new audit_operation();
