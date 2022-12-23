import { HttpAdapterImp } from "_/adapters"
import { GITHUB_URL } from "_/constants"
import { AuthServiceImp } from "_/services/authService"
import * as httpMock from "../mocks/http"


describe('authService', () => {

    beforeAll(() => {
        httpMock.mockAuthTokenRequest()
        httpMock.mockReposRequest()
        httpMock.mockUserRequest()
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

    it("should return empty if auth token request returns empty", async () => {
        httpMock.mockAuthTokenRequestEmpty()
        const gitApiHttp = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
        const gitAuthHttp = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
        const authService = new AuthServiceImp(gitApiHttp, gitAuthHttp)

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)

        expect(user).toBeFalsy()
    })

    it("should return empty if repositories request returns empty", async () => {
        httpMock.mockReposRequestEmpty()
        httpMock.mockAuthTokenRequest()
        httpMock.mockUserRequest()
        const gitApiHttp = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
        const gitAuthHttp = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
        const authService = new AuthServiceImp(gitApiHttp, gitAuthHttp)

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)

        expect(user).toBeFalsy()
    })

    it("should throw an error if repo request returns 401", async () => {
        httpMock.mockReposRequestForbidden()
        httpMock.mockAuthTokenRequest()
        httpMock.mockUserRequest()
        const gitApiHttp = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
        const gitAuthHttp = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
        const authService = new AuthServiceImp(gitApiHttp, gitAuthHttp)

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = authService.authenticateGithub(credentials)

        await expect(user).rejects.toThrow()
    })

})