const db= require('../../db/db');

class audit_CompteDAO {

  async getAudit(first_date,second_date)
  {
    return await db.select(
      'id','ops','date',
      'audit_retrait.numCompte', 'anc_montant',
      'n_montant','client.nomClient',
      'user.username','user.name'
    ).from('audit_retrait')
      .innerJoin('client','audit_retrait.numCompte','client.numCompte')
      .innerJoin('user','audit_retrait.username','user.username')
      .whereBetween('audit_retrait.date',[first_date,second_date]);
      //.where('audit_retrait.date','<', second_date)
      //  .andWhere('audit_retrait.date','>', first_date);
  }
}

module.exports = new audit_CompteDAO();
