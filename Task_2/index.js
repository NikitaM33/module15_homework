const button = document.querySelector('.screenSize__button');

button.addEventListener('click', () => {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;


    alert(`Окно ${w}px в ширину и ${h}px в высоту`);
});
