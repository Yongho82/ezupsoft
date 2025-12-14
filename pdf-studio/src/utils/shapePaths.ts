import { ShapeType } from "../components/edit_page/ShapesDropdown";

// All paths are designed for a 100x100 viewBox.
// They should be scaled when rendered.
export const getShapePath = (shapeType: ShapeType): string => {
    switch(shapeType) {
        // Lines - rendered as thin shapes for selection purposes
        case 'line':
            return 'M0,49 H100 V51 H0 Z';
        case 'line-arrow':
            return 'M0,49 H80 V40 L100,50 L80,60 V51 H0 Z';
        case 'line-bi-arrow':
            return 'M20,40 L0,50 L20,60 V51 H80 V60 L100,50 L80,40 V49 H20 Z';

        // Rectangles
        case 'rectangle':
            return 'M0,0 H100 V100 H0 Z';
        case 'rounded-rectangle':
        case 'stamp-approved':
        case 'stamp-rejected':
        case 'stamp-completed':
        case 'stamp-confidential':
        case 'stamp-draft':
        case 'stamp-urgent':
        case 'stamp-copy':
        case 'stamp-void':
        case 'stamp-paid':
            return 'M10,0 H90 C95.5,0 100,4.5 100,10 V90 C100,95.5 95.5,100 90,100 H10 C4.5,100 0,95.5 0,90 V10 C0,4.5 4.5,0 10,0 Z';

        // Basic Shapes
        case 'oval':
            return 'M50,0 C77.61,0 100,22.39 100,50 C100,77.61 77.61,100 50,100 C22.39,100 0,77.61 0,50 C0,22.39 22.39,0 50,0 Z';
        case 'triangle':
            return 'M50,0 L100,100 L0,100 Z';
        case 'right-triangle':
            return 'M0,0 H100 V100 Z';
        case 'pentagon':
            return 'M50,0 L100,38 L82,100 L18,100 L0,38 Z';
        case 'hexagon':
            return 'M25,0 L75,0 L100,50 L75,100 L25,100 L0,50 Z';
        case 'octagon':
            return 'M30,0 L70,0 L100,30 L100,70 L70,100 L30,100 L0,70 L0,30 Z';
        case 'cross':
            return 'M30,0 H70 V30 H100 V70 H70 V100 H30 V70 H0 V30 H30 Z';
        case 'heart':
            return 'M50,20 C50,0 20,-5 20,20 C20,40 50,70 50,70 C50,70 80,40 80,20 C80,-5 50,0 50,20 Z'; // Simplified
        case 'star-5':
            return 'M50,0 L61,35 L98,35 L68,57 L79,91 L50,68 L21,91 L32,57 L2,35 L39,35 Z';
            
        // Block Arrows
        case 'arrow-right':
            return 'M0,25 H60 V0 L100,50 L60,100 V75 H0 Z';
        case 'arrow-left':
            return 'M100,25 H40 V0 L0,50 L40,100 V75 H100 Z';
        case 'arrow-up':
            return 'M25,100 V40 H0 L50,0 L100,40 H75 V100 Z';
        case 'arrow-down':
            return 'M25,0 V60 H0 L50,100 L100,60 H75 V0 Z';
        
        // Stamps
        case 'checkmark':
            // Shifted up to visually center it in the bounding box.
            return 'M10 40 L40 70 L90 10 L80 0 L40 50 L20 30 Z';
        case 'crossmark':
             // Centered path within 100x100 viewBox
            return 'M25 10 L10 25 L35 50 L10 75 L25 90 L50 65 L75 90 L90 75 L65 50 L90 25 L75 10 L50 35 Z';
            
        default:
            return 'M0,0 H100 V100 H0 Z'; // Default to a rectangle
    }
};