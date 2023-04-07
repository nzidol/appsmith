import { createControlComponent } from "@react-leaflet/core";
import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

export interface GeomanProps extends L.ControlOptions {
  position: L.ControlPosition;
  cutPolygon?: boolean;
  dragMode?: boolean;
  drawCircle?: boolean;
  drawCircleMarker?: boolean;
  drawMarker?: boolean;
  drawPolygon?: boolean;
  drawText?: boolean;
  drawPolyline?: boolean;
  editMode?: boolean;
  oneBlock?: boolean;
  onCreate?: any;
  onEdit?: any;
  onDelete?: any;
  removalMode?: boolean;
  rotateMode?: boolean;
}

const Geoman = L.Control.extend({
  options: {} as GeomanProps,
  initialize(options: GeomanProps) {
    L.setOptions(this, options);
  },

  addTo(map: L.Map) {
    if (!map.pm) return;

    map.on("pm:create", (e) => {
      this.options.onCreate(e);
      const layer = e.layer;
      map.pm.disableDraw();

      layer.on("pm:edit", this.options.onEdit.bind(e));
      layer.on("pm:update", this.options.onEdit.bind(e));
      layer.on("pm:remove", this.options.onDelete.bind(e));
    });

    map.pm.addControls({
      ...this.options,
    });
  },
});

const createGeomanInstance = (props: GeomanProps) => {
  return new Geoman(props);
};

export const GeomanControl = createControlComponent(createGeomanInstance);
