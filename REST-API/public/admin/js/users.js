// request user list
apiGet('/admin/users').then(users => {
    if (users.errorCode) {
        alert(`API Error ${users.errorCode}`);
        return;
    }

    // init datatable
    $('#userTable').DataTable({
        columns: [
            { title: "E-Mail", data: "email" },
            { title: "First Name", data: "first_name" },
            { title: "Last Name", data: "last_name" },
            {
                title: "Registered At",
                data: "createdAt",
                render: (data, type, row, meta) => {
                    return new Date(data).toLocaleString();
                }
            },
            {
                title: "Actions",
                type: 'html',
                render: (data, type, row, meta) => {
                    return `<button onclick="openConfigEditTab('${row.id}')">Edit Config</button>`;
                }
            },
        ],
        data: users
    });
}).catch(error => {
    if (error.responseJSON) {
        alert(error.responseJSON.errorMessage);
    } else {
        alert("Unknown API error");
    }
});

function openConfigEditTab(userId) {
    window.open('userconfig?userId=' + userId, '_blank');
}