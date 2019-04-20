import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AnchorService } from '../anchor.service';
import { VflAnchor } from '../vfl-anchor';
import { Observable, fromEvent, Subscription } from 'rxjs';

/**
 * Example Component for a navigation bar to display anchors and highlight the current
 */
@Component({
  selector: 'vflNavigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private scrollEventSubscription: Subscription;
  anchors$: Observable<VflAnchor[]>;

  constructor(private anchorService: AnchorService, private el: ElementRef) {
    this.anchors$ = this.anchorService.anchors;

    this.subscribeToScrollEvent();
  }


  ngOnInit() {
  }

  /**
   * Unsubsribe on destroy
   */
  ngOnDestroy() {
    if (this.scrollEventSubscription) {
      this.scrollEventSubscription.unsubscribe();
    }
  }

  /**
   * Subscribe to scroll event
   */
  private subscribeToScrollEvent() {
    this.scrollEventSubscription = fromEvent(document, 'scroll').subscribe((e: any) => {
      const scrollingElement = e.target.scrollingElement;
      this.checkScrollPosition(scrollingElement.clientHeight + scrollingElement.scrollTop);
    });
  }

  /**
   * Chekcs if an anchor is the current one- call to service func
   * @param scrollPostitionY Position in document
   */
  checkScrollPosition(scrollPostitionY: number) {
    this.anchorService.checkCurrentPosition(scrollPostitionY);
  }

}
