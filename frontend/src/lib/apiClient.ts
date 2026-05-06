const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Une erreur est survenue");
  }
  
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}

// La fonction de base
async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  return request<T>(endpoint, options);
}

// On ajoute les méthodes à la fonction (style Axios)
apiClient.get = <T>(endpoint: string, options?: RequestInit) => 
  request<T>(endpoint, { ...options, method: "GET" });

apiClient.post = <T>(endpoint: string, data?: any, options?: RequestInit) => 
  request<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(data) });

apiClient.put = <T>(endpoint: string, data?: any, options?: RequestInit) => 
  request<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(data) });

apiClient.patch = <T>(endpoint: string, data?: any, options?: RequestInit) => 
  request<T>(endpoint, { ...options, method: "PATCH", body: JSON.stringify(data) });

apiClient.delete = <T>(endpoint: string, options?: RequestInit) => 
  request<T>(endpoint, { ...options, method: "DELETE" });

export { apiClient }; // Export nommé
export default apiClient; // Export par défaut
