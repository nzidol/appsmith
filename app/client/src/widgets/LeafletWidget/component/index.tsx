import { Colors } from "constants/Colors";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import { GeomanControl } from "./GeomanControl";

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
  LayersControl,
  TileLayerProps,
  ZoomControl,
  useMap,
} from "react-leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { ControlPosition, Icon, LatLngBounds, LatLngExpression } from "leaflet";
const L = window["L"];
import {
  CircleProps,
  MarkerProps,
  PolygonProps,
  LineProps,
  TyleLayerProps,
} from "../constants";

import LeafletComponentProps from "./interface";

L.Icon.Default.prototype.options = {
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
};

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
      setPopupText(e.latlng.lat.toString() + " " + e.latlng.lng.toString());
      if (props.enableCreateMarker) {
        props.saveMarker(e.latlng.lat, e.latlng.lng, popupText);
      }
      setPosition(e.latlng);
    },
  });
  const [popupText, setPopupText] = useState(props.markerText);

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
      <Popup>{popupText}</Popup>
    </Marker>
  );
}

function MyZoomControl(props: LeafletComponentProps) {
  return props.allowZoom === false ? null : (
    <ZoomControl position={props.zoomLocation as ControlPosition} />
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
        title: props.markerText ? props.markerText : "",
        description: props.description ? props.description : "",
      });
    }
  }, [props.center, props.selectedMarker]);

  const [map, setMap] = useState<L.Map>();
  const mapRef = useRef<HTMLDivElement>(null);
  // initialize the map instance
  useEffect(() => {
    if (!mapRef.current) return;

    setMap(new window.L.Map(mapRef.current, {}));
  }, [mapRef]);

  // set center if center is changed
  useEffect(() => {
    if (map) {
      map.setView({ lat: props.center?.lat, lng: props.center?.lng });
    }
  }, [props.center, map]);

  function _onCreate(e: any) {
    const fg = L.featureGroup();
    if (
      e.layer instanceof L.Path ||
      e.layer instanceof L.Marker ||
      e.layer instanceof L.Polygon
    ) {
      fg.addLayer(e.layer);
    }
    console.log(fg.toGeoJSON());
    console.log("Create: " + e.shape);
  }
  function _onDelete(e: any) {
    const fg = L.featureGroup();
    if (
      e.layer instanceof L.Path ||
      e.layer instanceof L.Marker ||
      e.layer instanceof L.Polygon
    ) {
      fg.addLayer(e.layer);
    }
    console.log(fg.toGeoJSON());
    console.log("Delete " + e.shape);
  }
  function _onEdit(e: any) {
    const fg = L.featureGroup();
    if (
      e.layer instanceof L.Path ||
      e.layer instanceof L.Marker ||
      e.layer instanceof L.Polygon
    ) {
      fg.addLayer(e.layer);
    }
    console.log(fg.toGeoJSON());
    console.log("Edit " + e.shape);
  }
  const [mapBounds, setMapBounds] = React.useState(props.mapBounds);
  function MapBounds(center: any, zoom: number) {
    const map = useMap();

    useEffect(() => {
      console.log("effects2: ", center, zoom);
      if (JSON.stringify(mapBounds) !== JSON.stringify(map.getBounds())) {
        setMapBounds(map.getBounds());
        console.log("map bounds: ", mapBounds);
        props.updateBounds(mapBounds);
      }
    }, [center, zoom]);

    return null;
  }

  return JSON.stringify(mapCenter) === "{}" ||
    JSON.stringify(mapCenter) === '{"title":"","description":""}' ? (
    <p>Waiting for data</p>
  ) : (
    <MapContainer
      center={mapCenter}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
      zoom={props.zoom}
      zoomControl={false}
    >
      <MapBounds center={props.center} zoom={props.zoom} />
      <MyZoomControl {...props} />
      <GeomanControl
        cutPolygon={false}
        dragMode={false}
        drawCircle={false}
        drawCircleMarker={false}
        drawText={false}
        onCreate={_onCreate}
        onDelete={_onDelete}
        onEdit={_onEdit}
        oneBlock
        position="topright"
        rotateMode={false}
      />
      <LayersControl position="topleft">
        {Array.isArray(props.tileLayers) &&
          props.tileLayers.map((tyleLayer: TyleLayerProps, index: number) => (
            <LayersControl.BaseLayer
              checked={tyleLayer.name === "OpenStreetMaps"}
              key={index}
              name={tyleLayer.name}
            >
              <TileLayer
                attribution={tyleLayer.attribution}
                key={index}
                maxNativeZoom={
                  tyleLayer.maxNativeZoom ? tyleLayer.maxNativeZoom : 18
                }
                maxZoom={tyleLayer.maxZoom ? tyleLayer.maxZoom : 22}
                opacity={tyleLayer.opacity}
                url={tyleLayer.url}
              />
            </LayersControl.BaseLayer>
          ))}
        <LayersControl.Overlay checked name="OpenStreetMap">
          <TileLayer
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            maxNativeZoom={18}
            maxZoom={22}
            opacity={0.65}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Marker with popup">
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
                    props.selectMarker(
                      marker.lat,
                      marker.long,
                      marker.popupText,
                    );
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
          {/* <AddMarker {...props} /> */}
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Circles">
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
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Lines">
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
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="polygons">
          {Array.isArray(props.polygons) &&
            props.polygons.map((polygon: PolygonProps, index: number) => (
              <Polygon
                key={index}
                pathOptions={{
                  color: polygon.options?.color
                    ? polygon.options.color
                    : "purple",
                }}
                positions={polygon.positions}
              />
            ))}
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="geoJson">
          {Array.isArray(props.geoJSON) &&
            props.geoJSON.map((geoJSON: GeoJSONProps, index: number) => (
              <GeoJSON
                data={geoJSON.data}
                key={index}
                pointToLayer={function(geoJsonPoint, latlng) {
                  const myIcon = L.icon({
                    iconUrl: markerIconPng,
                    shadowUrl: markerShadowPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  });
                  return L.marker(latlng, { icon: myIcon });
                }}
                style={
                  geoJSON.style
                    ? geoJSON.style
                    : () => ({
                        color: "blue",
                        weight: 0.5,
                        fillColor: "lightblue",
                        fillOpacity: 0.2,
                      })
                }
              />
            ))}
        </LayersControl.Overlay>
      </LayersControl>
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
