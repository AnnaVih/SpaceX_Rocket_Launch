'use strict';

//Class for getting posts from API
class GetRocketDetails {
    constructor(rocketId) {
        this.rocketId = rocketId;
    }

     //Fetch posts from Api
     async get() {
        const response = await fetch(`https://api.spacexdata.com/v2/rockets/${this.rocketId}`);

        const responseData = await response.json();
        return responseData;
    }
}

//Export class
export { GetRocketDetails }