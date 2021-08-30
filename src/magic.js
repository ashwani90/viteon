import {Magic} from "magic-sdk";
import {useEffect} from "react";

const [user, setUser] = useState(null);

useEffect(() => {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)
}, []);

const loginUser = async (email) => {
    try {
        await magic.auth.loginWithMagicLink({email});
        setUser(email);
        router.push("/");
    } catch (err) {
        setUser(null);
        throw new Error("Email login failed");
    }
};

const checkUserLoggedIn = async () => {
    try {
        const isLoggedIn = await magic.user.isLoggedIn();
        if (isLoggedIn) {
            const { email } = await magic.user.getMetadata();
            setUser(email);
            getToken();
        }
    } catch (err) {
        throw new Error("User is not logged in");
    }
};

const getToken = async () => {
    try {
        return await magic.user.getIdToken();
    } catch (err) {
        throw new Error("Authenticate current session failed");
    }
};

const logoutUser = async () => {
    try {
        await magic.user.logout();
        setUser(null);
        router.push("/");
    } catch (err) {
        throw new Error("User logout failed");
    }
};

import { OAuthExtension } from "@magic-ext/oauth";

useEffect(() => {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
        extensions: [new OAuthExtension()],
    });
}, []);

const oauthLogin = async (e) => {
    e.preventDefault();

    // Start the Google OAuth 2.0 flow!
    await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: `${window.location.origin}/oauth`,
    });
};

useEffect(() => {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY, {
        extensions: [new OAuthExtension()],
    });

    const render = async () => {
        if (window.location.pathname === "/oauth") {
            try {
                const result = await magic.oauth.getRedirectResult();
                const profile = JSON.stringify(result.oauth.userInfo, undefined, 2);
                if (profile.email) {
                    setUser(profile.email);
                    router.push("/");
                }
            } catch {
                window.location.href = window.location.origin;
                throw new Error("Oauth login failed");
            }
        }

        checkUserLoggedIn();
    };
    render();
}, []);