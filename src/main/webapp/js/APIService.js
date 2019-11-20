

class APIService{

    getAll(url){
        return fetch(url);
    }

    getById(url,id){
        return fetch(url + '/' + id);
    }

    delete(url,id){
        return fetch(url + '/' + id, {method : 'DELETE'},);
    }

    save(url,data)
    {
        return fetch(url,
            {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            },);

    }

    put(url,data)
    {
        return fetch(url + "/" + data.id,
            {
                method : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            },);
    }
}

export default new APIService();