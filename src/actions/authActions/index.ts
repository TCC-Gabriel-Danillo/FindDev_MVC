import { addUser, authLoaded, authLoading } from "_/store/authStore"
import { AuthCredentials, Position, User } from "_/types"
import { AppThunk } from "_/types/appThunk"

export const authenticateAction = (credentials: AuthCredentials, position: Position): AppThunk => {

    // @ TODO maybe the extra params from thunk could be services and not direct apis and repositories 
    return async (dispatch, getState, { gitHubApi, gitHubAuthApi, userDatabaseRepository }) => {

        const tokenResponse = await gitHubAuthApi.post<GitTokenDto>('/access_token', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const access_token = tokenResponse?.access_token

        const [gitUser, gitRepos] = await Promise.all([
            gitHubApi.get<GitUserDto>('/user', {
                headers: { authorization: `Bearer ${access_token}` }
            }),
            gitHubApi.get<GitRepositoryDto[]>('/user/repos', {
                headers: { authorization: `Bearer ${access_token}` }
            })
        ])

        if (!gitUser || !gitRepos) return

        const repos = getTechsInfoFromGitRepos(gitRepos)
        const newUser = mapGitUserToUser(gitUser, repos, position)

        dispatch(addUser(newUser))

        const fUser = mapUserToFirebaseUser(newUser)
        await userDatabaseRepository.createOrReplace(fUser);
    }
}



// @TODO figure out how to organize dtos and maps functions
export interface GitTokenDto {
    access_token: string
}

export interface GitUserDto {
    login: string;
    id: number;
    avatar_url: string;
    email?: any;
}
export interface GitRepositoryDto {
    language: string;
}

export interface FirebaseUserDto {
    username: string
    id: number
    photoUrl?: string
    email: string
    techs?: Array<string>
}


const getTechsInfoFromGitRepos = (repos: GitRepositoryDto[]): string[] => {
    const techs: Array<string> = []
    repos.forEach(repo => {
        const isNewTech = !techs.find((tech) => repo.language == tech)
        if (isNewTech && repo.language) {
            techs.push(repo.language)
        }
    })
    return techs
}


export const mapGitUserToUser = (gitUser: GitUserDto, techs: Array<string>, position: Position): User => {
    return {
        email: gitUser.email,
        id: gitUser.id,
        profileUrl: gitUser.avatar_url,
        techs: techs,
        username: gitUser.login,
        geohash: geohashGeneratorHelper(position),
        position: position
    }
}

export const mapUserToFirebaseUser = (user: User): FirebaseUserDto => {
    return {
        email: user.email || "",
        id: user.id,
        username: user.username,
        photoUrl: user.photoUrl,
        techs: user.techs
    }
}


// @TODO - move to a helper
import { geohashForLocation } from "geofire-common";
export const geohashGeneratorHelper = (position: Position) => {
    const { latitude, longitude } = position
    return geohashForLocation([latitude, longitude]);
}
