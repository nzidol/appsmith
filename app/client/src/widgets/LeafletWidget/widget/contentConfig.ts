import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";

export default [
  {
    sectionName: "General",
    children: [
      {
        propertyName: "tileLayers",
        label: "Array of Tile Layers",
        helpText:
          "Url and attribution for maptiles, ensure you comply with any usage policy.",
        controlType: "INPUT_TEXT",
        inputType: "ARRAY",
        defaultValue:
          '[{ "name": "OpenStreetMaps" ,"url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", "attribution": "&copy; <a href=`https://www.openstreetmap.org/copyright`>OpenStreetMap</a> contributors", "opacity": 1 }]',
        placeholderText:
          '[{ "name": "val1" ,"url": "val2", "attribution": "val3", "opacity": 1 }]',
        isBindProperty: true,
        isTriggerProperty: false,
        isJSconvertible: true,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "name",
                    type: ValidationTypes.TEXT,
                    params: {
                      required: true,
                    },
                  },
                  {
                    name: "url",
                    type: ValidationTypes.SAFE_URL,
                    params: {
                      required: true,
                    },
                  },
                  {
                    name: "attribution",
                    type: ValidationTypes.TEXT,
                    params: {
                      required: true,
                    },
                  },
                  {
                    name: "opacity",
                    type: ValidationTypes.NUMBER,
                    params: {
                      default: 1,
                      max: 1,
                      min: 0,
                      required: false,
                    },
                  },
                  {
                    name: "maxZoom",
                    type: ValidationTypes.NUMBER,
                    params: {
                      default: 18,
                      max: 25,
                      min: 1,
                      required: false,
                    },
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "mapCenter",
        label: "Initial location",
        controlType: "INPUT_TEXT",
        defaultValue: { lat: 51.505, long: -0.09 },
        placeholderText: '{ "lat": 51.505, "long": -0.09 }',
        isBindProperty: true,
        isTriggerProperty: false,
        isJSconvertible: true,
        validation: {
          type: ValidationTypes.OBJECT,
          params: {
            allowedKeys: [
              {
                name: "lat",
                type: ValidationTypes.NUMBER,
                params: {
                  min: -90,
                  max: 90,
                  default: 0,
                  required: true,
                },
              },
              {
                name: "long",
                type: ValidationTypes.NUMBER,
                params: {
                  min: -180,
                  max: 180,
                  default: 0,
                  required: true,
                },
              },
            ],
          },
        },
      },
      {
        propertyName: "defaultMarkers",
        label: "Default markers",
        controlType: "INPUT_TEXT",
        inputType: "ARRAY",
        helpText: "Sets the default markers on the map",
        placeholderText: '[{ "lat": "val1", "long": "val2" }]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "lat",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -90,
                      max: 90,
                      default: 0,
                      required: true,
                    },
                  },
                  {
                    name: "long",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -180,
                      max: 180,
                      default: 0,
                      required: true,
                    },
                  },
                  {
                    name: "popupText",
                    type: ValidationTypes.TEXT,
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "isClickedMarkerCentered",
        label: "Map & Marker centering",
        helpText: "Controls whether the clicked marker is centered on the map",
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "enableCreateMarker",
        label: "Create new marker",
        helpText: "Allows users to mark locations on the map",
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "enableReplaceMarker",
        label: "Replace existing marker",
        helpText: "Allows users to mark locations on the map",
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "circles",
        label: "Circles to draw on Map",
        controlType: "INPUT_TEXT",
        inputType: "ARRAY",
        helpText: "Draws circles on the map",
        default:
          '[{"lat": 51.505, "long": -0.0755, "radius": 200, "title":"Tower Bridge", "options": {"color":"green","fillColor":"green"}}]',
        placeholderText:
          '[{ ["lat": "val1", "long": "val2"], "options:"{"radius":"val3"}}]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "lat",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -90,
                      max: 90,
                      default: 0,
                      required: true,
                    },
                  },
                  {
                    name: "long",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -180,
                      max: 180,
                      default: 0,
                      required: true,
                    },
                  },
                  {
                    name: "radius",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: 0,
                      max: 1000000,
                      default: 200,
                      required: true,
                    },
                  },
                  {
                    name: "options",
                    type: ValidationTypes.OBJECT,
                    allowedKeys: [
                      {
                        name: "title",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "color",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "fillColor",
                        type: ValidationTypes.TEXT,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "lines",
        label: "Lines to draw on Map",
        controlType: "INPUT_TEXT",
        inputType: "ARRAY",
        helpText: "Draws lines on the map",
        default:
          '[{"positions":[[51.505, -0.09],[51.51, -0.1],[51.51, -0.12],], "options": {"color":"green"}}]',
        placeholderText:
          '[{"positions":[["val1","val2"],[]...], "options:"{"color":"val3","fillColor":"val4", "title":"val5"}}]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "positions",
                    type: ValidationTypes.ARRAY,
                    params: {
                      required: true,
                    },
                  },
                  {
                    name: "options",
                    type: ValidationTypes.OBJECT,
                    allowedKeys: [
                      {
                        name: "color",
                        type: ValidationTypes.TEXT,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "polygons",
        label: "Polygons to draw on Map",
        controlType: "INPUT_TEXT",
        inputType: "ARRAY",
        helpText: "Draws polygons on the map",
        default:
          '[{"positions":[[51.515, -0.09],[51.52, -0.1],[51.52, -0.12]], "options": {"color":"green","fillColor":"green", "title":"Tower Bridge"}}]',
        placeholderText:
          '[{"positions":[["val1","val2"], []...], "options:"{"color":"val3"}}]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "positions",
                    type: ValidationTypes.ARRAY,
                    params: {
                      required: true,
                    },
                  },
                  {
                    name: "options",
                    type: ValidationTypes.OBJECT,
                    allowedKeys: [
                      {
                        name: "title",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "color",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "fillColor",
                        type: ValidationTypes.TEXT,
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "geoJSON",
        label: "GeoJSON features to draw on Map",
        controlType: "INPUT_TEXT",
        inputType: "ARRAY",
        helpText: "Draws GeoJSON features on the map",
        default:
          '[{"data":[[51.515, -0.09],[51.52, -0.1],[51.52, -0.12]], "style": {() => ({color: "#4a83ec", weight: 0.5, fillColor: "#1a1d62", fillOpacity: 1})}}]',
        placeholderText:
          '[{"data":[["val1","val2"], []...], "style:"{() => ({color: "val", weight: "val", fillColor: "val", fillOpacity: "val" })}}]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "data",
                    type: ValidationTypes.ARRAY,
                    params: {
                      required: true,
                      children: {
                        type: ValidationTypes.OBJECT,
                        params: {
                          required: true,
                          allowedKeys: [
                            {
                              name: "type",
                              type: ValidationTypes.TEXT,
                            },
                            {
                              name: "properties",
                              type: ValidationTypes.OBJECT,
                            },
                            {
                              name: "coordinates",
                              type: ValidationTypes.ARRAY,
                            },
                          ],
                        },
                      },
                    },
                  },
                  {
                    name: "style",
                    type: ValidationTypes.TEXT,
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "isVisible",
        label: "Visible",
        helpText: "Controls the visibility of the widget",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: "Animate Loading",
        controlType: "SWITCH",
        helpText: "Controls the loading of the widget",
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "allowZoom",
        label: "Show Zoom control",
        controlType: "SWITCH",
        helpText: "Controls the visibility of the zoom controls",
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "zoom",
        label: "Zoom",
        helpText: "Zoom level of map",
        defaultValue: 13,
        placeholderText: "13",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSconvertible: true,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            min: 0,
            max: 25,
            default: 10,
          },
        },
      },
      {
        propertyName: "markerText",
        label: "Marker Text",
        helpText: "Text of marker in center of map",
        placeholderText: "You are here",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSconvertible: true,
      },
    ],
  },
  {
    sectionName: "Events",
    children: [
      {
        propertyName: "onMarkerClick",
        label: "onMarkerClick",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        propertyName: "onCreateMarker",
        label: "onCreateMarker",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];