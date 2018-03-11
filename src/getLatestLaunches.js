'use strict';

//Class for getting posts from API
class GetLaunches {
    constructor() {
        this.url = "https://api.spacexdata.com/v2/launches/all";
    }

     //Fetch posts from Api
     async get() {
        const response = await fetch(this.url);

        const responseData = await response.json();
        return responseData;
    }
}

//Export class
export { GetLaunches }