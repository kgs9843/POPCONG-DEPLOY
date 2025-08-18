//지도를 위한 테스트 입니다!

// import React, { useState, useEffect } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

// const Test = () => {
//   const [info, setInfo] = useState();
//   const [markers, setMarkers] = useState([]);
//   const [map, setMap] = useState();

//   useEffect(() => {
//     if (!map) return;
//     const ps = new window.kakao.maps.services.Places();

//     ps.keywordSearch("월곶 맛집", (data, status, _pagination) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         console.log("판교 맛집 검색 결과 상위 15개:", data); // ✅ 추가

//         const bounds = new window.kakao.maps.LatLngBounds();
//         let markers = [];

//         for (var i = 0; i < data.length; i++) {
//           markers.push({
//             position: {
//               lat: data[i].y,
//               lng: data[i].x,
//             },
//             content: data[i].place_name,
//           });
//           bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
//         }
//         setMarkers(markers);
//         map.setBounds(bounds);
//       }
//     });
//   }, [map]);

//   return (
//     <Map // 로드뷰를 표시할 Container
//       center={{
//         lat: 37.566826,
//         lng: 126.9786567,
//       }}
//       style={{
//         width: "100%",
//         height: "350px",
//       }}
//       level={3}
//       onCreate={setMap}
//     >
//       {markers.map((marker) => (
//         <MapMarker
//           key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
//           position={marker.position}
//           onClick={() => setInfo(marker)}
//         >
//           {info && info.content === marker.content && (
//             <div style={{ color: "#000" }}>{marker.content}</div>
//           )}
//         </MapMarker>
//       ))}
//     </Map>
//   );
// };

// export default Test;
