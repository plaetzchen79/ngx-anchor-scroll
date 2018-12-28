import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { AnchorService } from "./anchor.service";

/**
 * Use this directevice to register htm anchor to service
 */
@Directive({
  selector: '[vflAnchor]'
})
export class VflAnchorDirective implements OnInit {
  /**
   * Name to be shown in component
   */
  @Input()
  displayName: string;

  constructor(private el: ElementRef, private anchorService: AnchorService) {
  }

  ngOnInit() {
    if (this.el.nativeElement.id) {
      this.addNewAnchor();
    }
  }

  /**
   * Add new anchor to the service
   */
  private addNewAnchor() {
    const newID = this.el.nativeElement.id;
    this.anchorService.add(newID, this.displayName, this.el.nativeElement.offsetTop);
  }
}
