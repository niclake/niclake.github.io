var colors = ['#ff5555', '#ffb86c', '#f1fa8c', '#50fa7b', '#8be9fd', '#bd93f9', '#ff79c6'];

var masthead1 = colors[Math.floor(Math.random() * colors.length)];
var masthead2 = colors[Math.floor(Math.random() * colors.length)];
var sig1 = colors[Math.floor(Math.random() * colors.length)];
var sig2 = colors[Math.floor(Math.random() * colors.length)];

do {
  masthead2 = colors[Math.floor(Math.random() * colors.length)];
} while (masthead1 === masthead2);

do {
  sig2 = colors[Math.floor(Math.random() * colors.length)];
} while (sig1 === sig2);

var entry = document.querySelector('.navbar-brand');
entry.getElementsByClassName('monogram-left')[0].style.fill = masthead1;
entry.getElementsByClassName('monogram-right')[0].style.fill = masthead2;

var entry = document.querySelector('.entry');
if (entry !== null) {
  entry.getElementsByClassName('monogram-left')[0].style.fill = sig1;
  entry.getElementsByClassName('monogram-right')[0].style.fill = sig2;
}
