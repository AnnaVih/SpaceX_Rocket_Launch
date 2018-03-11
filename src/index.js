require('bootstrap');

require('./scss/style.scss');

//Importing classes
import { GetLaunches } from './getLatestLaunches';

import { LastestLaunchesUI } from './latestLaunchesUI';


const latestLaunchesUI = new LastestLaunchesUI();

function getPhotoPosts() {
    console.log('start getting');
    //1. Make instance of GetPosts
    const launches = new (GetLaunches);

    //2.Getting data from promises
    launches.get()
              .then((postsResult) => {
                latestLaunchesUI.displayPosts(postsResult);
              })
              //4.1 Catch error in case if no weather data recieved
              .catch((err) => {
                console.log(err);
            });
}


/******************  EVENT LISTENERS  ***********************
 ***********************************************************/

//On load Event listeners
document.addEventListener("DOMContentLoaded", getPhotoPosts);
