import { LatLngExpression } from "leaflet";

// This file contains common constants which can be used across the widget configuration file (index.ts), widget and component folders.
export const LEAFLET_WIDGET_CONSTANT = "";
export interface MarkerProps {
  lat: number;
  long: number;
  popupText?: string;
  description?: string;
}
export interface CircleProps {
  lat: number;
  long: number;
  radius: number;
  title?: string;
  description?: string;
  options?: CircleOptions;
}
export interface CircleOptions {
  color?: string;
  fillColor?: string;
}
export interface PolygonProps {
  positions: [];
  options?: PolygonOptions;
}
export interface PolygonOptions {
  color?: string;
  fillColor?: string;
}
export interface LineProps {
  positions: [];
  options?: LineOptions;
}
export interface LineOptions {
  color?: string;
  fillColor?: string;
}
export interface TyleLayerProps {
  name: string
  url: string;
  attribution: string;
  opacity: number;
  maxNativeZoom: number;
  maxZoom: number;
}
