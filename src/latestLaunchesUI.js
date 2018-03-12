'use strict';   

export class LastestLaunchesUI {
    constructor() {
        this.launchesWrapper = document.querySelector('#launches-wrapper');
        this.launchModal     = document.querySelector('#modal');
        this.rocketHeight;
        this.rocketMass;
        this.rocketStage;
        this.rocketDescr;
    }


    /***************************************************
    *******************  METHODS  *********************/

    displayPosts(launches){
        //1. Create dynamic launch variable
        let  dynamicLaunches = '', dinamicModal = '';
        console.log(launches);

        //2. Create id variable
        let idElem = 0;

        //3. Loop over all launches and display just last 10
        for(let i = launches.length -1; i >= launches.length - 10; --i ) {

            const launch =  launches[i];

             //4. Destructure data from recieved object into variables
            const { flight_number, launch_date_utc, links, rocket, details, launch_site, launch_success } = launch;

            //5. Call methods to get normal date and time from utc format
            const fullDateAndTimeOfLaunch =  this.convertUtcDateToNormal(launch_date_utc);

            //6. Check for upcomming or past launches
            const statMessage = this.checkForIncomingOrPastLaunches(launch_date_utc);

            //7. Create html snippet with dinamic data received from API
            dynamicLaunches += `
                                <div class="row mt-3 launch">
                                    <div class="col-3 p-2">
                                            <p><span class="generic">Flight number</span> :<br><span class="flight-num"> ${flight_number}</span></p>
                                    </div>
                                    <div class="col-9">
                                        <div class="row">
                                            <div class="col-12 mt-3">
                                                <p> 
                                                    <span class="rocket-name">${rocket.rocket_name}</span><br>
                                                    ${statMessage.statusMessage} &rarr;<span class="generic"> Success status:</span> ${statMessage.status === false ? 'WAITING...' : launch_success}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-6 col-sm-4">
                                                <p><span class="generic">Launch date:</span><br> ${fullDateAndTimeOfLaunch.date} ${fullDateAndTimeOfLaunch.month}, ${fullDateAndTimeOfLaunch.year}</p>
                                            </div>
                                            <div class="col-6 col-sm-4">
                                                <p><span class="generic">Launch time:</span><br> ${fullDateAndTimeOfLaunch.hour}:${fullDateAndTimeOfLaunch.minut}</p>
                                            </div>
                                            <div class="col-sm-4 ">
                                                <p>
                                                    <button type="button" data-toggle="modal" data-target="#flight-${flight_number}"class="btn btn-outline-danger btn-block details" data-rocket="${rocket.rocket_id}" id="${idElem}">More details</button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade" id="flight-${flight_number}" tabindex="-1" role="dialog"    aria-labelledby="flight-${flight_number}-label" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="flight-${flight_number}-label">Launch details</h5>
                                            </div>
                                            <div class="modal-body">
                                                <p>
                                                    <span class="generic">Details:</span> ${details ? details : ' No info about this launch'}
                                                </p>
                                                ${links.mission_patch ? `<p><img class="mission_patch" src="${links.mission_patch} alt="Mission patch"/></p>` : ''}

                                                <p class="mt-3">
                                                    <span class="generic">Launch site name: </span> ${launch_site.site_name}
                                                </p>
                                                <p>
                                                    <span class="generic">Rocket name: </span><span>${rocket.rocket_name}</span><br>
                                                    <span class="generic">Rocket id: </span><span>${rocket.rocket_id}</span>
                                                <p>
                                                <div class="row">
                                                    <div class="col-4">
                                                        <p><span class="generic">HEIGHT: </span><span class="rocket-height"></span></p>
                                                    </div>
                                                    <div class="col-4">
                                                        <p><span class="generic">MASS: </span><span class="rocket-mass"></span></p>
                                                    </div>
                                                    <div class="col-4">
                                                        <p><span class="generic">STAGES: </span><span class="rocket-stage"></span></p>
                                                    </div>
                                                </div>
                                                <hr>
                                                <p><span class="rocket-descr"></span></p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

                            //8. Assign html snippet to wrapper
                            this.launchesWrapper.innerHTML = dynamicLaunches;

                            //9. Increment id
                            idElem += 1;

                            //10. Set rocket name-and-id node element 
                            this.rocketHeight = document.querySelectorAll('.rocket-height');
                            this.rocketMass   = document.querySelectorAll('.rocket-mass');
                            this.rocketStage  = document.querySelectorAll('.rocket-stage');
                            this.rocketDescr  = document.querySelectorAll('.rocket-descr');
        };
    }


    getRocketDetails(rocketDetails, idEl){
        //1. Destructure variables from data
        const { height, mass, stages, description } = rocketDetails;
        console.log(rocketDetails);

        //2. Convert mass killograms number with comma
        const kg = this.formatNumberWithAddingComma(mass.kg);

        //2. Set rocket details 
        this.rocketHeight[idEl].innerHTML = `${height.meters} meters`;
        this.rocketMass[idEl].innerHTML   = `${kg} kg`;
        this.rocketStage[idEl].innerHTML  = stages;
        this.rocketDescr[idEl].innerHTML  = description;
       
    }


    convertUtcDateToNormal(utcDate) {
        //1. Get launch date from UTC date
        const launchDate = new Date(utcDate);

        //2. Create array of days and months name
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"];

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        //3.Getting day, months, date, year and time
        const day   = dayNames[launchDate.getDay()];

        const month = monthNames[launchDate.getMonth()];

        const date  = launchDate.getUTCDate();

        const year  = launchDate.getUTCFullYear();

        const hour  = launchDate.getUTCHours() < 10 ? '0' + launchDate.getUTCHours() : launchDate.getUTCHours();

        const minut = launchDate.getUTCMinutes() < 10 ? '0' + launchDate.getUTCMinutes() : launchDate.getUTCMinutes();

        //4. Return date and time
        return {
            day,
            month,
            date,
            year,
            hour,
            minut
        }
    }


    checkForIncomingOrPastLaunches(launchDateUTC) {
        //1. Get current date
        const currentDate = new Date();

        //2. Convert UTC to normal date
        const launchDate = new Date(launchDateUTC);

        //3. Compare both date and assign status
       const result = launchDate > currentDate ? {statusMessage:'It is a upcoming launch', status: false }: { statusMessage:'It is a past launch, check it\'s status', status: true };

       //4. Return statusMessage
       return result;
    }

    formatNumberWithAddingComma(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

}