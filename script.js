document.addEventListener("DOMContentLoaded", () => {
  let items = [
    {id: 1, imgNr: 1, option: 'men', name: 't-shirt', price: 5, sizes: ['s', 'm', 'l'], colors: ['#165eb9', 'yellow', '#535253']},
    {id: 2, imgNr: 2, option: 'men', name: 'pants forclaz', price: 30, sizes: ['m', 'l'], colors: []},
    {id: 3, imgNr: 3, option: 'men', name: 'backpack', price: 60, sizes: '10 litri', colors: []},
    {id: 4, imgNr: 4, option: 'women', name: 'giacket', price: 60, sizes: ['s', 'm'], colors: []},
    {id: 5, imgNr: 5, option: 'women', name: 'trekking shoes', price: 80, sizes: ['s', 'm', 'l'], colors: []},
    {id: 6, imgNr: 6, option: 'women', name: 't-shirt', price: 20, sizes: ['s', 'm', 'l'], colors: ['pink']},
    {id: 7, imgNr: 7, option: 'children', name: 'shoes', price: 59, sizes: ['s', 'm'], colors: []},
    {id: 8, imgNr: 8, option: 'children', name: 'pants', price: 49, sizes: ['s', 'm', 'l'], colors: ['blue', 'yellow', 'green']},
    {id: 9, imgNr: 9, option: 'children', name: 't-shirt', price: 10, sizes: ['m', 'l'], colors: ['grey', 'yellow', 'green']},
    {id: 10, imgNr: 1, option: 'men', name: 't-shirt', price: 15, sizes: ['l'], colors: ['blue', 'yellow', 'grey']},
    {id: 11, imgNr: 3, option: 'men', name: 'test', price: 99, sizes: '15 litri', colors: []},
    {id: 12, imgNr: 0, option: 'men', name: 'test', price: 99, sizes: ['s', 'm'], colors: ['blue', 'yellow', 'green']},
    {id: 13, imgNr: 0, option: 'men', name: 'test', price: 99, sizes: ['m'], colors: ['blue']},
    {id: 14, imgNr: 3, option: 'children', name: 'test', price: 12, sizes: '15 litri', colors: ['grey', 'green']},
    {id: 15, imgNr: 0, option: 'women', name: 'test', price: 32, sizes: ['s', 'm', 'l'], colors: ['grey', 'green']},
    {id: 16, imgNr: 1, option: 'men', name: 'test', price: 99, sizes: ['s', 'm'], colors: ['blue', 'yellow', 'green']},
    {id: 17, imgNr: 2, option: 'men', name: 'test', price: 88, sizes: ['s', ], colors: ['blue', 'green']},
    {id: 18, imgNr: 5, option: 'women', name: 'trekking shoes', price: 20, sizes: ['s', 'l'], colors: []},
    {id: 19, imgNr: 6, option: 'women', name: 't-shirt', price: 10, sizes: ['s', 'l'], colors: ['pink']},
    {id: 20, imgNr: 8, option: 'children', name: 'pants', price: 19, sizes: ['s', 'l'], colors: ['yellow', 'green']},
    {id: 21, imgNr: 9, option: 'children', name: 't-shirt', price: 12, sizes: ['m'], colors: ['grey', 'green']},    
  ]
  let itemsInCart = [];

  function addInCart() {
    let itemsCount = document.querySelector('.item-count');
    let cart = document.querySelector('.open-cart');
    let sum = document.querySelector('.sum');
    let idToFind = this.id;

    let itemOnClick = items.find((el) => el.id == idToFind);
    if(itemsInCart.find((el) => el.id == idToFind) == undefined){
      itemsInCart.push(itemOnClick);
      this.style = 'background: #aa9b77'
    } else {
      let sortedItems = itemsInCart.filter((item) => item.id != idToFind);
      itemsInCart = sortedItems;
      this.style = 'background: #f5f6f7'
    }
    itemsCount.textContent = itemsInCart.length;
    let sumNumber = itemsInCart.reduce((acc, item) => {
      return item.price + acc;
    }, 0);
    sum.textContent = `${sumNumber} €`;

    if(itemsInCart.length < 1) {
      itemsCount.style = 'display: none';
      cart.style = 'display: none';
      sum.style = 'display: none';
    } else {
      itemsCount.style = 'display: block';
      cart.style = 'display: block';
      sum.style = 'display: block';
    }
    console.log(itemsInCart);
  }

  function createCard(item) {
    const colors = item.colors.reduce((acc, color) => {
      return acc += `<span style='background: ${color}'></span>`
    }, '');
    const sizeName =  typeof item.sizes == 'object' ? 'size <i class="fa fa-angle-down fa-lg"></i>' : item.sizes;

    let card = document.createElement('div');
    card.id = item.id;
    card.className = 'card';
    card.innerHTML = `
    <div class="card-header">
        <div class="item-size">${sizeName}<div class='sizes-drop'>(${item.sizes})</div>
        </div>
        <div class="item-colors">${colors}</div>
    </div>
    <div class="card-image">
        <img src='img/items/item${item.imgNr}.png' alt='Item image'>
    </div>
    <div class="card-footer">
        <div class="item-name">${item.name}</div>
        <div class="item-price">${item.price},00€</div>
    </div>
    `;
    card.addEventListener('click', addInCart)
    return card
  }

  function renderCards(items) {
    const menCarusel = document.querySelector('.owl-one'),
          womenCarusel = document.querySelector('.owl-two'),
          childrenCarusel = document.querySelector('.owl-three');

    const menItems = items.filter(item => item.option === 'men');
    const womenItems = items.filter(item => item.option === 'women');
    const childrenItems = items.filter(item => item.option === 'children');

    menItems.forEach(item => {
      menCarusel.append(createCard(item));
    })
    womenItems.forEach(item => {
      womenCarusel.append(createCard(item));
    })
    childrenItems.forEach(item => {
      childrenCarusel.append(createCard(item));
    })

  }
  renderCards(items);


  // Owl Carousels
  $('.owl-one').on('refresh.owl.carousel', (e) => document.querySelector('.men-last-page').textContent = Math.ceil(e.item.count / e.page.size));
  $('.owl-two').on('refresh.owl.carousel', (e) => document.querySelector('.women-last-page').textContent = Math.ceil(e.item.count / e.page.size));
  $('.owl-three').on('refresh.owl.carousel', (e) => document.querySelector('.children-last-page').textContent = Math.ceil(e.item.count / e.page.size));

  $(function() {
      var owl = $(".owl-one");
      owl.owlCarousel({
        items: 3,
        margin: 60,
        loop: true,
        slideBy: 'page',
        nav: true,
        responsive:{
          0:{
            items:1
          },
          640:{
            items:2
          },
          900:{
            items:3
          }
        },
        navText: [
          '<span class="arrow-owl arrow-left arrow-men"><i class="fa fa-chevron-left"></i> </span>',
          '<span class="arrow-owl arrow-right arrow-men"> <i class="fa fa-chevron-right"></i></span>'
        ],
      });
      $('.owl-one').on('changed.owl.carousel', function(e) {
          document.querySelector('.men-current-page').textContent = e.page.index + 1;
      });
  });

  $(function() {
    var owl = $(".owl-two");
    owl.owlCarousel({
      items: 3,
      margin: 60,
      loop: true,
      slideBy: 'page',
      nav: true,
      responsive:{
        0:{
          items:1
        },
        640:{
          items:2
        },
        900:{
          items:3
        }
      },
      navText: [
        '<span class="arrow-owl arrow-left arrow-women"><i class="fa fa-chevron-left"></i> </span>',
        '<span class="arrow-owl arrow-right arrow-women"> <i class="fa fa-chevron-right"></i></span>'
      ],
    });
    $('.owl-two').on('changed.owl.carousel', function(e) {
        document.querySelector('.women-current-page').textContent = e.page.index + 1;
        document.querySelector('.women-last-page').textContent = e.page.count;
    });
  });

  $(function() {
    var owl = $(".owl-three");
    owl.owlCarousel({
      items: 3,
      margin: 60,
      loop: true,
      slideBy: 'page',
      nav: true,
      responsive:{
        0:{
          items:1
        },
        640:{
          items:2
        },
        900:{
          items:3
        }
      },
      navText: [
        '<span class="arrow-owl arrow-left arrow-children"><i class="fa fa-chevron-left"></i> </span>',
        '<span class="arrow-owl arrow-right arrow-children"> <i class="fa fa-chevron-right"></i></span>'
      ],
    });
    $('.owl-three').on('changed.owl.carousel', function(e) {
        document.querySelector('.children-current-page').textContent = e.page.index + 1;
        document.querySelector('.children-last-page').textContent = e.page.count;
    });
  });
  // FILTERS
  const menCheckbox = document.getElementById('men'),
        womenCheckbox = document.getElementById('women'),
        childrenCheckbox = document.getElementById('children');
  const menBlock = document.querySelector('.men-slider'),
        womenBlock = document.querySelector('.women-slider'),
        childrenBlock = document.querySelector('.children-slider'),
        filterBtn = document.querySelector('.filter-btn');

  menCheckbox.addEventListener('change', () => {
    menCheckbox.checked == true ? menBlock.style.display = 'block' : menBlock.style.display = 'none';
  });
  womenCheckbox.addEventListener('change', () => {
    womenCheckbox.checked == true ? womenBlock.style.display = 'block' : womenBlock.style.display = 'none';
  });
  childrenCheckbox.addEventListener('change', () => {
    childrenCheckbox.checked == true ? childrenBlock.style.display = 'block' : childrenBlock.style.display = 'none';
  });
  filterBtn.addEventListener('click', () => {
    const filters = document.querySelector('.filter-checkboxes');
    filters.querySelectorAll('.checkbox').forEach(input => input.checked = true);
    menBlock.style.display = 'block';
    womenBlock.style.display = 'block';
    childrenBlock.style.display = 'block';
  });

  const filterArrow = document.querySelector('.header-arrow'),
        filter = document.querySelector('.filter');

  filterArrow.addEventListener('click', () => {
    if(filter.classList.contains('open')){
      filter.classList.remove('open');
      filter.classList.add('closed');
      filterArrow.innerHTML = '<i class="fa fa-chevron-up fa-2x"></i>'

    } else {
      filter.classList.remove('closed');
      filter.classList.add('open');
      filterArrow.innerHTML = '<i class="fa fa-chevron-down fa-2x"></i>'
    }
  })


});
