const userId = new URLSearchParams(location.search).get('userId');
const $configElements = $('#configElements');
const $userEmailElement = $('#userEmail');
const $topLevelAttributes = $('#topLevelAttributes');
const $saveButton = $('#saveButton');
const topLevelAttributeNames = ['tiktokUsername'];

// request user config
apiGet(`/admin/users/${userId}`).then(setUserInfo).catch(handleError);
apiGet(`/admin/users/${userId}/config`).then(setConfig).catch(handleError);

function handleError(error) {
    if (error.responseJSON) {
        alert(error.responseJSON.errorMessage);
    } else {
        alert("Unknown API error");
    }
}

function setUserInfo(user) {
    $userEmailElement.text(user.email);
    document.title = user.email;
}

function setConfig(config) {
    if (!config) {
        alert(`Missing config record for user ${userId}`);
        return;
    }

    window.config = config;

    topLevelAttributeNames.forEach(attr => {
        if (typeof window.config[attr] !== 'undefined') {
            addRow($configElements, attr, createInput('text', [attr], window.config[attr] || ''));
        }
    })

    createControlsRecursive([]);

    $saveButton.click(update);
}

function createControlsRecursive(basePath) {
    let thisConfigNode = window.config;

    basePath.forEach(x => {
        thisConfigNode = thisConfigNode[x];
    })

    for (let attrName in thisConfigNode) {
        let attrPath = [...basePath, attrName];
        let value = thisConfigNode[attrName];

        if (value && typeof value === 'object') {
            addRow($configElements, '', $('<h3>').text(normalizeAttributeName(attrName)));
            createControlsRecursive(attrPath);
        } else if (attrPath.length > 1) { // ignore root fields like id, createdAt...
            if (attrName.toLowerCase().includes('color') || attrName.toLowerCase().includes('gradient')) {
                addRow($configElements, attrName, createInput('color', attrPath, value));
            } else if (typeof value === 'number') {
                addRow($configElements, attrName, createInput('number', attrPath, value));
            } else if (typeof value === 'string') {
                addRow($configElements, attrName, createInput('text', attrPath, value));
            } else {
                alert(`Invalid field value ${value} for ${attrPath.join('.')}`);
            }
        }
    }
}

function addRow($container, label, $input) {
    $row = $('<tr>');

    $tdLabel = $('<td>').text(normalizeAttributeName(label));
    $tdLabel.css('text-align', 'right');
    $tdLabel.css('padding-right', '10px');
    $row.append($tdLabel);

    $tdInput = $('<td>');
    $tdInput.css('text-align', 'left');

    $tdInput.append($input)
    $row.append($tdInput);

    $container.append($row);
}

function createInput(type, attrPath, value) {
    $input = $('<input>');
    $input.attr('type', type);
    $input.addClass('configInput');
    $input.attr('data-attrPath', attrPath.join('.'));
    $input.css('width', type === 'color' ? '50px' : '400px');
    $input.val(value);
    return $input;
}

function normalizeAttributeName(attributeName) {
    return attributeName.split('_').map(nameSegment => {
        return nameSegment.substring(0, 1).toUpperCase() + nameSegment.substring(1);
    }).join(' ');
}

function update() {
    let changedFields = [];

    $('.configInput').each((i, input) => {
        let path = input.dataset.attrpath.split('.').slice(0, -1);
        let attributeName = input.dataset.attrpath.split('.').at(-1);
        let configObj = window.config;

        path.forEach(pathSegment => {
            configObj = configObj[pathSegment];
        })

        let oldValue = configObj[attributeName];

        if (typeof configObj[attributeName] === 'number') {
            configObj[attributeName] = parseInt(input.value);
        }

        if (typeof configObj[attributeName] === 'string') {
            configObj[attributeName] = input.value;
        }

        // Top level attributes like tiktokUsername can be null
        if ((configObj[attributeName] === null || configObj[attributeName] === '') && topLevelAttributeNames.includes(attributeName)) {
            configObj[attributeName] = input.value || null;
        }

        if (oldValue !== configObj[attributeName]) {
            changedFields.push(input.dataset.attrpath);
        }
    })

    if (changedFields.length === 0) {
        alert("No changes to update");
        return;
    }

    if (confirm(`${changedFields.length} Changes detected:\n\n${changedFields.join('\n')}\n\nUpdate?`)) {
        apiPatch(`/admin/users/${userId}/config`, window.config).then(() => {
            location.reload();
        }).catch(err => {
            alert('Failed to save config record');
        })
    }
}