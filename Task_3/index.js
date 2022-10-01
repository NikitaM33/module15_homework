const input = document.querySelector('.chat__input');
const send = document.querySelector('.chat__sendBtn');
const msgArea = document.querySelector('.chat__msgArea');
const msgGeo = document.querySelector('.chat__geo');
const url = 'wss://echo-ws-service.herokuapp.com';
const websocket = new WebSocket(url);


const writeToScreen = (message, mySend) => {
    let msg = document.createElement('div');
    msg.classList.add('msg');

    mySend ? msg.classList.add('mySend') : null;
    msg.innerHTML = message;

    msgArea.appendChild(msg);
}

send.addEventListener('click', (e) => {
    e.preventDefault();
    
    writeToScreen(`You: ${input.value}`, 'mySend');
    websocket.send(input.value);

    websocket.onmessage = (e) => {
        writeToScreen(`Apponent: ${e.data}`);
    }

    input.value = '';
});

msgGeo.addEventListener('click', (e) => {
    e.preventDefault();

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            const coordsData = {
                lat: coords.latitude,
                long: coords.longitude
            }

            websocket.send(coordsData);
            writeToScreen(`
                <a
                    href="https://www.openstreetmap.org/#map=18/" + coordsData.lat + "/" + coordsData.long
                    target="_blank"
                >
                    Посмотреть на карте
                </a>
                <br />
                Ширина: ${coordsData.lat} <br />Долгота: ${coordsData.long}
            `);
        });
    }
});
