import { Component, OnInit, Input, SystemJsNgModuleLoaderConfig } from '@angular/core';
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

simulation(){
  var req = new XMLHttpRequest();
  var test : string
  req.open("POST","https://api.mapbox.com/directions/v5/mapbox/driving/-71.923668,45.380761;-71.931383,45.379634?annotations=maxspeed,speed,duration,distance&overview=full&steps=true&access_token=pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng")
 test = req.responseText
 console.log(test)
  // let positionSteps: Array<string>;
// var marker = new this.mapboxgl.Marker();
// var array = document.getElementById("map").getElementsByTagName('li');
// var lenght = array.length;
// console.log(array);
// for(var i=0; i< array.length; i++)
// {
//   positionSteps[i] = array[i].attributes.getNamedItem("data-lat").nodeValue+','+array[i].attributes.getNamedItem("data-lng").nodeValue;
// }
// console.log(positionSteps)
// var test = array[0]
// this.placeMarker(marker, array[1].attributes.getNamedItem("data-lng").nodeValue, array[1].attributes.getNamedItem("data-lat").nodeValue )


}

  placeMarker(marker,longitude,latitude){
    marker
      .remove()
      .setLngLat([longitude,latitude])
      .addTo(this.map);
  }
}
