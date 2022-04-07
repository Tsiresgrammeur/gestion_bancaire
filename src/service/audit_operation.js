
const audit_operationDAO= require('../dao/audit_operation')

class audit_operationService {

  async getAudit(criteria)
  {
    const { first_date, second_date } = criteria;
    return await audit_operationDAO.getAudit(first_date, second_date);
  }
}

module.exports = new audit_operationService()
