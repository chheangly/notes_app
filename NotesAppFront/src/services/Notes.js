import { BASE_URL } from "./ApiConstant"

const token = localStorage.getItem("token");

export const requestNotes = async () => {
    const res = await fetch(`${BASE_URL}/notes`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        return [];
    }
}

export const requestAddNote = async (title, content, onSuccess, onFailed) => {
    const res = await fetch(`${BASE_URL}/notes`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "content": content,
        })
    });
    if (res.ok) {
        onSuccess?.();
    } else {
        onFailed?.();
    }
}

export const requestUpdateNote = async (id, title, content, onSuccess, onFailed) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            "title": title,
            "content": content,
        }),
    });
    if (res.ok) {
        const data = await res.json();
        console.log(data);
        onSuccess?.();
    } else {
        onFailed?.();
    }
}

export const requestDeleteNote = async (id, onSuccess, onFailed) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "DELETE"
    });
    if (res.ok) {
        onSuccess?.();
    } else {
        onFailed?.();
    }
}

export const requestSearchNote = async (content, onSuccess, onFailed) => {
    const res = await fetch(`${BASE_URL}/notes/search`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            "content": content,
        })
    });
    if (res.ok) {
        const data = await res.json();
        onSuccess?.(data);
    } else {
        onFailed?.();
    }
}
