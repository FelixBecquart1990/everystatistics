const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_API_KEY);
/**
 * @name client
 * @description The Algolia's instance of the current environment
 */
export default client;

export async function find(collection, { value = '', limit = 4 }) {
    const index = client.initIndex(collection);
    try {
        const results = await index.search(value, { hitsPerPage: limit });
        return deserialize(results.hits);
    }
    catch (error) {
        throw `An error occured while requesting the collection '${collection}' from Algolia: ${error}`;
    }
}

export async function save(collection, { value = '' }) {
    const index = client.initIndex(collection);
    try {
        const record = await index.saveObjects([serialize(value)]);
        return deserialize(record);
    }
    catch (error) {
        throw `An error occured while saving ${value} to the collection '${collection}' on Algolia: ${error}`;
    }
}

export async function random(collection, { limit }) { return find(collection, { limit }) }

export function deserialize(data) {
    if(Array.isArray(data)) {
        return data.map(d => deserialize(d));
    }

    if(Array.isArray(data.objectIDs)) {
        return data.objectIDs.map(objectID => deserialize({ objectID, text: objectID }));
    }

    return { ...{ id: data.objectID }, ...data };
}

export function serialize(text) {
    return { objectID: text, text };
}