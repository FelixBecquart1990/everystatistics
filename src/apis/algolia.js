const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.VUE_APP_ALGOLIA_APP_ID, process.env.VUE_APP_ALGOLIA_API_KEY);
/**
 * @name client
 * @description The Algolia's instance of the current environment
 */
export default client;


/**
 * @name findAll
 * @description Find all records of {collection} from Algolia
 * @param {*} collection 
 */
export async function findAll(collection) {
    const index = client.initIndex(collection);
    try {
        const results = await index.search('');
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