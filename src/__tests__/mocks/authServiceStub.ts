import { AuthService } from "_/services/authService";
import { AuthCredentials, AuthResponse } from "_/types";

export class AuthServiceStub implements AuthService {
    async authenticateGithub(credentials: AuthCredentials): Promise<AuthResponse | undefined> {
        return {
            id: "any_id",
            username: "any_username",
            profileUrl: "any_profile_url",
            photoUrl: "any_photo_url",
            email: "any_email",
            techs: ["tech_1", "tech_2"]
        }
    }
}