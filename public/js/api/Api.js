class Api {
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => res.data)
            .catch(err => console.log('an error occurs', err))
    }
}


class PhotographeApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographes() {
        return await this.get()
    }
}
