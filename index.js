import fetch from 'node-fetch';
import * as crypto from 'crypto';

class ApiDeclarations {
    constructor(url, key, secret) {
        this.url = url;
        this.key = key;
        this.secret = secret;
    }

    calcAuth(endpoint, verb, contentType = 'application/json', dt = Math.floor(Date.now() / 1000), content = "") {
        const headers = {
            'Date': new Date(dt * 1000).toUTCString(),
            'Content-Type': contentType
        };

        const hmac = crypto.createHmac('sha256', this.secret);
        hmac.update(verb + "\n" + content + "\n" + headers["Content-Type"] + "\n" + headers["Date"] + "\n/" + endpoint);

        headers['Authorization'] = this.key + ":" + hmac.digest('base64');

        return headers;
    }

    getDevice(uuid) {
        const endpoint = 'api/device/' + uuid;
        return fetch(this.url + endpoint, {
            method: 'GET',
            headers: this.calcAuth(endpoint, "GET")
        })
            .then(response => response.json())
            .then(data => [data.State, data]);
    }

    getAllDevices() {
        const endpoint = 'api/device/';
        return fetch(this.url + endpoint, {
            method: 'GET',
            headers: this.calcAuth(endpoint, "GET")
        })
            .then(response => response.json())
            .then(data => data)
    }

    updateDevice(uuid, newDevice) {
        const endpoint = 'api/device/' + uuid;
        return fetch(this.url + endpoint, {
            method: 'PUT',
            headers: this.calcAuth(endpoint, "PUT", 'application/json'),
            body: JSON.stringify(newDevice)
        })
            .then(response => response.status);
    }

    deleteDevice(uuid) {
        const endpoint = 'api/device/' + uuid;
        return fetch(this.url + endpoint, {
            method: 'DELETE',
            headers: this.calcAuth(endpoint, "DELETE")
        })
            .then(response => response.status);
    }

}

// Пример использования
const myApi = new ApiDeclarations("http://Yor_Server:Your_port_if_you_nead", "Username / API key", "Password / API secret");
const uuid = "uuid_device";

myApi.getDevice(uuid)
    .then(([status, data]) => {
        console.log("Device status code:", status);
        console.log("Device data:", data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

myApi.getAllDevices().then((data)=>{
    console.log(data[0].Options.Name)
})