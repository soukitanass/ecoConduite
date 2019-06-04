import { Component, OnInit, Input } from '@angular/core';
import { __await } from 'tslib';
import { async } from '@angular/core/testing';
import {} from '@mapbox/mapbox-gl-directions'
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

  }
simulation(){
  let accestoken ='pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
  let URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/-71.923668,45.380761;-71.931383,45.379634';
  let params = new HttpParams()
    .set('steps','true')
    .set('access_token','pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng')
  
  this.http.post(URL, {parametre: params})
    .subscribe(data =>{console.log(data)},(error)=>{console.log('erreur'+error)});
  console.log("Lancement de la simulation")
}

  placeMarker(marker,longitude,latitude){
    marker
      .remove()
      .setLngLat([longitude,latitude])
      .addTo(this.map);
  }
}
