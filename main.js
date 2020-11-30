const modeChangeButton = document.getElementById('changemode');
const editbox = document.getElementById('editbox');

let content = '';

const showMD = () => {
    content = editbox.innerText;
    editbox.innerHTML = marked(content);
    editbox.contentEditable = false;
};

const showEdit = () => {
    editbox.innerText = content;
    editbox.contentEditable = true;
};

modeChangeButton.onclick = () => {
    const currentMode = modeChangeButton.getAttribute('data-mode');
    switch(currentMode) {
        case 'edit':
            modeChangeButton.innerText = 'edit';
            modeChangeButton.setAttribute('data-mode', 'view');
            showMD();
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