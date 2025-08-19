import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import markerSvg from "../assets/icons/placeMarkerIcon.svg";
import CurrentPinSvg from "../assets/icons/myMarkerIcon.svg";
import ItemModal from "./ItemModal";

const KakaoMap = ({ lat = 37.4024068885376, lng = 127.101100614, markers }) => {
  const [state, setState] = useState({
    center: { lat: lat - 0.0009, lng },
    isPanto: true,
  });

  console.log(markers);
  const [selectedItem, setSelectedItem] = useState(null);
  //   const selectedLocation = useSelectedLocationStore(
  //     (state) => state.selectedLocation
  //   );
  // const selectedLocation = false;
  useEffect(() => {
    if (lat && lng) {
      setState((prev) => ({
        ...prev,
        center: { lat: lat - 0.0009, lng },
      }));
    }
  }, [lat, lng]);

  return (
    <>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        level={5}
      >
        {/* 받아온 markers 배열을 기반으로 마커 찍기 */}
        {markers &&
          markers.map((marker) => (
            <MapMarker
              key={marker.id}
              position={{
                lat: marker.latitude,
                lng: marker.longitude,
              }}
              image={{
                src: markerSvg,
                size: { width: 40, height: 40 },
                options: { offset: { x: 20, y: 40 } },
              }}
              onClick={() => setSelectedItem(marker)} // 클릭 시 선택
            />
          ))}

        <MapMarker
          position={{ lat: lat, lng: lng }}
          image={{
            src: CurrentPinSvg,
            size: { width: 35, height: 35 },
            options: { offset: { x: 20, y: 40 } },
          }}
        />
      </Map>
      <ItemModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </>
  );
};
export default React.memo(KakaoMap);
