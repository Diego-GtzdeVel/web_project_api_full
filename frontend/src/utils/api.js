class Api {
    constructor(baseUrl, headers = {}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
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
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
        },
      }).then(this._handleResponse);
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}cards/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
        },
      }).then(this._handleResponse);
    }
  
    setUserInfo({name, about}) {
      return fetch(`${this.baseUrl}users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
        },
        body: JSON.stringify({ name, about }),
      }).then(this._handleResponse);
    }
  
    setUserAvatar(avatarUrl) {
      return fetch(`${this.baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      }).then(this._handleResponse);
    }
  
    addNewCard({name, link}) {
      return fetch(`${this.baseUrl}cards/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
        },
        body: JSON.stringify({ name, link }),
      }).then(this._handleResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this.baseUrl}cards/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
        },
      }).then(this._handleResponse);
    }
  
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
          method: isLiked ? "PUT" : "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...this.headers,
          },
        }).then(this._handleResponse);
      }
      
  
    getUserAndCards() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }
  }

const api = new Api("https://around-api.es.tripleten-services.com/v1/", {
    Authorization: "1439adc7-0960-4dee-903b-22e0b673f7cc",
  });

export default api