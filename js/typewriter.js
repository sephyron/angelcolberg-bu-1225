class TypewriterComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
          }
          span.cursor {
            animation: blinker 1s ease-in-out infinite;
          }
          @keyframes blinker {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            } 
            100% {
              opacity: 0;
            }
          }
        </style>
        <div id="typedtext"></div>
      `;
  
      this.iSpeed = this.getAttribute('ispeed') || 10;
      this.iIndex = 0;
      this.iScrollAt = 20;
      this.iTextPos = 0;
      this.sContents = '';
      this.iRow = 0;
    }
  
    connectedCallback() {
      // Get text content from the element and split it into lines
      this.aText = this.textContent.trim().split('\n').map(line => line.trim());
      this.textContent = ''; // Clear the original content
      this.iArrLength = this.aText[0].length;
      this.typewriter();
    }
  
    typewriter() {
      this.sContents = ' ';
      this.iRow = Math.max(0, this.iIndex - this.iScrollAt);
      const destination = this.shadowRoot.getElementById("typedtext");
  
      while (this.iRow < this.iIndex) {
        this.sContents += this.aText[this.iRow++] + '<br />';
      }
      destination.innerHTML = this.sContents + this.aText[this.iIndex].substring(0, this.iTextPos) + "<span class='cursor'>_</span>";
      if (this.iTextPos++ == this.iArrLength) {
        this.iTextPos = 0;
        this.iIndex++;
        if (this.iIndex != this.aText.length) {
          this.iArrLength = this.aText[this.iIndex].length;
          setTimeout(() => this.typewriter(), 500);
        }
      } else {
        setTimeout(() => this.typewriter(), this.iSpeed);
      }
    }
  }
  
  customElements.define('typewriter-component', TypewriterComponent);