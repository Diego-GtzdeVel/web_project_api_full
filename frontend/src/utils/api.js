class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this._token = null;
  }

  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this._token && { Authorization: `Bearer ${this._token}` }),
    };
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards/`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  setUserAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._handleResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}cards/`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._getHeaders(),
    }).then(this._handleResponse);
  }

  getUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

const api = new Api("https://around-api.es.tripleten-services.com/v1/");

export default api;
