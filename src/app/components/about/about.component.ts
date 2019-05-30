import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom:14,
    center:[ -71.943576,45.379064],
    interactive: false // if remove the map move
    
    });
    var marker = new mapboxgl.Marker()
    .setLngLat([-71.943576, 45.379064])
    .addTo(map);
  }

}
