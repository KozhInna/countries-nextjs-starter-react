import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function GetMap() {
  const location = useLocation();
  const country = location.state.country;
  const capitalInfo = country.capitalInfo.latlng;
  const position = { lat: capitalInfo[0], lng: capitalInfo[1] };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
  const mapId = import.meta.env.VITE_MAP_ID;
  const [open, setOpen] = useState(false);
  console.log("country in map", country);

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "500px" }}>
        <Map zoom={9} center={position} mapId={mapId}>
          <AdvancedMarker
            position={position}
            onClick={() => setOpen(true)}
          ></AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>
                You are in {country.name.official} {country.flag}
              </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
