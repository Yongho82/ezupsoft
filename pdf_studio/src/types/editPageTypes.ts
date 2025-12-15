import { ShapeType } from "../components/edit_page/ShapesDropdown";

export type TextObject = {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
  opacity?: number; // 0 to 1
};

export type ImageObject = {
  id: string;
  originalSrc: string; // data URL of original image
  displaySrc: string; // data URL of image to display (can be tinted)
  x: number;
  y: number;
  width: number;
  height: number;
  fileType: string;
  opacity: number; // 0 to 1
  isSignature?: boolean;
  tintColor?: string;
};

export type ShapeObject = {
  id: string;
  shapeType: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  rotation: number; // degrees
  opacity: number; // 0 to 1
  strokeDashArray: number[]; // e.g., [] for solid, [8, 4] for dashed
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  isBold?: boolean;
  isItalic?: boolean;
};

export type NormalizedLine = {
    id: string;
    points: { x: number; y: number }[];
    color: string;
    strokeWidth: number;
    dashArray: number[];
};

export type PageState = {
    drawings: NormalizedLine[];
    textObjects: TextObject[];
    imageObjects: ImageObject[];
    shapeObjects: ShapeObject[];
}

export type PageObjects = {
    drawingsByPage: Record<number, NormalizedLine[]>;
    textObjectsByPage: Record<number, TextObject[]>;
    imageObjectsByPage: Record<number, ImageObject[]>;
    shapeObjectsByPage: Record<number, ShapeObject[]>;
}