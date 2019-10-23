const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_API_KEY);
/**
 * @name client
 * @description The Algolia's instance of the current environment
 */
export default client;


/**
 * @name search
 * @description Search records of {collection} from Algolia for {value}
 * @param {*} collection The collection's name
 * @param {} value The string value to search
 */
export async function find(collection, value = '') {
    const index = client.initIndex(collection);
    try {
        const results = await index.search(value);
        return deserialize(results.hits);
    }
    catch (error) {
        throw `An error occured while requesting the collection '${collection}' from Algolia: ${error}`;
    }
}


/**
 * @name deserialize
 * @description Deserilize data from Algolia's API
 * @param {*} data
 */
export function deserialize(data) {
    if(Array.isArray(data)) {
        return data.map(d => deserialize(d));
      }

    return { ...{ id: data.objectID }, ...data };
}