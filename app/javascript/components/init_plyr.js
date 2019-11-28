import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
const player = new Plyr('#listening-audio');

(function(document, window) {
  "use strict";

  /**
  * Initialize the SVG Fixer after the DOM is ready
  */
  document.addEventListener("DOMContentLoaded", function() {

    /**
     * Current URL, without the hash
     */
    var baseUrl = window.location.href
      .replace(window.location.hash, "");

    /**
    *  Find all `use` elements with a namespaced `href` attribute, e.g.
    *  <use xlink:href="#some-id"></use>
    *
    *  See: http://stackoverflow.com/a/23047888/796152
    */
    [].slice.call(document.querySelectorAll("use[*|href]"))

      /**
      * Filter out all elements whose namespaced `href` attribute doesn't
      * start with `#` (i.e. all non-relative IRI's)
      *
      * Note: we're assuming the `xlink` prefix for the XLink namespace!
      */
      .filter(function(element) {
        return (element.getAttribute("xlink:href").indexOf("#") === 0);
      })

      /**
      * Prepend `window.location` to the namespaced `href` attribute value,
      * in order to make it an absolute IRI
      *
      * Note: we're assuming the `xlink` prefix for the XLink namespace!
      */
      .forEach(function(element) {
        element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href"));
      });

  }, false);

}(document, window));
