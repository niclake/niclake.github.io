export function colorpick(){
  const colors = [
    window.getComputedStyle(document.documentElement).getPropertyValue('--red'),
    window.getComputedStyle(document.documentElement).getPropertyValue('--orange'),
    window.getComputedStyle(document.documentElement).getPropertyValue('--yellow'),
    window.getComputedStyle(document.documentElement).getPropertyValue('--green'),
    window.getComputedStyle(document.documentElement).getPropertyValue('--cyan'),
    window.getComputedStyle(document.documentElement).getPropertyValue('--purple'),
    window.getComputedStyle(document.documentElement).getPropertyValue('--pink')
  ];

  var masthead1 = colors[Math.floor(Math.random() * colors.length)];
  var masthead2 = colors[Math.floor(Math.random() * colors.length)];
  do {
    masthead2 = colors[Math.floor(Math.random() * colors.length)];
  } while (masthead1 === masthead2);

  var navBrand = document.querySelector('.navbar-brand');
  navBrand.getElementsByClassName('monogram-left')[0].style.fill = masthead1;
  navBrand.getElementsByClassName('monogram-right')[0].style.fill = masthead2;

  var sig1 = colors[Math.floor(Math.random() * colors.length)];
  var sig2 = colors[Math.floor(Math.random() * colors.length)];
  do {
    sig2 = colors[Math.floor(Math.random() * colors.length)];
  } while (sig1 === sig2);

  var entry = document.querySelector('.entry');
  if (entry !== null) {
    entry.getElementsByClassName('monogram-left')[0].style.fill = sig1;
    entry.getElementsByClassName('monogram-right')[0].style.fill = sig2;
  }

  var home = document.querySelector('.home');
  if (home !== null) {
    home.getElementsByClassName('monogram-left')[0].style.fill = sig1;
    home.getElementsByClassName('monogram-right')[0].style.fill = sig2;
  }
};

colorpick();