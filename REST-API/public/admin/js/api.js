function apiGet(path) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: path,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}

function apiPatch(path, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "PATCH",
            url: path,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    })
}