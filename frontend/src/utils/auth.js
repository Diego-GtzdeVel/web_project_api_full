const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export async function register({ email, password }) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Error en el registro');
  }
  return response.json();
}

export async function authorize({ email, password }) {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Error en el login');
  }
  return response.json();
}

export function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Error obteniendo datos del usuario');
    }
    return res.json();
  });
}
