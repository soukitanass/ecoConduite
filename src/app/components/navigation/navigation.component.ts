import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGVzdWVjbyIsImEiOiJjanZxcGs0bGUxNWk4M3pyaHIwMHZqcWR1In0.rlzswJuWogDNfb2qy860Ng';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}
