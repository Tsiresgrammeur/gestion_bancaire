const db= require('../../db/db');

class clientDAO {

  async getClients()
  {
    return await db.select().table('client');
  }

  async getOneClient(id)
  {
    return await db('client').where('id',id).first();
  }

  async createClient(nom, prenom, solde)
  {
    const [id] = await db('client').insert({
      nom,
      prenom,
      solde
    }).returning('id');

    return id;
  }

  async deleteClient(id)
  {
   return await db('client').where('id',id).del();
  }

  async updateClient(id,nom,prenom, solde)
  {
     return db('client').where({ id: id}).update({
      nom,
      prenom,
      solde
    });
  }

}

module.exports = new clientDAO();
