import ClientRepository from "./clientRepository";
export default class ClientService {
    async getAll() {
        const clientRepository = new ClientRepository();
        const clientList = await clientRepository.getAll();
        //TODO: Implement rules
        return clientList;
    }
    async getById({ id }) {
        const clientRepository = new ClientRepository();
        const client = await clientRepository.getById({ id });
        //TODO: Implement rules
        return client;
    }
    async create(body) {
        const clientRepository = new ClientRepository();
        const client = await clientRepository.create(body);
        //TODO: Implement rules
        return client;
    }
    async update({ id, body }) {
        const clientRepository = new ClientRepository();
        const client = await clientRepository.update({ id, body });
        //TODO: Implement rules
        return client;
    }
    async delete({ id }) {
        const clientRepository = new ClientRepository();
        const client = await clientRepository.delete({ id });
        //TODO: Implement rules
        return client;
    }
}
