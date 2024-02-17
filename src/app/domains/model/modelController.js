import ModelService from "./modelService.js";
import AppResponse from "../../shared/classes/appResponse.js";

export default class ModelController {
    async getAll(req, res) {
        
        const modelService = new ModelService();
        const modelList = await modelService.getAll();
        const response = new AppResponse(true, modelList);
        return res.status(200).json(response);
    }
    async getById(req, res) {
        
        const { id } = req.params;
        
        const modelService = new ModelService();
        const model = await modelService.getById({ id });
        const response = new AppResponse(true, model);
        return res.status(200).json(response);
    }
    async create(req, res) {

        const body = req.body;

        const modelService = new ModelService();
        const model = await modelService.create(body);
        const response = new AppResponse(true, model);
        return res.status(201).json(response);
    }
    async update(req, res) {

        const { id } = req.params;
        const body = req.body;

        const modelService = new ModelService();
        const model = await modelService.update({ id, body });
        const response = new AppResponse(true, model);
        return res.status(200).json(response);
    }
    async delete(req, res) {

        const { id } = req.params;

        const modelService = new ModelService();
        const model = await modelService.delete({ id });
        const response = new AppResponse(true, model);
        return res.status(200).json(response);
    }
}
