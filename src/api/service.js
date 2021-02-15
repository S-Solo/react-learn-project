class Service {
    constructor() {
        this.baseUrl = "https://jsonplaceholder.typicode.com";
    }

    _request = (method, url, data = null) => {
        return fetch(`${this.baseUrl}${url}`, {
            method,
            headers: data ? { 'Content-Type': 'application/json' } : {},
            body: data ? JSON.stringify(data) : null
        })
            .then(res => {
                if (res.status < 400) {
                    return res.json()
                } else {
                    throw new Error("Network Error")
                }
            })
    }

    getPosts = (start, limit = 9) => {
        return this._request('GET', `/posts?_start=${start}&_limit=${limit}&_delay=6000`);

    }

    getAllPosts = () => {
        return this._request('GET', '/posts')
    }

    getPost = (id) => {
        return this._request('GET', `/posts/${id}`)
    }

    createPost = (data) => {
        return this._request('POST', '/posts', data)
    }

    updatePost = (id, data) => {
        return this._request('PATCH', `/posts/${id}`, data)
    }

    deletePost = (id) => {
        return this._request('DELETE', `/posts/${id}`)
    }
}

const service = new Service();
export default service;