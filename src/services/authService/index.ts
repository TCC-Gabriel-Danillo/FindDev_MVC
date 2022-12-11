import { AuthCredentials, AuthResponse } from "_/types";
import { GitTokenDto, GitUserDto, GitRepositoryDto } from "./dto";
import { HttpAdapter } from "_/adapters"



export interface AuthService {
    authenticateGithub: (credentials: AuthCredentials) => Promise<AuthResponse | undefined>
}

export class AuthServiceImp implements AuthService {
    constructor(
        private readonly gitApiHttp: HttpAdapter,
        private readonly gitAuthHttp: HttpAdapter,
    ) { }

    async authenticateGithub(credentials: AuthCredentials): Promise<AuthResponse | undefined> {

        const tokenResponse = await this.exchangeCredentials(credentials)
        if (!tokenResponse) return

        const { access_token } = tokenResponse

        const [gitUser, gitRepos] = await Promise.all([
            this.getUserInfo(access_token),
            this.getUserRepos(access_token)
        ])

        if (!gitUser || !gitRepos) return

        const techs = this.getTechsInfoFromGitRepos(gitRepos)

        return {
            id: gitUser.id,
            profileUrl: gitUser.html_url,
            username: gitUser.login,
            email: gitUser.email,
            photoUrl: gitUser.avatar_url,
            techs
        }
    }

    async exchangeCredentials(credentials: AuthCredentials) {
        return this.gitAuthHttp.post<GitTokenDto>('/access_token', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    async getUserInfo(token: string): Promise<GitUserDto | undefined> {
        return this.gitApiHttp.get<GitUserDto>('/user', {
            headers: { authorization: `Bearer ${token}` }
        });
    }

    async getUserRepos(token: string): Promise<GitRepositoryDto[] | undefined> {
        return this.gitApiHttp.get<GitRepositoryDto[]>('/user/repos', {
            headers: { authorization: `Bearer ${token}` }
        });
    }

    getTechsInfoFromGitRepos(repos: GitRepositoryDto[]): string[] {
        const techs: Array<string> = []
        repos.forEach(repo => {
            const isNewTech = !techs.find((tech) => repo.language == tech)
            if (isNewTech && repo.language) {
                techs.push(repo.language)
            }
        })
        return techs
    }

}