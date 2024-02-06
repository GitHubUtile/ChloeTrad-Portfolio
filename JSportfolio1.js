const menu = document.getElementById('menu');
const btn = document.getElementById('btn');
const circle = document.getElementById('circle');

btn.addEventListener('click', () => {
    menu.classList.toggle('open');
});

document.addEventListener('mousemove', (e) => {
    const height = circle.offsetHeight;
    const width = circle.offsetWidth;

    if (e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.parentNode.tagName === 'BUTTON') {
        circle.classList.add('big');
    } else {
        circle.classList.remove('big');
    }

    setTimeout(() => { 
        circle.style.left = `${e.clientX - width/2}px`;
        circle.style.top = `${e.clientY - height/2}px`;
    }, 20);
});