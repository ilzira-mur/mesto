console.log(2 + 3);

let buttonShow = document.querySelector('.info__button_open');
let buttonHide = document.querySelector('.popup__button_type_close');
let popup = document.querySelector('.popup');

buttonShow.addEventListener ('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  })

buttonHide.addEventListener ('click', function() {
  popup.classList.remove('popup_opened');
  })


  let formElement = document.querySelector('.popup__form');
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_about');
  
  function formSubmitHandler (evt) {
      evt.preventDefault(); 
      document.querySelector('.info__name').textContent = nameInput.value;
      document.querySelector('.info__about').textContent = jobInput.value;
      popup.remove('popup_is-opened');
  }

  formElement.addEventListener('submit', formSubmitHandler); 


