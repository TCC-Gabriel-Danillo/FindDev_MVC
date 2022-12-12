import { AuthCredentials, AuthResponse } from "_/types";

export interface AuthService {
    authenticateGithub: (credentials: AuthCredentials) => Promise<AuthResponse | undefined>
}