const modeChangeButton = document.getElementById('changemode');

modeChangeButton.onclick = () => {
    const currentMode = modeChangeButton.getAttribute('data-mode');
    switch(currentMode) {
        case 'edit':
            modeChangeButton.innerText = 'edit';
            modeChangeButton.setAttribute('data-mode', 'view');
            break;
        case 'view':
            modeChangeButton.innerText = 'view';
            modeChangeButton.setAttribute('data-mode', 'edit');
            break;
        default:
            console.log(`Sorry, we are out of ${currentMode}.`);         
    }
};