class Carousel extends HTMLElement {
  constructor() {
    super()
    this.width = this.getAttribute('width') || '100%'
    this.height = this.getAttribute('height')
    this.mode = this.getAttribute('mode') || 'shallow'
    this.hasDots = this.getAttribute('has-dots') === 'true' || true
    this.hasArrows = this.getAttribute('has-arrows') === 'true' || true
    this.mages = JSON.parse(this.innerText)
    this.innerText = ''

    const shadow = this.attachShadow({ mode: 'open' })
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'wrapper')

  }

  static get observedAttributes() { return ['image'] }

  connectedCallback() {
    this.loadImages(this.mode)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
  }

  loadImages(mode) {
    if (mode === 'shallow') {
      loadImages = 
    } else if (mode === 'scroll') {
      loadImages = 
    } else if (mode === 'stage') {
      loadImages = 
    } else {
      loadImages = () => {
        throw new Error('Mode selection error: Can only select shallow, scroll, stage or default mode')
      }
    }
    return loadImages()
  }

  updataImage(mode) {
    if (mode === 'shallow') {
      updataImage = 
    } else if (mode === 'scroll') {
      updataImage = 
    } else if (mode === 'stage') {
      updataImage = 
    } else {
      // updataImage = () => {
      //   throw new Error('Mode selection error: Can only select shallow, scroll, stage or default mode')
      // }
    }
    return updataImage()
  }

  clickDot() {

  }

  prevOne() {
    
  }

  nextOne() {

  }
}

customElements.define('h-carousel', Carousel)
