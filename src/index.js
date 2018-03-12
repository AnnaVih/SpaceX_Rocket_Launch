require('bootstrap');

require('./scss/style.scss');

//Importing classes
import { GetLaunches } from './getLatestLaunches';

import { LastestLaunchesUI } from './latestLaunchesUI';

import { GetRocketDetails } from './getRocketDetails';


const latestLaunchesUI = new LastestLaunchesUI();

function getLatestLaunches() {
    //1. Make instance of GetPosts
    const launches = new GetLaunches();

    //2.Getting data from promises
    launches.get()
              .then(launchesResult => {
                latestLaunchesUI.displayPosts(launchesResult);
              })
              //3. Catch error in case if no weather data recieved
              .catch( err => {
                console.log(err);
              });
}

function getRocketInfo(e) {
    //1.Check if target element is button with class details
    if(e.target.classList.contains('details')){

    //2. Get data-rocket value
    const rocketId = e.target.dataset.rocket;

    //3. Make instance of GetRocketsDetails and pass racketId
    const rocketInfo = new GetRocketDetails(rocketId);

    //4. Get ID of element
    const elementId = e.target.id;

     //5.Get data from promises and call getRocketDetails method to display details
     rocketInfo.get()
               .then(rocketInfo => {
                  latestLaunchesUI.getRocketDetails(rocketInfo, elementId);
               })
               //5. Catch error in case if no weather data recieved
               .catch( err => {
                 console.log(err);
               });

   }

}


/******************  EVENT LISTENERS  ***********************
 ***********************************************************/

//On load Event listeners
document.addEventListener("DOMContentLoaded", getLatestLaunches);

document.getElementById('launches-wrapper').addEventListener("mouseover", getRocketInfo);

