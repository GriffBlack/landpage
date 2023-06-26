const entities = [
  {
    city: 'Rostov-on-Don',
    lcd: 'LCD admiral',
    area: 81,
    time: 3.5,
    img: 'slider',
    active: true
    
  },
  {
      city: 'Sochi',
    lcd: 'Thieves',
    area: 105,
    time: 4,
    img: 'slider_2.1',
    active: false
    
  },
  {
    city: 'Rostov-on-Don',
    lcd: 'Patriotic',
    area: 93,
    time: 3,
    img: 'slider_3.1',
    active: false
  }
]

document.addEventListener("DOMContentLoaded", init(), { passive: false });

function init() {
  render();
  initArrows();
  initDots();
  initNavLi();
}

function render() {
  let count = 0;
  let menu_li = document.querySelectorAll('.section__2__li');
  let city = document.querySelector(".city");
  let area = document.querySelector(".area");
  let time = document.querySelector(".time");
  let img = document.querySelector(".section__2__slider__img");
  document.querySelectorAll(".section__2__slider__dot").forEach(dot => {
    dot.setAttribute("data-index", count);
    if (entities[count].active) {
      dot.classList.add('select_dot');
      menu_li[count].classList.add('active_li');
      city.innerHTML = entities[count].city + '<br>' + entities[count].lcd;
      area.innerHTML = entities[count].area + ' m2';
      time.innerHTML = entities[count].time + ' months';
      img.setAttribute("src", `./src/images/${entities[count].img}.jpg`);
    } else {
      dot.classList.remove('select_dot');
      menu_li[count].classList.remove('active_li');
    }
    if (count < entities.length - 1) count++;
  });
  count = 0;
}

function step(round) {
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].active) {
        if (round > 0) {
          if (i != entities.length - 1) {
            entities[i].active = false;
            entities[i + 1].active = true;
            return;
          } else {
            entities[i].active = false;
            entities[0].active = true;
            return;
          }
        } else {
          if (i != 0) {
            entities[i].active = false;
            entities[i - 1].active = true;
            return;
          } else {
            entities[i].active = false;
            entities[entities.length - 1].active = true;
            return;
          }
        }
      }
    }
}

function initArrows() {
  document.querySelector(".slider__prev").onclick = function(evn) {
    evn.preventDefault();
    step(-1);
    render();
}
  document.querySelector(".slider__next").onclick = function (evn) {
    evn.preventDefault();
    step(1);
    render();
  }
}

function initDots() {
  document.querySelectorAll(".section__2__slider__dot").forEach(dot => {
    dot.onclick = function (evn) {
      evn.preventDefault();
      entities.forEach(st => st.active = false);
      entities[this.dataset.index].active = true;
      render();
    }
  });
}

function initNavLi() {
  let count = 0;
  document.querySelectorAll(".section__2__li").forEach(nav => {
    nav.setAttribute("data-index", count);
    count++;
    nav.onclick = function (evn) {
      evn.preventDefault();
      entities.forEach(st => st.active = false);
      entities[this.dataset.index].active = true;
      render();
    }
  });
}