import ClientService from "./clientService";
import AppResponse from "../../shared/appResponse";

export default class ClientController {
    async getAll(req, res) {
        
        const clientService = new ClientService();
        const clientList = await clientService.getAll();
        const response = new AppResponse(true, clientList);
        return res.status(200).json(response);
    }
    async getById(req, res) {
        
        const { id } = req.params;
        
        const clientService = new ClientService();
        const client = await clientService.getById({ id });
        const response = new AppResponse(true, client);
        return res.status(200).json(response);
    }
    async create(req, res) {

        const body = req.body;

        const clientService = new ClientService();
        const client = await clientService.create(body);
        const response = new AppResponse(true, client);
        return res.status(201).json(response);
    }
    async update(req, res) {

        const { id } = req.params;
        const body = req.body;

        const clientService = new ClientService();
        const client = await clientService.update({ id, body });
        const response = new AppResponse(true, client);
        return res.status(200).json(response);
    }
    async delete(req, res) {

        const { id } = req.params;

        const clientService = new ClientService();
        const client = await clientService.delete({ id });
        const response = new AppResponse(true, client);
        return res.status(200).json(response);
    }
}
