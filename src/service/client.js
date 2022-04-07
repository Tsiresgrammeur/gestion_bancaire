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
    const { numCompte, nomClient} = client;
    return await clientDAO.createClient(numCompte, nomClient);
  }

  deleteClient(numCompte)
  {
    return clientDAO.deleteClient(numCompte);
  }

  updateClient(numCompte,client)
  {
    const {nomClient} = client;
    return clientDAO.updateClient(numCompte, nomClient);
  }
}

module.exports = new ClientService();
