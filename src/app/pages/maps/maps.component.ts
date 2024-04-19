import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch/fetch.service';

declare const google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

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

    const map = new google.maps.Map(mapCanvas, mapOptions);

    this.fetchService.getMarkersData().subscribe(data => {
      this.plotMarkers(data, map);
    });
  }

  plotMarkers(markersData: any[], map: any) {
    markersData.forEach(location => {
      const latlng = new google.maps.LatLng(parseFloat(location.Latitude), parseFloat(location.Longitude));

      const marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: location.Name
      });

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

      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  }
}
