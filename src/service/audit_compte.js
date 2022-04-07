const audit_CompteDAO= require('../dao/audit_compte')

class audit_CompteService {

  async getAudit(criteria)
  {
    const { first_date, second_date } = criteria;
    return await audit_CompteDAO.getAudit(first_date, second_date);
  }
}

module.exports = new audit_CompteService()
