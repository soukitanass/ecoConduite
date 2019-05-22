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
  makerPosition
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
    this.makerPosition = new this.mapboxgl.Marker()

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



placeMarker(marker,longitude,latitude){
  marker
  .remove()
  .setLngLat([longitude,latitude])
  .addTo(this.map);
  // this.markerDeparture.setDraggable(true);
  // a changer et recuperer la position 
}

myPosition(){
if (navigator.geolocation){
 navigator.geolocation.getCurrentPosition( this.locationFound.bind(this), this.locationNotFound.bind(this));
}}

locationFound(position){
  this.placeMarker(this.makerPosition,position.coords.longitude,position.coords.latitude);
  }

locationNotFound(){
    alert("Votre Position n'a pas été trouvé.")
  }
}
