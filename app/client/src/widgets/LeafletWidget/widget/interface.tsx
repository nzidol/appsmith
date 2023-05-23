import { WidgetProps } from "widgets/BaseWidget";
import { LatLngBounds } from "leaflet";
import { MarkerProps } from "../constants";

export default interface LeafletWidgetProps extends WidgetProps {
    isDisabled?: boolean;
    isVisible?: boolean;
    enableCircles?: boolean;
    enableLines?: boolean;
    enableMarkers?: boolean;
    enablePolygons?: boolean;
    enableDefaultMarkers?: boolean;
    enableTileLayers?: boolean;
    enableMapLayer?: boolean;
    mapOpacity?: number;
    lat: number;
    long: number;
    zoom: number;
    url: string;
    attribution: string;
    allowZoom: boolean;
    markerText: string;
    mapBounds: LatLngBounds;
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
    markers?: Array<MarkerProps>;
    selectedMarker?: {
      lat: number;
      long: number;
      title?: string;
      color?: string;
    };
    onMarkerClick?: string;
    onCreateMarker?: string;
    borderRadius: string;
    boxShadow?: string;
  }