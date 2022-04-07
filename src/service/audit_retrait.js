const audit_retraitDAO= require('../dao/audit_retrait')

class audit_retraitService {

  async getAudit(criteria)
  {
    const { first_date, second_date } = criteria;
    return await audit_retraitDAO.getAudit(first_date, second_date);
  }
}

module.exports = new audit_retraitService()
