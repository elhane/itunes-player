export const radioPlayerInit = () => {
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radio = document.querySelector('.radio');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolume = document.querySelector('.radio-volume');
  const radioVolumeDownBtn = document.querySelector('.radio-icon--down');
  const audio = new Audio();
  audio.type = 'audio/aac';
  let lastVolumeValue = audio.volume;
  
  radioStop.disabled = true;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  }

  const selectItem = element => {
    radioItem.forEach((item) => {item.classList.remove('select')});
    element.classList.add('select');
  }

  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;
    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStation;
    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();

    radioVolume.volume = 0.5;
  })

  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
    lastVolumeValue = audio.volume;
    console.log('lastVolumeValue in radioVolume: ', lastVolumeValue);
  });

  radioVolume.value = radioVolume.value * 100;

  radioVolumeDownBtn.addEventListener('click', () => {
    if (radioVolumeDownBtn.classList.contains('fa-volume-down')) {
      radioVolumeDownBtn.classList.remove('fa-volume-down');
      radioVolumeDownBtn.classList.add('fa-volume-off');
      audio.volume = 0;
      radioVolume.value = 0;
    } else {
      radioVolumeDownBtn.classList.remove('fa-volume-off');
      radioVolumeDownBtn.classList.add('fa-volume-down');
      audio.volume = lastVolumeValue;
      radioVolume.value = lastVolumeValue * 100;
    }
  });
};