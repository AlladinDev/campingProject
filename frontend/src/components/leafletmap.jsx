// MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Popup, Marker, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const { BaseLayer } = LayersControl;

const MapComponent = ({ markers }) => {
  // Determine the center of the map
  console.log(markers)
  const center = [markers.lat, markers.lng]
  return (
    <MapContainer
      center={center}
      zoom={8}
      className='border-2 border-black my-3 shadow-lg w-full max-w-[780px] min-h-[80vh]'
      scrollWheelZoom={false} // Disable scroll wheel zoom
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        <BaseLayer name="Esri World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </BaseLayer>
        <BaseLayer name="CartoDB Positron">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
        </BaseLayer>
      </LayersControl>
      <Marker position={[markers.lat, markers.lng]}>
        <Popup>{markers.popupText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
