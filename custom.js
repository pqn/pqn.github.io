// Code highlighting
hljs.initHighlightingOnLoad();

// Scrolling reveal animations
// Fancy pixelation of images
// Sticky menu
// Nice anchor scrolling from https://css-tricks.com/snippets/jquery/smooth-scrolling/ with some modifications
$(function () {
  $('#nav').fixedsticky();
  window.sr = new scrollReveal();
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: Math.min(target.offset().top, $(document).height() - $(window).height())
        }, 1000);
        return false;
      }
    }
  });
});
$(window).load(function () {
  document.getElementById('portrait').closePixelate([
    {
      shape: 'square',
      resolution: 4,
      size: 4,
      offset: 0,
      alpha: 0.8
        },
    {
      shape: 'diamond',
      resolution: 4,
      size: 4,
      offset: 2,
      alpha: 0.5
        }
    ]);
});

// Beam effect only if not in Firefox
function Beam() {
  this.init();
}

Beam.prototype = {
  init: function () {
    this.alive = true;
    this.phase = 0;
    this.y1 = random(0.1, 0.9);
    this.y2 = random(0.1, 0.5);
    if (random(-1, 1) < 0) {
      this.factor = -1;
      if (this.y1 + this.y2 > 0.9) {
        this.factor = 1;
      }
    } else {
      this.factor = 1;
      if (this.y1 - this.y2 < 0.1) {
        this.factor = -1;
      }
    }
    this.thick = random(50, 100);
    this.cross1 = random(0.2, 0.8);
    this.speed = random(0.5, 2);
    var colors = ['#284763', '#3a658e', '#ff833d', '#d92926', '#e3605d', '#fffc98'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  },

  move: function () {
    this.phase += 0.003 * this.speed;
    this.alive = this.phase <= 1;
  },

  draw: function (ctx) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    var parallax = -Math.min($(document).scrollTop(), h) / h * 7 * (this.thick - 50);
    ctx.fillStyle = tinycolor(this.color).desaturate(Math.min($(document).scrollTop(), h) / h * 100).toString();
    ctx.beginPath();
    if (this.phase <= 1 / 2) {
      ctx.moveTo(0, this.y1 * h - this.factor * this.thick / 2 + parallax);
      ctx.lineTo(-this.thick / Math.sqrt(3), this.y1 * h + this.factor * this.thick / 2 + parallax);
      if (this.phase < 1 / 6) {
        var phase2 = Math.pow(Math.sin((this.phase * 6) * Math.PI / 2), 2);
        ctx.lineTo(phase2 * this.cross1 * w, this.y1 * h + this.factor * this.thick / 2 + parallax);
        ctx.lineTo(phase2 * this.cross1 * w + this.thick / Math.sqrt(3), this.y1 * h - this.factor * this.thick / 2 + parallax);
      } else if (this.phase < 1 / 3) {
        var phase2 = Math.pow(Math.sin((this.phase * 6 - 1) * Math.PI / 2), 2);
        ctx.lineTo(this.cross1 * w, this.y1 * h + this.factor * this.thick / 2 + parallax);
        ctx.lineTo(this.cross1 * w + this.thick / Math.sqrt(3) + this.y2 * h * phase2 / Math.sqrt(3), (this.y1 - this.y2 * this.factor * phase2) * h - this.factor * this.thick / 2 + parallax);
        ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3) + this.y2 * h * phase2 / Math.sqrt(3), (this.y1 - this.y2 * this.factor * phase2) * h - this.factor * this.thick / 2 + parallax);
        ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3), this.y1 * h - this.factor * this.thick / 2 + parallax);
      } else {
        var phase2 = Math.pow(Math.sin((this.phase * 6 - 2) * Math.PI / 2), 2);
        ctx.lineTo(this.cross1 * w, this.y1 * h + this.factor * this.thick / 2 + parallax);
        ctx.lineTo(this.cross1 * w + this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3) - this.thick / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
        ctx.lineTo((this.cross1 * w + this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3) - this.thick / Math.sqrt(3)) * (1 - phase2) + w * phase2, (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
        ctx.lineTo((this.cross1 * w + this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3)) * (1 - phase2) + (w + this.thick / Math.sqrt(3)) * phase2, (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
        ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
        ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3), this.y1 * h - this.factor * this.thick / 2 + parallax);
      }
    } else if (this.phase < 2 / 3) {
      var phase2 = Math.pow(Math.sin((this.phase * 6 - 3) * Math.PI / 2), 2);
      ctx.moveTo((this.cross1 * w - this.thick / Math.sqrt(3)) * phase2, this.y1 * h - this.factor * this.thick / 2 + parallax);
      ctx.lineTo(-this.thick / Math.sqrt(3) * (1 - phase2) + (this.cross1 * w - this.thick * 2 / Math.sqrt(3)) * phase2, this.y1 * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(this.cross1 * w, this.y1 * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(this.cross1 * w + this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3) - this.thick / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(w, (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(w + this.thick / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
      ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
      ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3), this.y1 * h - this.factor * this.thick / 2 + parallax);
    } else if (this.phase < 5 / 6) {
      var phase2 = Math.pow(Math.sin((this.phase * 6 - 4) * Math.PI / 2), 2);
      ctx.moveTo(this.cross1 * w - this.thick * 2 / Math.sqrt(3) + this.y2 * h / Math.sqrt(3) * phase2, this.y1 * h + this.factor * this.thick / 2 - this.y2 * this.factor * h * phase2 + parallax);
      ctx.lineTo(this.cross1 * w + this.y2 * h / Math.sqrt(3) * phase2, this.y1 * h + this.factor * this.thick / 2 - this.y2 * this.factor * h * phase2 + parallax);
      ctx.lineTo(this.cross1 * w + this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3) - this.thick / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(w, (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(w + this.thick / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
      ctx.lineTo(this.cross1 * w - this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
    } else {
      var phase2 = Math.pow(Math.sin((this.phase * 6 - 5) * Math.PI / 2), 2);
      ctx.moveTo((this.cross1 * w - this.thick * 2 / Math.sqrt(3) + this.y2 * h / Math.sqrt(3)) * (1 - phase2) + w * phase2, this.y1 * h + this.factor * this.thick / 2 - this.y2 * this.factor * h + parallax);
      ctx.lineTo(w, (this.y1 - this.y2 * this.factor) * h + this.factor * this.thick / 2 + parallax);
      ctx.lineTo(w + this.thick / Math.sqrt(3), (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
      ctx.lineTo((this.cross1 * w - this.thick / Math.sqrt(3) + this.y2 * h / Math.sqrt(3)) * (1 - phase2) + (w + this.thick / Math.sqrt(3)) * phase2, (this.y1 - this.y2 * this.factor) * h - this.factor * this.thick / 2 + parallax);
    }
    ctx.closePath();
    ctx.fill();
  }
};

if (navigator.userAgent.toLowerCase().indexOf('firefox') <= -1) {
  setTimeout(function () {
    var beams = [];
    var MAX = 5;

    var coolAnim = Sketch.create({
      container: document.getElementById('pretty'),
      autopause: false
    });

    coolAnim.update = function () {

      var i, particle;

      beams.sort(function (a, b) {
        return a.thick - b.thick;
      });

      for (i = beams.length - 1; i >= 0; i--) {

        beam = beams[i];

        if (beam.alive) beam.move();
        else beams.splice(i, 1);
      }
      if (random(1) < 0.04 && beams.length < MAX) {
        beams.push(new Beam());
      }
    };

    coolAnim.draw = function () {

      coolAnim.globalCompositeOperation = 'screen';

      for (var i = beams.length - 1; i >= 0; i--) {
        beams[i].draw(coolAnim);
      }
    };
  }, 500);
}