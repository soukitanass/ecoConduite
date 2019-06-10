import { Component, OnInit, Input } from '@angular/core';
import { __await } from 'tslib';
import {} from '@mapbox/mapbox-gl-directions'
import {} from 'mapbox-elevation'
import { HttpClient} from '@angular/common/http';
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
    this.directions.on('route',this.simulation.bind(this));
    this.map.addControl(this.directions, 'top-left');
    this.map.addControl(new this.mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy: true },
      trackUserLocation: true
    }));
  
  }

  departure;
  arrival;

  directionHttp;


 simulation(){
  this.departure = this.directions.getOrigin()['geometry'].coordinates;
  this.arrival = this.directions.getDestination()['geometry'].coordinates;
  let URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'+this.departure+';'+this.arrival+'?&steps=true&access_token=pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
  this.http.get(URL)
    .subscribe(
      data =>{
        this.directionHttp = data['routes'][0].legs[0].steps;
        console.log(this.directionHttp);
      },
      (error)=>{
        console.log('erreur'+error)
      });
}

  placeMarker(marker,longitude,latitude){
    marker
      .remove()
      .setLngLat([longitude,latitude])
      .addTo(this.map);
  }
}
