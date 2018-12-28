# NgxAnchorScroll
Implementation of an One-Pager (Scroller) in Angular.
It stores HTML anchors and offers a navigation bar component.
This component highlights the anchor in the current view of the document
(based on scroll position).

This project has been started wih the idea of creating a library.
Until now it is not a library because there are so many ways displaying a navigation component.

So what its all about?

- an attribute directive to mark an HTML anchor:  `vflAnchor`
- a class which describes our anchors: `VflAnchor`
- a service `AnchorService` to store the anchors (using rxjs)
- an example component `vflNavigation` to display the anchors and to *highlight* (bold) the current anchor based on the scroll position (using async pipe)

## Example
### Anchors
Extend the HTML Anchor with the `vflAnchor` directive.
You can set a `displayName` which is then used in the navigation component as text for the a href.

Example:

```html
 <a href='{{anchor.link}}'> {{anchor.displayName}}</a>
```

### Navigation
Just place the component where you like.

To build your own component use the observable `anchors` from the service `AnchorService`
to make a for loop with the *async pipe*.
Use the properties *link*, *isCurrent* and *displayName* from the `vflAnchor`-class inside the loop.

Example:

```html
<div *ngFor='let anchor of anchors$ | async'>
  <a href='{{anchor.link}}' [ngStyle]="{'font-weight': (anchor.isCurrent === true) ? 'bold' : 'normal'}">
    {{anchor.displayName}}</a>
</div>
```

To check and update the scroll postion check call the function *checkCurrentPosition*.

```javascript
   this.scrollEvent$ = fromEvent(document,
      'scroll').subscribe((e: any) => {
        this.checkScrollPosition(e.target.scrollingElement.clientHeight + e.target.scrollingElement.scrollTop);
      });

this.anchorService.checkCurrentPosition(scrollPostitionY);
```
 

## Run
Just run `ng serve` to start the app and to see an example.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

