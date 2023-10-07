const spoiler = document.querySelector('#spoiler');
const button = document.querySelector('#myBtn');

const closeModal = (e) => {
  if (e.code === 'Escape') {
    spoiler.classList.add('closed');
  };
};

const toggleModal = () => {
  spoiler.classList.toggle('closed');
  if (!spoiler.classList.contains('closed')) {
    document.addEventListener('keydown', closeModal);
  } else {
    document.removeEventListener('keydown', closeModal);
  }
};

button.addEventListener('click', toggleModal);
