const modeChangeButton = document.getElementById('changemode');
const editbox = document.getElementById('editbox');

const lzma = LZMA;

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

const updateURL = (newContent) => {
    location.hash = '#' + btoa(String.fromCharCode.apply(null, new Uint8Array(newContent)));
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
            console.log(`Unknown mode: ${currentMode}.`);         
    }
};

editbox.oninput = () => {
    lzma.compress(editbox.innerText, 9, (result, error) => { updateURL(result); }, (percent) => {});
};

window.onload = () => {
    const input = atob(location.hash.substr(1));
    const inputLength = input.length;
    const inputArray = new Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
        inputArray[i] = input.charCodeAt(i);
        if (inputArray[i] > 128) {
            inputArray[i] -= 256;
        }
    }
    lzma.decompress(inputArray, (result, error) => { showMD(result); }, (percent) => {});
    modeChangeButton.innerText = 'edit';
    modeChangeButton.setAttribute('data-mode', 'view');
};