import axios from "axios";

//  Proxy setup 
const api = axios.create({
    baseURL: "/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Auth token attach interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API FUNCTIONS 

export const fetchAllEvents = async () => {
    try {
        const res = await api.get("event/api/route/all-events/");
        return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
        console.error("Error fetching all events:", err);
        return [];
    }
};

export const fetchPopularEvents = async () => {
    try {
        const res = await api.get("event/api/route/popular-events/");
        return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
        console.error("Error fetching popular events:", err);
        return [];
    }
};

export const fetchSingleEvent = async (id) => {
    try {
        const res = await api.get("event/api/route/all-events/");
        const single = res.data.find((ev) => ev.id === parseInt(id));
        return single || null;
    } catch (err) {
        console.error("Error fetching single event:", err);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        const res = await api.get("category/api_all_category/");
        return res.data && Array.isArray(res.data.categories)
            ? res.data.categories
            : [];
    } catch (err) {
        console.error("Error fetching categories:", err);
        return [];
    }
};

export const fetchEventTiers = async (eventTitle) => {
    try {
        const res = await api.get(
            `tiers/api_tiers/public_route/?search=${encodeURIComponent(eventTitle)}`
        );
        return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
        console.error("Error fetching tiers:", err);
        return [];
    }
};

export const bookEventTicket = async (token, payload) => {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await api.post("booking/api_booking/route/", payload, { headers });
        return res.data;
    } catch (err) {
        console.error("Error booking event ticket:", err.response?.data || err);
        throw err;
    }
};

export const loginUser = async (email, password) => {
    try {
        const res = await api.post("account/login/", { email, password });

        if (res.data?.token) {
            localStorage.setItem("token", res.data.token);
        }
        return res.data;
    } catch (err) {
        console.error("Login error:", err.response?.data || err);
        throw err;
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await api.post("account/register/", userData);
        return res.data;
    } catch (err) {
        console.error("Registration error:", err.response?.data || err);
        throw err;
    }
};

export default api;
