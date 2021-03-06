const db= require('../../db/db');

class audit_operationDAO {

  async getAudit(first_date,second_date)
  {
    if(first_date && second_date)
    {
      return await db.select(
        'id','ops','date',
        'audit_operation.numCompte', 'audit_operation.numCheck',
        'montant','client.nomClient',
        'user.username','user.name'
      ).from('audit_operation')
        .leftJoin('client','audit_operation.numCompte','client.numCompte')
        .leftJoin('user','audit_operation.username','user.username')
        .whereBetween('audit_operation.date',[first_date,second_date]);
    }
    return await db.select(
      'id','ops','date',
      'audit_operation.numCompte', 'audit_operation.numCheck',
      'montant','client.nomClient',
      'user.username','user.name'
    ).from('audit_operation')
      .leftJoin('client','audit_operation.numCompte','client.numCompte')
      .leftJoin('user','audit_operation.username','user.username');
  }
}

module.exports = new audit_operationDAO();
