const db= require('../../db/db');

class retraitDAO {

  async getRetraits()
  {
    return await db.select().table('retrait');
  }

  async getOneRetrait(numRetrait)
  {
    return await db('retrait').where('numRetrait',numRetrait).first();
  }

  async createRetrait(numCheck, numCompte, montant, date)
  {
    await db('retrait').insert({
      numCheck,
      numCompte,
      montant,
      date
    });

    return numCompte;
  }

  async deleteRetrait(numRetrait)
  {
   return await db('retrait').where('numRetrait',numRetrait).del();
  }

  async updateRetrait(numRetrait,numCheck, numCompte, montant, date)
  {
     return db('retrait').where({ numRetrait: numRetrait}).update({
      numCheck,
      numCompte,
      montant,
      date
    });
  }

}

module.exports = new retraitDAO();
