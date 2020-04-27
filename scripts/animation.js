let whiteScreen = document.querySelector('.white-sheet');
let formShape = document.querySelector('.form-shape');
let cross = document.querySelector('#cross');
let md = window.matchMedia('(min-width: 768px)');

cross.addEventListener('click', e => {
  (cross.style.transform == 'rotate(45deg)') ? pushOut() : pullIn();
});

whiteScreen.addEventListener('click', e => {
  if (cross.style.transform == 'rotate(45deg)') pushOut();
});

function pullIn() {
  cross.style.transform = 'rotate(45deg)';
  whiteScreen.style.right = 0;
  formShape.style.right = 0;
}

function pushOut() {
  cross.style.transform = 'rotate(0)';
  whiteScreen.style.right = '-100vw';
  formShape.style.right = md.matches ? '-470px' : '-300px';
}
