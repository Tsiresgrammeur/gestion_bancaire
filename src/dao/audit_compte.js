const db= require('../../db/db');

class audit_CompteDAO {

  async getAudit(first_date,second_date)
  {
    return await db.select(
      'id','ops','date',
      'audit_compte.numCompte', 'anc_solde',
      'n_solde','client.nomClient',
      'user.username','user.name'
    ).from('audit_compte')
      .innerJoin('client','audit_compte.numCompte','client.numCompte')
      .innerJoin('user','audit_compte.username','user.username')
      .whereBetween('audit_compte.date',[first_date,second_date]);
      //.where('audit_compte.date','<', second_date)
      //  .andWhere('audit_compte.date','>', first_date);
  }
}

module.exports = new audit_CompteDAO();
