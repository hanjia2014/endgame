var StoreService = function () {
    var _session = sessionStorage;
    function set(key, value) {
        _session.setItem(key, JSON.stringify(value));
    }
    function get(key) {
        return $.parseJSON(_session.getItem(key));
    }
    function remove(key) {
        _session.removeItem(key);
    }
    function clear() {
        _session.clear();
    }

    return {
        set: set,
        get: get,
        remove: remove,
        clear: clear
    }
}