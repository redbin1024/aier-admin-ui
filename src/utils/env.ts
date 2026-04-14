const debug = import.meta.env.MODE !== 'production';

export const appTitle = import.meta.env.VITE_APP_TITLE;
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const clientId = import.meta.env.VITE_CLIENT_ID;
export const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

export default debug;
