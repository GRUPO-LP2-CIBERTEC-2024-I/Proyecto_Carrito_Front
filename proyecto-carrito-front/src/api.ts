// src/api.ts

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}
