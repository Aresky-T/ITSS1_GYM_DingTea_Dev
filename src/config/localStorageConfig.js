export function customLocalStorage (key){
    if(!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify({}))
    }

    const storage = JSON.parse(localStorage.getItem(key));

    function autoSave(){
        localStorage.setItem(key, JSON.stringify(storage));
    }

    function setProperty(name, value){
        storage[name] = value;
        autoSave();
    }

    function getProperty(name){
        return storage[name];
    }

    function deleteProperty(name){
        delete storage[name]
        autoSave();
    }

    return {getProperty, setProperty, deleteProperty}
}