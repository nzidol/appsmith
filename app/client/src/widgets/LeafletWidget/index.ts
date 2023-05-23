import Widget from "./widget";
import IconSVG from "./icon.svg";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "Leaflet", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
  iconSVG: IconSVG,
  needsMeta: true, // Defines if this widget adds any meta properties
  isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
  defaults: {
    isDisabled: false,
    isVisible: true,
    animateLoading: true,
    widgetName: "Leaflet",
    rows: 60,
    columns: 60,
    version: 1,
    mapCenter: { lat: 51.505, long: -0.09 },
    circles:
      '[{"lat": 51.505, "long": -0.0755, "radius": 200, "title":"Tower Bridge", "options": {"color":"green","fillColor":"green"}}]',
    enableMapLayer: true,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    zoom: 13,
    zoomLocation: "topleft",
    allowZoom: true,
    defaultZoom: true,
    enableTileLayers: false,
    enableDefaultMarkers: false,
    enableCircles: true,
    enableLines: false,
    enablePolygons: false,
    enableGeoJSON: false,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    contentConfig: Widget.getPropertyPaneContentConfig(),
    styleConfig: Widget.getPropertyPaneStyleConfig(),
    stylesheetConfig: Widget.getStylesheetConfig(),
  },
};

export default Widget;
