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
      this.addNewAnchor(this.el.nativeElement);
    }
  }

  /**
   * Add new anchor to the service
   */
  private addNewAnchor(nativeElement: any) {
    const newID = nativeElement.id;
    this.anchorService.add(newID, this.displayName, nativeElement.offsetTop);
  }
}
