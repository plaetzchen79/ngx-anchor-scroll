import { Component, OnInit, ElementRef } from '@angular/core';
import { AnchorService } from '../anchor.service';
import { VflAnchor } from '../vfl-anchor';
import { Observable, fromEvent } from 'rxjs';

/**
 * Example Component for a navigation bar to display anchors and highlight current
 */
@Component({
  selector: 'vflNavigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private scrollEvent$;
  anchors$: Observable<VflAnchor[]>;

  constructor(private anchorService: AnchorService, private el: ElementRef) {
    this.anchors$ = this.anchorService.anchors;

    this.scrollEvent$ = fromEvent(document,
      'scroll').subscribe((e: any) => {
        this.checkScrollPosition(e.target.scrollingElement.clientHeight + e.target.scrollingElement.scrollTop);
      });
  }

  ngOnInit() {
  }

  /**
   * Chekcs if an anchor is the current one- call to service func
   * @param scrollPostitionY Position in document
   */
  checkScrollPosition(scrollPostitionY: number) {
    this.anchorService.checkCurrentPosition(scrollPostitionY);
  }

}
