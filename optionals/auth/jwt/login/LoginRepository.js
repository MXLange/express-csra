export default class LoginRepository {
    async loginJwt({ email, password }) {
        // This is a mockup of a database query
        const user = {
            id: 1,
            email: "user@user.com",
            password: "123456",
        };
        return user;
    }
}
