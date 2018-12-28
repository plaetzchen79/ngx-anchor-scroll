import { VflAnchor } from './vfl-anchor';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service to store the anchors
 */
@Injectable({
  providedIn: 'root'
})
export class AnchorService {
  private _anchors: VflAnchor[] = [];
  private dataSource = new BehaviorSubject<VflAnchor[]>(this._anchors);

  anchors = this.dataSource.asObservable();

  constructor() {}

  /**
   * Add a new anchor
   * @param newAnchorID  HTML id
   */
  add(newAnchorID: string, displayName: string, positionY: number): void {
    const tmpAnchors = this.dataSource.getValue();
    const tmpAnchor = new VflAnchor();
    tmpAnchor.id = newAnchorID;
    tmpAnchor.postionY = positionY;
    tmpAnchor.isCurrent = false;
    tmpAnchor.link = '#' + tmpAnchor.id;
    tmpAnchor.nextPositionY = 0;

    if (displayName) {
      tmpAnchor.displayName = displayName;
    } else {
      tmpAnchor.displayName = newAnchorID;
    }

    if (tmpAnchors.length > 0) {
      tmpAnchors[tmpAnchors.length - 1].nextPositionY = positionY;
    }

    tmpAnchors.push(tmpAnchor);

    this.emitChanges(tmpAnchors);
  }

  /**
   * Check if an anchor needs to be highlighted due to scrolling position
   * @param scrollPositionY Current scroll-position of document
   */
  checkCurrentPosition(scrollPositionY: number) {
    const tmpAnchors = this.dataSource.getValue();
    const tmpAnchor = tmpAnchors.find(item => (this.getAnchor(item, scrollPositionY)) );

    // reset
    tmpAnchors.forEach(item => item.isCurrent = false);

    if (tmpAnchor) {
      tmpAnchor.isCurrent = true;
    }

    this.emitChanges(tmpAnchors);
  }

  /**
   * Emit chnages => inform all listening subscribers
   * @param tmpAnchors Updaeted array
   */
  private emitChanges(tmpAnchors: VflAnchor[]) {
    this._anchors = [...tmpAnchors];
    this.dataSource.next(this._anchors);
  }

  /**
   * Gets the anchor beeing in the current view area of the browser window
   * @param item Anchor item
   * @param scrollPositionY  Documents scroll height
   */
  private getAnchor(item: VflAnchor, scrollPositionY: number): boolean {
    if ((scrollPositionY <= item.nextPositionY || item.nextPositionY === 0) && scrollPositionY >= item.postionY) {
      return true;
    } else {
      return false;
    }
  }
}
