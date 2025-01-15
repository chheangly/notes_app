import { BASE_URL } from "./ApiConstant";

export const requestLogin = async (username, password, onSuccess, onFailed) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password,
        })
    });
    const data = await res?.json();
    if (res.status === 200) {
        onSuccess?.(data.token);
    } else {
        onFailed?.(data.message);
    }
}

export const requestRegister = async (username, password, onSuccess, onFailed) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
    if (res.ok) {
        onSuccess?.()
    } else {
        onFailed?.()
    }
}
