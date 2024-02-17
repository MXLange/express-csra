import ModelRepository from "./ModelRepository.js";
export default class ModelService {
    async getAll() {
        const modelRepository = new ModelRepository();
        const modelList = await modelRepository.getAll();
        //TODO: Implement rules
        return modelList;
    }
    async getById({ id }) {
        const modelRepository = new ModelRepository();
        const model = await modelRepository.getById({ id });
        //TODO: Implement rules
        return model;
    }
    async create(body) {
        const modelRepository = new ModelRepository();
        const model = await modelRepository.create(body);
        //TODO: Implement rules
        return model;
    }
    async update({ id, body }) {
        const modelRepository = new ModelRepository();
        const model = await modelRepository.update({ id, body });
        //TODO: Implement rules
        return model;
    }
    async delete({ id }) {
        const modelRepository = new ModelRepository();
        const model = await modelRepository.delete({ id });
        //TODO: Implement rules
        return model;
    }
}
