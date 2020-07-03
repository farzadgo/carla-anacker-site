
const thumbs = document.querySelectorAll('.thumb');
const nav = document.querySelector('.nav');
const main = document.querySelector('.main');
const modal = document.querySelector('.modal');
const gridImgs = document.querySelectorAll('.grid-img');
const modalImg = document.querySelector('.modal-img');
const sliderImgs = document.querySelectorAll('.slider-img');
const closeBtn = document.querySelector('.close-btn');
const sliderBtn = document.querySelectorAll('.slider-btn');
const links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('.section');

async function catchNext(elm, index, id) {
  // console.log(index);
  const response = await fetch(`${id}/image_${index}.jpg`);
  elm.src = response.url;  
}

const nexter = (event) => {
  const parentId = event.target.parentElement.parentElement.id;
  const sliderImg = event.target.parentElement.firstElementChild;
  const sliderLength = parseInt(event.target.parentElement.dataset.length, 10);
  let index = parseInt(sliderImg.id, 10);
  let nextIndex;
  if (event.target.id === "next") {
    index !== sliderLength - 1 ? nextIndex = index + 1 : nextIndex = 0;
  } else {
    index !== 0 ? nextIndex = index - 1 : nextIndex = sliderLength - 1;
  }
  catchNext(sliderImg, nextIndex, parentId);
  sliderImg.id = nextIndex;
}

if (nav) {
  const navHeight = 120;
  nav.style.top = `-${navHeight}px`;
  document.addEventListener('mousemove', e => {
    if (e.clientY < 110) {
      nav.style.top = "0";
    } else {
      nav.style.top = `-${navHeight}px`;
    }
  });
}

if (sliderBtn) {
  sliderBtn.forEach(e => e.addEventListener('click', nexter));
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    modalImg.src = " ";
    main.style.display = "block";
    nav.style.display = "block";
  });
}

sliderImgs.forEach(e => {
  const parentId = e.parentElement.parentElement.id;
  catchNext(e, 0, parentId);
  e.id = 0;
});

gridImgs.forEach((e, i) => {
  e.addEventListener('click', e => {
    main.style.display = "none";
    nav.style.display = "none";
    modal.style.display = "block";
    catchNext(modalImg, i, '1zkb');
    modalImg.id = i;
  });
});

links.forEach(e => {
  e.addEventListener('click', () => {
    document.querySelectorAll('.section').forEach(el => el.style.display = "block");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    // console.log(id);
    if (entry.intersectionRatio > 0) {
      document.querySelector(`.link[href="#${id}"]`).parentElement.classList.add('active');
    } else {
      document.querySelector(`.link[href="#${id}"]`).parentElement.classList.remove('active');
    }
  });
});

sections.forEach(target => {
  observer.observe(target);
});

// window.addEventListener('DOMContentLoaded', () => {
//   // here was observer and its targets
// });





thumbs.forEach(e => {
  const animOne = e.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
  const animTwo = animOne.nextElementSibling;
  e.addEventListener('mouseover', () => {
    animOne.beginElement();
  });
  e.addEventListener('mouseout', () => {
    animTwo.beginElement();
  });
});

