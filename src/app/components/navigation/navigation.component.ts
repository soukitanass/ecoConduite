import { Component, OnInit } from '@angular/core';
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
  
  mapboxgl;
  map;
  directions;
  departure;
  arrival;
  directionHttp;
  elevation;
  accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
  
  ngOnInit() {
    //this function will be exectuted once.

  /*******SETUP*************/
  this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  this.mapboxgl.accessToken = this.accessToken;
   /*******MAP*************/
    this.map = new this.mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 1
    });

    this.map.addControl(new this.mapboxgl.GeolocateControl({
      positionOptions:{enableHighAccuracy: true },
      trackUserLocation: true
    }));
    /*****DIRECTION*********/
    var mapboxDirection = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
    this.directions = new mapboxDirection({
      accessToken: this.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving-traffic'
    });
    this.map.addControl(this.directions, 'top-left');

    this.directions.on('route',this.simulation.bind(this));

    //for testing
    this.getAngle("-71.94202244281769;45.37816240925086","-71.94314360618591;45.37748414753939","-71.94384634494781;45.37803429377304");
  
  }

  constructor(private http : HttpClient) { }

 simulation(){
  //this function is exectuted when the user enter the destination 
  this.departure = this.directions.getOrigin()['geometry'].coordinates;
  this.arrival = this.directions.getDestination()['geometry'].coordinates;

  let URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'+this.departure+';'+this.arrival+'?&steps=true&geometries=geojson&overview=full&access_token='+this.accessToken;
  this.http.get(URL)
    .subscribe(
      data =>{
        this.directionHttp = data['routes'][0];
        console.log(this.directionHttp);
      },
      (error)=>{console.log('erreur'+error)});

}

  placeMarker(marker,longitude,latitude){
    // can place a marker on the map
    marker
      .remove()
      .setLngLat([longitude,latitude])
      .addTo(this.map);
  }
  getElevation_(longitude,latitude){
    // can get elevation from a point 
    // the json file is not process yet

    let URL = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/'+longitude+','+latitude+'.json?&access_token='+ this.accessToken;
    this.http.get(URL)
    .subscribe(
      data =>{
        this.elevation = data
        console.log(this.elevation);
      },
      (error)=>{console.log('erreur'+error)});
  }

  getAngle(coordinates1,coordinates2,coordinates3){
    // here we can calcule the angle between three coordinates
    // can be simplified using mathjs and his matrix
  
    let A = new Array();
    let B = new Array();
    let C = new Array();

    let AB = new Array();
    let BC = new Array();

    A = coordinates1.split(";").map(Number);
    B = coordinates2.split(";").map(Number);
    C = coordinates3.split(";").map(Number);
    
    //vector coordinates
    AB[0] = B[0] - A[0];
    AB[1] = B[1] - A[1];

    BC[0] = C[0] - B[0];
    BC[1] = C[1] - B[1];
    console.log(AB,BC);


    //module of vectors
    var modAB = Math.sqrt(Math.pow(AB[0],2)+Math.pow(AB[1],2))
    var modBC = Math.sqrt(Math.pow(BC[0],2)+Math.pow(BC[1],2))

    console.log('le module de AB vaut: '+modAB+' le module de BC vaut: '+modBC)

    //value of the angle
    var angle = (Math.acos((AB[0]*BC[0]+AB[1]*BC[1])/(modAB*modBC))*180)/Math.PI;

    console.log('La valeur de langle est de :'+angle);
  }

  getDistance(){
    //Here we can have the distance between two coordinates
  }

}


