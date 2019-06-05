import { Component, OnInit, Input } from '@angular/core';
import { __await } from 'tslib';
import { async } from '@angular/core/testing';
import {} from '@mapbox/mapbox-gl-directions'
import {} from 'mapbox-elevation'
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private http : HttpClient) { }

  mapboxgl;
  map;
  makerPosition
  directions;
  displayDirection;
  getElevation
  accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
  ngOnInit() {
  /*******SETUP*************/
  this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  this.mapboxgl.accessToken = this.accessToken;
  

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
      accessToken: this.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving-traffic'
    });
    this.map.addControl(this.directions, 'top-left');
    this.map.addControl(new this.mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy: true },
      trackUserLocation: true
    }));
    //var mapboxElevation = require('mapbox-elevation');
   // var getElevation = mapboxElevation(this.accessToken);
  //getElevation([86.925313, 27.988730], function(err, elevation) {
  //console.log('elevation at the summit of mt everest', elevation);});
  }
  
 simulation(){

 let steps =  document.getElementsByClassName("mapbox-directions-step")
  var lenght = steps.length
  var departure = steps[0].getAttribute("data-lng")+','+steps[0].getAttribute("data-lat")
  var arrival = steps[lenght-1].getAttribute("data-lng")+','+steps[lenght-1].getAttribute("data-lat")
  let URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'+departure+';'+arrival+'?&steps=true&access_token=pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
  console.log(departure)
  console.log(arrival)
  console.log(URL)
  var test =  this.http.get(URL)
    .subscribe(
      data =>{console.log(data)},
      (error)=>{console.log('erreur'+error)});
  console.log("Lancement de la simulation")

}

  placeMarker(marker,longitude,latitude){
    marker
      .remove()
      .setLngLat([longitude,latitude])
      .addTo(this.map);
  }
}
