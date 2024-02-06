//mouse
const circle = document.getElementById('circle');
circle.style.pointerEvents = 'none';

document.addEventListener('mousemove', (e) => { 
    const height = circle.offsetHeight;
    const width = circle.offsetWidth;

    setTimeout(function() { 
        circle.style.left = `${e.clientX - width/2}px`;
        circle.style.top = `${e.clientY - height/2}px`;
    }, 35);
});

//Alternating text
const texts = ['Welcome!', 'Bienvenue!', 'Bienvenido!', '!أهلا بكم'];
const element = document.getElementById('alternating-text');

let i = parseInt(localStorage.getItem('currentIndex')) || 0;
const listener = e => {
  i = i < texts.length - 1 ? i + 1 : 0 ;
  localStorage.setItem('currentIndex', i)
  element.innerHTML = texts[i];
};
element.innerHTML = texts[i];
element.addEventListener( 'animationiteration' , listener, false);