import { UserManager } from 'oidc-client-ts';

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_NNSmHAHaU",
    client_id: "3ib2kf6v4u906j85qno73kqaq8",
    redirect_uri: "http://localhost:5173/callback",
    response_type: "code",
    scope: "email openid phone"
};

export const userManager = new UserManager({
    ...cognitoAuthConfig,
});

export async function signOutRedirect () {

    const clientId = "3ib2kf6v4u906j85qno73kqaq8";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://idp-m321.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
}