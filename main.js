const modeChangeButton = document.getElementById('changemode');
const editbox = document.getElementById('editbox');

let content = '';

const showMD = (new_content) => {
    content = new_content;
    editbox.innerHTML = marked(content);
    editbox.contentEditable = false;
};

const showEdit = () => {
    editbox.innerText = content;
    editbox.contentEditable = true;
};

const updateURL = () => {
    location.hash = encodeURI(editbox.innerText);
};

modeChangeButton.onclick = () => {
    const currentMode = modeChangeButton.getAttribute('data-mode');
    switch(currentMode) {
        case 'edit':
            modeChangeButton.innerText = 'edit';
            modeChangeButton.setAttribute('data-mode', 'view');
            showMD(editbox.innerText);
            break;
        case 'view':
            modeChangeButton.innerText = 'view';
            modeChangeButton.setAttribute('data-mode', 'edit');
            showEdit();
            break;
        default:
            console.log(`Sorry, we are out of ${currentMode}.`);         
    }
};

editbox.oninput = () => {
    updateURL();
};

window.onload = () => {
    const input = decodeURI(location.hash.substr(1));
    if (input !== '') {
        showMD(input);
        modeChangeButton.innerText = 'edit';
        modeChangeButton.setAttribute('data-mode', 'view');
    }
};