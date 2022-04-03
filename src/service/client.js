const clientDAO = require('../dao/client');

class ClientService 
{
  async getClients()
  {
    return await clientDAO.getClients();
  }

  async getOneClient(id)
  {
    return await clientDAO.getOneClient(id);
  }

  async createClient(client)
  {
    const { nom, prenom, solde} = client;
    return await clientDAO.createClient(nom, prenom, solde);
  }

  deleteClient(id)
  {
    return clientDAO.deleteClient(id);
  }

  updateClient(id,client)
  {
    const {nom, prenom, solde} = client;
    return clientDAO.updateClient(id,nom, prenom, solde);
  }
}

module.exports = new ClientService();
