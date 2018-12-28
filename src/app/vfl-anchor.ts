/**
 * Anchor class for service
 */
export class VflAnchor {
  /**
   * HTML id of anchor
   */
  id: string;

  /**
   * Link to anchor (for a href # + id)
   */
  link: string;

  /**
   * Name of link to be displayed in component / for user
   */
  displayName: string;

  /**
   * Y-Position of anchor in document
   */
  postionY: number;

  /**
   * Y-Position of next anchor (successor)
   */
  nextPositionY: number;

  /**
   * If anchor is the current in scroll position of doucment => needs to highlighted
   */
  isCurrent: boolean;
}
