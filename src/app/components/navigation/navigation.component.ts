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
  getElevation
  ngOnInit() {
  /*******SETUP*************/
  this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  this.mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
  

   /*******MAP*************/
    this.map = new this.mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 1
    });
    this.makerPosition = new this.mapboxgl.Marker()

    /*****DIRECTION*********/
    var mapboxDirection = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
    this.directions = new mapboxDirection({
      accessToken: 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng',
      unit: 'metric',
      profile: 'mapbox/driving-traffic'
    });
    console.log(this.directions);
    this.map.addControl(this.directions, 'top-left');
    this.map.addControl(new this.mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy: true },
      trackUserLocation: true
    }));

    /*****ELEVATION*********/
  //   var mapboxElevation = require('mapbox-elevation');
  //   var getElevation= new mapboxElevation({
  //     accessToken: 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng'
  //   });

 
  // getElevation([86.925313, 27.988730], function(err, elevation) {
  //   console.log('elevation at the summit of mt everest', elevation);
  // });
  }



  placeMarker(marker,longitude,latitude){
    marker
      .remove()
      .setLngLat([longitude,latitude])
      .addTo(this.map);
  }
}
