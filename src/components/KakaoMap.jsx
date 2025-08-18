import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerSvg from "../assets/icons/placeMarkerIcon.svg";
import CurrentPinSvg from "../assets/icons/myMarkerIcon.svg";

const KakaoMap = ({ lat = 37.4024068885376, lng = 127.101100614 }) => {
  const [state, setState] = useState({
    center: { lat: lat - 0.0009, lng },
    isPanto: true,
  });

  //   const selectedLocation = useSelectedLocationStore(
  //     (state) => state.selectedLocation
  //   );
  const selectedLocation = false;
  useEffect(() => {
    if (lat && lng) {
      setState((prev) => ({
        ...prev,
        center: { lat: lat - 0.0009, lng },
      }));
    }
  }, [lat, lng]);

  return (
    <Map
      center={state.center}
      isPanto={state.isPanto}
      style={{ width: "100%", height: "100%", zIndex: 0 }}
      level={5}
    >
      {/* 추후 장소들 리스트 받아오면 */}
      {selectedLocation && (
        <MapMarker
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          image={{
            src: markerSvg,
            size: { width: 40, height: 40 },
            options: { offset: { x: 20, y: 40 } },
          }}
        />
      )}
      <MapMarker
        position={{ lat: lat, lng: lng }}
        image={{
          src: CurrentPinSvg,
          size: { width: 35, height: 35 },
          options: { offset: { x: 20, y: 40 } },
        }}
      />
    </Map>
  );
};
export default React.memo(KakaoMap);
