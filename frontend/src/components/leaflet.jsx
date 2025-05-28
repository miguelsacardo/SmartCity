import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export function LeafletMapSensor({ lat, long }) {
  return (
      <MapContainer center={[lat, long]} zoom={30} scrollWheelZoom={false} className='h-110 w-110'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>
            Aqui esta seu sensor!<br/>
            Lembre-se que a localização não é 100% precisa.
          </Popup>
        </Marker>
      </MapContainer>
  );
}
