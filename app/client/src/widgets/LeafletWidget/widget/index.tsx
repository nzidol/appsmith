import React from "react";
import BaseWidget, { WidgetProps, WidgetState } from "widgets/BaseWidget";
import { WidgetType } from "constants/WidgetConstants";
import LeafletComponent from "../component";

import { DerivedPropertiesMap } from "utils/WidgetFactory";
import { DEFAULT_CENTER } from "constants/WidgetConstants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { MarkerProps } from "../constants";
import styleConfig from "./styleConfig";
import contentConfig from "./contentConfig";
import { Stylesheet } from "entities/AppTheming";
import { LatLngBounds } from "leaflet";
import { merge } from "lodash";

const DefaultCenter = { ...DEFAULT_CENTER, long: DEFAULT_CENTER.lng };

type Center = {
  lat: number;
  long: number;
  [x: string]: any;
};

class LeafletWidget extends BaseWidget<LeafletWidgetProps, WidgetState> {
  static getPropertyPaneConfig() {
    return contentConfig.concat(styleConfig);
  }
  static getPropertyPaneContentConfig() {
    return contentConfig;
  }
  static getPropertyPaneStyleConfig() {
    return styleConfig;
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return merge(super.getDerivedPropertiesMap(), {
      mapBounds: `{{(() => {L.Map.getBounds()})()}}`,
    });
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      center: "mapCenter",
      markers: "defaultMarkers",
    };
  }

  static getMetaPropertiesMap(): Record<string, any> {
    return merge(super.getMetaPropertiesMap(), {
      center: undefined,
      markers: undefined,
      selectedMarker: undefined,
      mapBounds: undefined,
    });
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    };
  }

  getCenter(): Center {
    return this.props.center || this.props.mapCenter || DefaultCenter;
  }
  onCreateMarker = (lat: number, long: number) => {
    this.disableDrag(true);
    const marker = { lat, long, title: "" };

    const markers = [];
    if (this.props.enableReplaceMarker) {
      if (this.props.defaultMarkers != undefined)
        marker.title = this.props.defaultMarkers[0].popupText
          ? this.props.defaultMarkers[0].popupText
          : "";
      markers.push(marker);
    } else {
      (this.props.markers || []).forEach((m: MarkerProps) => {
        markers.push(m);
      });
      markers.push(marker);
    }
    this.props.updateWidgetMetaProperty("markers", markers);
    this.props.updateWidgetMetaProperty("selectedMarker", marker, {
      triggerPropertyName: "onCreateMarker",
      dynamicString: this.props.onCreateMarker,
      event: {
        type: EventType.ON_CREATE_MARKER,
      },
    });
  };
  onMarkerClick = (lat: number, long: number, title: string) => {
    this.disableDrag(true);
    const selectedMarker = {
      lat: lat,
      long: long,
      title: title,
    };
    this.props.updateWidgetMetaProperty("selectedMarker", selectedMarker, {
      triggerPropertyName: "onMarkerClick",
      dynamicString: this.props.onMarkerClick,
      event: {
        type: EventType.ON_MARKER_CLICK,
      },
    });
  };
  unselectMarker = () => {
    this.props.updateWidgetMetaProperty("selectedMarker", undefined);
  };
  updateCenter = (lat: number, long: number, title?: string) => {
    this.props.updateWidgetMetaProperty("center", { lat, long, title });
  };
  updateMarker = (lat: number, long: number, index: number) => {
    const markers: Array<MarkerProps> = [...(this.props.markers || [])].map(
      (marker, i) => {
        if (index === i) {
          marker = { lat, long };
        }
        return marker;
      },
    );
    this.disableDrag(false);
    this.props.updateWidgetMetaProperty("markers", markers);
  };
  updateBounds = (mapBounds: LatLngBounds) => {
    this.props.updateWidgetMetaProperty("mapBounds", mapBounds);
  };

  componentDidUpdate(prevProps: LeafletWidgetProps) {
    //remove selectedMarker when map initial location is updated
    if (
      JSON.stringify(prevProps.center) !== JSON.stringify(this.props.center) &&
      this.props.selectedMarker
    ) {
      this.unselectMarker();
    }

    // If initial location was changed
    if (
      JSON.stringify(prevProps.mapCenter) !==
      JSON.stringify(this.props.mapCenter)
    ) {
      this.props.updateWidgetMetaProperty("center", this.props.mapCenter);
      return;
    }

    // If markers were changed
    if (
      this.props.markers &&
      this.props.markers.length > 0 &&
      JSON.stringify(prevProps.markers) !== JSON.stringify(this.props.markers)
    ) {
      this.props.updateWidgetMetaProperty(
        "center",
        this.props.markers[this.props.markers.length - 1],
      );
    }

    // If map or zoom was changed
    if (
      JSON.stringify(prevProps.mapCenter) !==
        JSON.stringify(this.props.mapCenter) ||
      JSON.stringify(prevProps.zoom) !== JSON.stringify(this.props.zoom)
    ) {
      this.props.updateWidgetMetaProperty("mapBounds", this.props.mapBounds);
      return;
    }
  }

  getPageView() {
    return (
      <LeafletComponent
        allowZoom={this.props.allowZoom}
        attribution={this.props.attribution}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        center={this.getCenter()}
        circles={this.props.circles}
        clickedMarkerCentered={this.props.clickedMarkerCentered}
        defaultMarkers={this.props.defaultMarkers}
        enableCreateMarker={this.props.enableCreateMarker}
        enableDrag={this.props.enableDrag}
        enablePickLocation={false}
        enableReplaceMarker={this.props.enableReplaceMarker}
        geoJSON={this.props.geoJSON}
        lat={this.props.lat}
        lines={this.props.lines}
        long={this.props.long}
        mapBounds={this.props.mapBounds}
        mapCenter={this.getCenter()}
        markerText={this.props.markerText}
        markers={this.props.markers}
        polygons={this.props.polygons}
        saveMarker={this.onCreateMarker}
        selectMarker={this.onMarkerClick}
        selectedMarker={this.props.selectedMarker}
        tileLayers={this.props.tileLayers}
        unselectMarker={this.unselectMarker}
        updateBounds={this.updateBounds}
        updateCenter={this.updateCenter}
        updateMarker={this.updateMarker}
        url={this.props.url}
        widgetId={this.props.widgetId}
        zoom={this.props.zoom}
      />
    );
  }

  static getWidgetType(): WidgetType {
    return "LEAFLET_WIDGET";
  }
}

export interface LeafletWidgetProps extends WidgetProps {
  isDisabled?: boolean;
  isVisible?: boolean;
  lat: number;
  long: number;
  zoom: number;
  url: string;
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

export default LeafletWidget;
