const clientDAO = require('../dao/client');

class ClientService 
{
  async getClients()
  {
    return await clientDAO.getClients();
  }

  async getOneClient(numCompte)
  {
    return await clientDAO.getOneClient(numCompte);
  }

  async createClient(client)
  {
    const { numCompte, nomClient, solde} = client;
    return await clientDAO.createClient(numCompte, nomClient, solde);
  }

  deleteClient(numCompte)
  {
    return clientDAO.deleteClient(numCompte);
  }

  updateClient(numCompte,client)
  {
    const {nomClient, solde} = client;
    return clientDAO.updateClient(numCompte, nomClient, solde);
  }
}

module.exports = new ClientService();
