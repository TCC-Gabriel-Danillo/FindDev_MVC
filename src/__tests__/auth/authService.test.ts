import { HttpAdapterImp } from "_/adapters"
import { GITHUB_URL } from "_/constants"
import { AuthServiceImp } from "_/services/authService"
import { mockAuthTokenRequest, mockReposRequest, mockUserRequest } from "../mocks/http"


describe('authService', () => {

    beforeAll(() => {
        mockAuthTokenRequest()
        mockReposRequest()
        mockUserRequest()
    })

    it("should return a user", async () => {
        const gitApiHttp = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
        const gitAuthHttp = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
        const authService = new AuthServiceImp(gitApiHttp, gitAuthHttp)

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)
        expect(user).toEqual({
            email: "email",
            id: "id",
            photoUrl: "url",
            username: "username",
            techs: ["language1"]
        })
    })
})