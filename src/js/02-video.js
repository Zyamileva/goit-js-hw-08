import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let getTimeUpdate = function (timeUpdate) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(timeUpdate.seconds)
  );
};

player.on('timeupdate', throttle(getTimeUpdate, 1000));

let current_time = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(JSON.parse(current_time)).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      current_time = 0;
      break;
    default:
      console.div(error);
      break;
  }
});
