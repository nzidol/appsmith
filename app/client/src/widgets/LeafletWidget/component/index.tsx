import { Colors } from "constants/Colors";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
  Polyline,
  Polygon,
  GeoJSON,
  GeoJSONProps,
} from "react-leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, LatLngExpression } from "leaflet";
import {
  CircleProps,
  MarkerProps,
  PolygonProps,
  LineProps,
} from "../constants";

export interface LeafletComponentProps {
  lat: number;
  long: number;
  zoom: number;
  attribution: string;
  url: string;
  markerText: string;
  enableDrag: (e: any) => void;
  allowZoom: boolean;
  enablePickLocation: boolean;
  mapCenter: {
    lat: number;
    long: number;
    title?: string;
  };
  center?: {
    lat: number;
    long: number;
  };
  defaultMarkers?: Array<MarkerProps>;
  geoJSON?: Array<GeoJSONProps>;
  markers?: Array<MarkerProps>;
  circles?: Array<CircleProps>;
  lines?: Array<LineProps>;
  polygons?: Array<PolygonProps>;
  selectedMarker?: {
    lat: number;
    long: number;
    title?: string;
    color?: string;
  };
  onMarkerClick?: string;
  onCreateMarker?: string;
  enableCreateMarker: boolean;
  enableReplaceMarker: boolean;
  clickedMarkerCentered?: boolean;
  updateCenter: (lat: number, long: number) => void;
  updateMarker: (lat: number, long: number, index: number) => void;
  saveMarker: (lat: number, long: number) => void;
  selectMarker: (lat: number, long: number, title: string) => void;
  unselectMarker: () => void;
  borderRadius: string;
  boxShadow?: string;
  widgetId: string;
}

const LeafletContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const LeafletWrapper = styled.div<{
  borderRadius: string;
  boxShadow?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ boxShadow }) =>
    boxShadow === "none" ? `1px solid` : `0px solid`};
  border-color: ${Colors.GREY_3};
  overflow: hidden;
  box-shadow: ${({ boxShadow }) => `${boxShadow}`} !important;

  ${({ borderRadius }) =>
    borderRadius >= "1.5rem"
      ? `& div.gmnoprint:not([data-control-width]) {
    margin-right: 10px !important;`
      : ""}
`;

function AddMarker(props: LeafletComponentProps) {
  const [position, setPosition] = useState([
    props.center?.lat,
    props.center?.long,
  ] as LatLngExpression);
  const map = useMapEvents({
    click(e) {
      if (props.enableCreateMarker) {
        props.saveMarker(e.latlng.lat, e.latlng.lng);
      }
      setPosition(e.latlng);
    },
  });

  map.flyTo(position, props.zoom);

  return position === null ? null : (
    <Marker
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
      position={position}
    >
      <Popup>{props.markerText}</Popup>
    </Marker>
  );
}

const MyLeafLetComponent = (props: any) => {
  const [mapCenter, setMapCenter] = React.useState<
    | {
        lat: number;
        lng: number;
        title?: string;
        description?: string;
      }
    | undefined
  >({
    ...props.center,
    lng: props.center.long,
  });
  useEffect(() => {
    if (!props.selectedMarker) {
      setMapCenter({
        ...props.center,
        lng: props.center.long,
      });
    }
  }, [props.center, props.selectedMarker]);
  return (
    <MapContainer
      center={mapCenter}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
      zoom={props.zoom}
      zoomControl={props.allowZoom}
    >
      <TileLayer attribution={props.attribution} url={props.url} />
      {Array.isArray(props.markers) &&
        props.markers.map((marker: MarkerProps, index: number) => (
          <Marker
            eventHandlers={{
              click: () => {
                if (props.clickedMarkerCentered) {
                  setMapCenter({
                    ...marker,
                    lng: marker.long,
                  });
                }
                props.selectMarker(marker.lat, marker.long, marker.popupText);
              },
            }}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            key={index}
            position={[Number(marker.lat), Number(marker.long)]}
            title={marker.popupText}
          >
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
      {Array.isArray(props.circles) &&
        props.circles.map((circle: CircleProps, index: number) => (
          <Circle
            center={[Number(circle.lat), Number(circle.long)]}
            key={index}
            pathOptions={{
              color: circle.options?.color ? circle.options.color : "red",
              fillColor: circle.options?.fillColor
                ? circle.options.fillColor
                : "red",
            }}
            radius={circle.radius ? circle.radius : 100}
          >
            <Popup>{circle.title ? circle.title : ""}</Popup>
          </Circle>
        ))}
      {Array.isArray(props.lines) &&
        props.lines.map((line: LineProps, index: number) => (
          <Polyline
            key={index}
            pathOptions={{
              color: line.options?.color ? line.options.color : "red",
            }}
            positions={
              line.positions || [
                [51.505, -0.09],
                [51.51, -0.1],
                [51.51, -0.12],
              ]
            }
          />
        ))}
      {Array.isArray(props.polygons) &&
        props.polygons.map((polygon: PolygonProps, index: number) => (
          <Polygon
            key={index}
            pathOptions={{
              color: polygon.options?.color ? polygon.options.color : "purple",
            }}
            positions={polygon.positions}
          />
        ))}
      {Array.isArray(props.geoJSON) &&
        props.geoJSON.map((geoJSON: GeoJSONProps, index: number) => (
          <GeoJSON
            data={geoJSON.data}
            key={index}
            style={
              geoJSON.style
                ? geoJSON.style
                : () => ({
                    color: "#4a83ec",
                    weight: 0.5,
                    fillColor: "#1a1d62",
                    fillOpacity: 1,
                  })
            }
          />
        ))}
      <AddMarker {...props} />
    </MapContainer>
  );
};

function LeafletComponent(props: LeafletComponentProps) {
  const LeafletContainerWrapperMemoized = useMemo(
    () => <LeafletContainerWrapper />,
    [props.borderRadius, props.boxShadow],
  );
  return (
    <LeafletWrapper
      borderRadius={props.borderRadius}
      boxShadow={props.boxShadow}
    >
      <MyLeafLetComponent
        containerElement={LeafletContainerWrapperMemoized}
        loadingElement={LeafletContainerWrapperMemoized}
        mapElement={LeafletContainerWrapperMemoized}
        {...props}
      />
    </LeafletWrapper>
  );
}

export default LeafletComponent;
