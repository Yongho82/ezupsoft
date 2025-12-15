export interface SelectedElementInfo {
  id: string;
  tagName: string;
  text: string;
  currentFontSize: number;
  currentWidth: number;
  currentHeight: number;
  currentTop: number;
  currentLeft: number;
  color: string;
  backgroundColor: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  textAlign: string;
  fontFamily: string;
  isLink: boolean;
  linkHref: string;
  linkTarget: string;
  // Layout Properties
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  // Border & Effects Properties
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  borderRadius: number;
  boxShadow: string;
  opacity: number;
  // Positioning Properties
  zIndex: number;
  position: string;
  display: string;
  flexDirection: string;
  alignItems: string;
  justifyContent: string;
  lineNumber: number;
  animationDuration: string;
  // Hover State Properties
  hoverColor: string;
  hoverBackgroundColor: string;
  lineHeight: number;
  // Animation distance (CSS var --anim-distance)
  animDistance?: string;
}