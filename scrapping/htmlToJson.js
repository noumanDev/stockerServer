const axios = require('axios');
const apiUrl = 'https://html2json.com/api/v1';

const fetch = require('node-fetch');

async function getJson(html) {
    try {
        var response = await axios({
            method: 'POST',
            url: apiUrl,
            data:html
        });
        return response.data;

    } catch (e) {
        console.log('error', e.message)
    }
}

module.exports = {
    getJson
}