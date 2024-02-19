export default class LoginRepository {
    async loginJwt({ email, password }) {
        // This is a mockup of a database query
        const user = {
            id: 1,
            email,
            password,
        };
        return user;
    }
}
