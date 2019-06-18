

export default class LocalStorage {
    /**
     * 
     * @param {Storage} storage 
     */
    constructor(storage) {
        this.storage = storage
    }
    async getRaw(key) {
        return this.storage.getItem(key);
    }
    async get(key, defaultValue) {
        return JSON.parse(await this.getRaw(key)) || defaultValue;
    }
    async setRaw(key, value) {
        return this.storage.setItem(key, value);
    }
    // multiGet(...args){
    //     return this.asyncStorage.multiGet(...args)
    // }
    // multiSet(...args){
    //     return this.asyncStorage.multiSet(...args)
    // }
    set(key, value) {
        return this.setRaw(key, JSON.stringify(value))
    }
    async remove(key) {
        return this.storage.removeItem(key)
    }

}