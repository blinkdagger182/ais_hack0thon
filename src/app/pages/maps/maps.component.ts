import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch/fetch.service';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  map: any;
  markersData: any[] = [];
  markerCluster: any;

  constructor(private fetchService: FetchService) { }

  ngOnInit() {
    const mapCanvas = document.getElementById('map-canvas');
    const lat = parseFloat(mapCanvas.getAttribute('data-lat'));
    const lng = parseFloat(mapCanvas.getAttribute('data-lng'));

    const mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(4.2105, 101.9758),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(mapCanvas, mapOptions);

    this.fetchService.getMarkersData().subscribe(data => {
      this.markersData = data;
      this.plotMarkers();
      // this.initMarkerCluster();
    });
  }

  plotMarkers() {
    const markers = [];
    this.markersData.forEach(location => {
      const latlng = new google.maps.LatLng(parseFloat(location.Latitude), parseFloat(location.Longitude));

      const marker = new google.maps.Marker({
        position: latlng,
        title: location.Name,
        map: this.map // Attach marker to the map
      });

      // Prepare content for info window
      const contentString = `
        <div class="info-window-content">
          <h2>${location.Name}</h2>
          <p>District: ${location.District}</p>
          <p>State: ${location.State}</p>
          <p>Water Level: ${location['Water Level']}</p>
          <p>Water Level Indicator: ${location['Water Level Indicator']}</p>
          <p>Water Level Update Time: ${location['Water Level Update Time']}</p>
          <p>Water Level Trend: ${location['Water Level Trend']}</p>
          <p>Rainfall (Latest 1hr): ${location['Rainfall (Latest 1hr)']}</p>
          <p>Rainfall Indicator: ${location['Rainfall Indicator']}</p>
          <p>Rainfall Update Time: ${location['Rainfall Update Time']}</p>
        </div>
      `;

      // Create info window for the marker
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      // Attach click event listener to marker to open info window
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });

      // Push marker to the array
      markers.push(marker);
    });

    // Set markers on the marker cluster
    // this.markerCluster.addMarkers(markers);
    this.markerCluster = new MarkerClusterer({}, );
    // console.log('markersdata:', this.markersData);
    const markerCluster = new MarkerClusterer({ map: this.map, markers });
  }
}
