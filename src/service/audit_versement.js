const audit_versementDAO= require('../dao/audit_versement')

class audit_versementService {

  async getAudit(criteria)
  {
    const { first_date, second_date } = criteria;
    return await audit_versementDAO.getAudit(first_date, second_date);
  }
}

module.exports = new audit_versementService()
