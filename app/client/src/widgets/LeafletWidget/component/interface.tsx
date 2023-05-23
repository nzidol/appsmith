import {
    GeoJSONProps,
    TileLayerProps,
} from "react-leaflet";

import { LatLngBounds } from "leaflet";

import {
    CircleProps,
    MarkerProps,
    PolygonProps,
    LineProps,
} from "../constants";

export default interface LeafletComponentProps {
    lat: number;
    long: number;
    allowZoom: boolean;
    zoom: number;
    enableMapLayer?: boolean;
    url: string;
    attribution: string;
    mapOpacity?: number;
    markerText: string;
    mapCenter: {
      lat: number;
      long: number;
      title?: string;
    };
    mapBounds: LatLngBounds;
    center?: {
      lat: number;
      long: number;
    };
    //Feature Layers
    enableGeoJSON?: boolean;
    geoJSON?: Array<GeoJSONProps>;
    enableMarkers?: boolean;
    markers?: Array<MarkerProps>;
    enableCircles?: boolean;
    circles?: Array<CircleProps>;
    enableLines?: boolean;
    lines?: Array<LineProps>;
    enablePolygons?: boolean;
    polygons?: Array<PolygonProps>;
    enableTileLayers?: boolean;
    tileLayers?: Array<TileLayerProps>;
  
    enableDrag: (e: any) => void;
    enablePickLocation: boolean;
    enableDefaultMarkers?: boolean;
    defaultMarkers?: Array<MarkerProps>;
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
    saveMarker: (lat: number, long: number, title: string) => void;
    selectMarker: (lat: number, long: number, title: string) => void;
    unselectMarker: () => void;
  
    updateCenter: (lat: number, long: number) => void;
    updateMarker: (lat: number, long: number, index: number) => void;
    updateBounds: (mapBounds: LatLngBounds) => void;
  
    borderRadius: string;
    boxShadow?: string;
    widgetId: string;
  }
