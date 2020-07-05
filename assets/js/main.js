
// SIDEBAR
function openNav() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    document.getElementById("brainster-sidebar").style.width = "100vw";
  } else {
    document.getElementById("brainster-sidebar").style.width = "300px";
  }
}
function closeNav() {
  document.getElementById("brainster-sidebar").style.width = "0";
}
// END OF SIDEBAR

// SELECT FORM
$(document).ready(function () {
  $(".select").click(function () {
    $(".select-menu").toggleClass("showMenu");
    $(".select-menu > li").click(function () {
      $(".select > p").text($(this).text());
      $(".select-menu").removeClass("showMenu");
    });
  });
});
$(document).ready(function () {
  $(".select, .select-menu").click(function () {
    $(".select .fa-chevron-down").toggleClass("rotate180");
  });
});
$(document).mouseup(function (clickOutside) {
  var container = $(".select-menu, .select, .fa-chevron-down");
  if (!container.is(clickOutside.target) && container.has(clickOutside.target).length === 0) {
    container.removeClass("showMenu rotate180");
  }
});
// // // END OF SELECT FORM

// // // FILTER + PAGINATION

function designCard(index) {
  return `<div class="filterCard design-card">
<a href="#">
  <div class="thumbnail ">
    <div class="card card-${index}"></div>
    <div class="caption">
      <span class="label label-design">Академија за дизајн</span>
      <h4><strong>Име на проектот стои овде во две линии</strong></h4>
      <p>Краток опис во кој студентите ке можат да опишат за што се работи во проетктот.</p>
      <small><strong><em>Април - Октомври 2019</em></strong></small>
      <div class="button d-flex">
        <a class="btn">Дознај повеќе</a>
      </div>
    </div>
  </div>
</a>
</div>`
}

function programmingCard(index) {
  return `<div class="filterCard programming-card">
<a href="#">
  <div class="thumbnail ">
    <div class="card card-${index}"></div>
    <div class="caption">
      <span class="label label-programming">Академија за програмирање</span>
      <h4><strong>Име на проектот стои овде во две линии</strong></h4>
      <p>Краток опис во кој студентите ке можат да опишат за што се работи во проетктот.</p>
      <small><strong><em>Април - Октомври 2019</em></strong></small>
      <div class="button d-flex">
        <a class="btn">Дознај повеќе</a>
      </div>
    </div>
  </div>
</a>
</div>`
}

function marketingCard(index) {
  return `<div href="#" class="filterCard marketing-card">
<a href="#">
  <div class="thumbnail ">
    <div class="card card-${index}"></div>
    <div class="caption">
      <span class="label label-marketing">Академија за маркетинг</span>
      <h4><strong>Име на проектот стои овде во две линии</strong></h4>
      <p>Краток опис во кој студентите ке можат да опишат за што се работи во проетктот.</p>
      <small><strong><em>Април - Октомври 2019</em></strong></small>
      <div class="button d-flex">
        <a class="btn">Дознај повеќе</a>
      </div>
    </div>
  </div>
</a>
</div>`
}

const numOfMarketingCards = 6;
const numOfDesignCards = 4;
const numOfProgrammingCards = 10;
let cardsLoaded = 0;
const PAGE_SIZE = 6;


function loadProjects() {
  let cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  console.log(cardContainer);
  loadMarketingCards(true);
  loadDesignCards(true);
  loadProgrammingCards(true);

  if (window.innerWidth < 991) {
    cardElements = [].slice.call(document.getElementsByClassName('filterCard'));
    for (let i = 6; i < cardElements.length; i++) {
      cardElements[i].style.display = 'none'
    }
    cardsLoaded = 6;


    if (numOfDesignCards + numOfMarketingCards + numOfProgrammingCards < PAGE_SIZE) {
      document.getElementById('loadMore').style.display = 'none';
      document.getElementById('toTop').style.display = 'block';
    }

  }
}

function loadMarketingCards(shouldAdd = false) {
  let cardContainer = document.getElementById('card-container');
  if (!shouldAdd) cardContainer.innerHTML = '';
  for (let i = 0; i < numOfMarketingCards; i++) {
    cardContainer.innerHTML += marketingCard(i + 1);
  }
  hideExcessCards(numOfMarketingCards);
}

function loadDesignCards(shouldAdd = false) {
  let cardContainer = document.getElementById('card-container');
  if (!shouldAdd) cardContainer.innerHTML = '';
  for (let i = 0; i < numOfDesignCards; i++) {
    cardContainer.innerHTML += designCard(i + 1);
  }
  hideExcessCards(numOfDesignCards);
}

function loadProgrammingCards(shouldAdd = false) {
  let cardContainer = document.getElementById('card-container');
  if (!shouldAdd) cardContainer.innerHTML = '';
  for (let i = 0; i < numOfProgrammingCards; i++) {
    cardContainer.innerHTML += programmingCard(i + 1);
  }
  hideExcessCards(numOfProgrammingCards);
}

function hideExcessCards(numberOfInitialElements) {
  if (numberOfInitialElements > PAGE_SIZE) {
    document.getElementById('loadMore').style.display = 'block';
    document.getElementById('toTop').style.display = 'none';
  } else {
    document.getElementById('loadMore').style.display = 'none';
    document.getElementById('toTop').style.display = 'block';
  }
  if (window.innerWidth < 991) {
    cardElements = [].slice.call(document.getElementsByClassName('filterCard'));
    for (let i = 6; i < cardElements.length; i++) {
      cardElements[i].style.display = 'none'
    }
    cardsLoaded = 6;
  }
}

function loadMore() {
  cardElements = [].slice.call(document.getElementsByClassName('filterCard'));
  nextCards = cardsLoaded + 6;
  endLimit = nextCards > cardElements.length ? cardElements.length : nextCards;

  for (let i = cardsLoaded; i < endLimit; i++) {
    cardElements[i].style.display = 'block';
  }
  cardsLoaded += 6;

  if (cardsLoaded >= cardElements.length) {
    document.getElementById('loadMore').style.display = 'none';
    document.getElementById('toTop').style.display = 'block';
  }
}

let selected = "";
let selectedFilter = "";

function loadCategoryProjects(category) {
  selectedFilter = category;
  if (selected === category) {
    category = "";
    selectedFilter = "";
  }
  selected = category;
  switch (selected) {
    case 'marketing':
      loadMarketingCards();
      break;
    case 'design':
      loadDesignCards();
      break;
    case 'programming':
      loadProgrammingCards();
      break;
    default:
      loadProjects();
      break;
  }
}

window.onload = loadProjects();

let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName(" filters");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");

    let sameButtonClicked = current[0] === this;

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
      if (!sameButtonClicked) {
        this.className += " active";
      }
    } else {
      this.className += " active";
    }
  });
}

// // // END OF FILTER + PAGINATION

// // // TO-TOP BUTTON 

$(document).ready(function () {
  $("#toTop").on('click', function (scroll) {
    scroll.preventDefault();
    $('body,html').animate(
      { scrollTop: '0px' },
      { duration: 850, easing: 'linear' })
  });
});