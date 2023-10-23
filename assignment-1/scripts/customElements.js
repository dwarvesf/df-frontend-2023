"use strict";

// custom-elements.js
class HeaderElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <div style='border:2px solid red; padding:5px'>
              This is my header
          </div>
      `;
  }
}

class FooterElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
          <div style='border:2px solid red; padding:5px'>
              This is my header
          </div>
      `;
  }
}
