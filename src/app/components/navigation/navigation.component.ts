import { Component, OnInit, Input } from '@angular/core';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { __await } from 'tslib';
import { async } from '@angular/core/testing';
import {} from '@mapbox/mapbox-gl-directions'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  mapboxgl;
  map;
  markerArrival;
  markerDeparture;
  directions;
  displayDirection;

  ngOnInit() {
  /*******MAPBOX*************/
    this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';

    this.map = new this.mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
    this.markerArrival = new this.mapboxgl.Marker()
    this.markerDeparture = new this.mapboxgl.Marker()
  
  /***** MAPQUEST*********/
  var MapboxDirection = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
  this.directions = new MapboxDirection({
      accessToken: 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng',
      unit: 'metric',
      profile: 'mapbox/driving-traffic'
    });
    console.log(this.directions);
    this.map.addControl(this.directions, 'top-left');
  }

  chosenPlaceDeparture= '';
  departure;
  departureLong;
  departureLat;

  async onEnterDeparture(chosenPlace: string) { 
    this.chosenPlaceDeparture = chosenPlace;
    const provider = new OpenStreetMapProvider();
    this.departure = await provider
      .search({ query: this.chosenPlaceDeparture });

    this.chosenPlaceDeparture = this.departure[0].label;
    this.departureLong = this.departure[0].x;
    this.departureLat = this.departure[0].y;

    this.placeMarker(this.markerDeparture,this.departureLong,this.departureLat)
  }

  chosenPlaceArrival= '';
  arrival;
  arrivalLong;
  arrivalLat;

   async onEnterArrival(chosenPlace: string) { 
    this.chosenPlaceArrival = chosenPlace;
    const provider = new OpenStreetMapProvider();
    this.arrival = await provider
    .search({ query: this.chosenPlaceArrival });

    this.chosenPlaceArrival = this.arrival[0].label;
    this.arrivalLong = this.arrival[0].x;
    this.arrivalLat = this.arrival[0].y;
    this.placeMarker(this.markerArrival,this.arrivalLong, this.arrivalLat);
}

placeMarker(marker,longitude,latitude){
  marker
  .remove()
  .setLngLat([longitude,latitude])
  .addTo(this.map);
  // this.markerDeparture.setDraggable(true);
  // a changer et recuperer la position 
}

travel;
 async searchDestination(){
  this.travel = await this.directions.route({
    locations: [
      this.chosenPlaceDeparture,
      this.chosenPlaceArrival
    ],
    maxRoutes: 3,
    timeOverage: 99
  })

console.log(this.travel);
// var lengthArray = this.travel.features.length
// var latitudeArray :string[];
// console.log(lengthArray);
// for(var i; i<lengthArray; i++)
// {
//   latitudeArray[i] = this.travel.features[i].properties.latLng.lat;
//   console.log(latitudeArray[i]);
// }

}

myPosition(){
if (navigator.geolocation){
 navigator.geolocation.getCurrentPosition( this.locationFound.bind(this), this.locationNotFound.bind(this));
}

}

locationFound(position){
  this.placeMarker(this.markerDeparture,position.coords.longitude,position.coords.latitude);
  }

locationNotFound(){
    alert("Votre Position n'a pas été trouvé.")
  }
}
