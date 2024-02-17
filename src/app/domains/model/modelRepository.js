export default class ModelRepository {
    async getAll() {
        //TODO: Implement getAll
        return [
            {
                id: 1,
                name: "Model 1",
            },
            {
                id: 2,
                name: "Model 2",
            },
            {
                id: 3,
                name: "Model 3",
            },
        ];
    }
    async getById({ id }) {
        //TODO: Implement getById
        id = parseInt(id);
        const models = [
            {
                id: 1,
                name: "Model 1",
            },
            {
                id: 2,
                name: "Model 2",
            },
            {
                id: 3,
                name: "Model 3",
            },
        ];
        return models.find((model) => model.id === id);
    }
    async create(body) {
        //TODO: Implement create
    }
    async update({ id, body }) {
        //TODO: Implement update
    }
    async delete({ id }) {
        //TODO: Implement delete
    }
}