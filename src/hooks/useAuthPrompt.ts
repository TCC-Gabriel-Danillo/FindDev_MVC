import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {
    GIT_CLIENT_ID,
    GIT_REVOCATION_ENDPOINT,
    GIT_TOKEN_ENDPOINT,
    GIT_AUTHORIZATION_ENDPOINT,
    APP_SCHEME,
    GIT_CLIENT_SECRET
} from '../constants';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: GIT_AUTHORIZATION_ENDPOINT,
    tokenEndpoint: GIT_TOKEN_ENDPOINT,
    revocationEndpoint: GIT_REVOCATION_ENDPOINT,
};

export interface AuthResponse {
    code: string
    client_id: string
    client_secret: string
}

export interface AuthPromptService {
    promptAuth: () => Promise<AuthResponse>
}

export function useAuthPrompt(): AuthPromptService {
    const [, , promptAsync] = useAuthRequest(
        {
            clientId: GIT_CLIENT_ID,
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: APP_SCHEME
            }),
        },
        discovery
    );

    const promptAuth = async (): Promise<AuthResponse> => {
        const promptResponse = await promptAsync();
        if (promptResponse.type !== 'success') throw new Error("Algo deu errado ao tentar logar.")
        const { code } = promptResponse.params
        return {
            client_id: GIT_CLIENT_ID,
            client_secret: GIT_CLIENT_SECRET,
            code
        }
    }

    return { promptAuth }
}