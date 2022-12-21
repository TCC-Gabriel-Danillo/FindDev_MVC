import { HttpAdapterImp } from "_/adapters"
import { GITHUB_URL } from "_/constants"
import { AuthService, AuthServiceImp } from "_/services/authService"

export const makeAuthService = (): AuthService => {
    const gitApi = new HttpAdapterImp(GITHUB_URL.API_BASE_URL)
    const gitAuth = new HttpAdapterImp(GITHUB_URL.AUTH_BASE_URL)
    return new AuthServiceImp(gitApi, gitAuth)
}