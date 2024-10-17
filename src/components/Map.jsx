import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
const Map = () => {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();
  const { cities } = useCities();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {!isLoadingPosition ? "USE YOUR POSITION" : "LOCATING"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city, i) => (
          <Marker position={[city.position.lat, city.position.lng]} key={i}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} setMapPosition={setMapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};
function ChangeCenter({ position }) {
  const map = useMap();

  map.setView(position, 13);
  // setMapPosition(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e);

      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
