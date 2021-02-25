import CustomError from "./customError";

export default class APIService {

    host = "http://127.0.0.1:8000/"

    async getItems(url) {
        return await fetch(this.host + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(await this.handleResponse)
    }

    async postItem(url, data) {
        return await fetch(this.host + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then(await this.handleResponse)
    }


    async putItem(url, data) {
        return await fetch(this.host + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then(await this.handleResponse)
    }


    async patchItem(url, data) {
        return await fetch(this.host + url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then(await this.handleResponse)
    }


    async deleteItem(url) {
        const response = await fetch(this.host + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            const result = await response.json();
            throw new CustomError(result.error, response.status)
        }
        return Promise.resolve();
    }

    async handleResponse(response) {
        if (!response.ok) {
            console.log(await response.json())
            throw new CustomError(response.statusText, response.status)
        }
        return await response.json();
    }
}