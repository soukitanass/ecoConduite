import { Component, OnInit } from '@angular/core';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { __await } from 'tslib';
import { async } from '@angular/core/testing';

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

  ngOnInit() {
    this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
    this.mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
    this.map = new this.mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
    this.markerArrival = new this.mapboxgl.Marker()
    this.markerDeparture = new this.mapboxgl.Marker()
  }

  chosenPlaceDeparture= '';
  departure;
  departureLong;
  departureLat;

  async onEnterDeparture(chosenPlace: string) { 
    this.chosenPlaceDeparture = chosenPlace;
    console.log("Departure");
    const provider = new OpenStreetMapProvider();
    var test='';
    this.departure = await provider
      .search({ query: this.chosenPlaceDeparture });

    this.chosenPlaceDeparture = this.departure[0].label;
    this.departureLong = this.departure[0].x;
    this.departureLat = this.departure[0].y;

    this.markerDeparture
    .remove()
    .setLngLat([this.departureLong, this.departureLat])
    .addTo(this.map);
    
  }

  chosenPlaceArrival= '';
  arrival;
  arrivalLong;
  arrivalLat;

   async onEnterArrival(chosenPlace: string) { 
    this.chosenPlaceArrival = chosenPlace;
    console.log("Arrival");
    const provider = new OpenStreetMapProvider();
    this.arrival = await provider
    .search({ query: this.chosenPlaceArrival });

    this.chosenPlaceArrival = this.arrival[0].label;
    this.arrivalLong = this.arrival[0].x;
    this.arrivalLat = this.arrival[0].y;
    this.markerArrival
    .remove()
    .setLngLat([this.arrivalLong, this.arrivalLat])
    .addTo(this.map);
    
    
}
}
