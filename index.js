class Carousel extends HTMLElement {
  constructor() {
    super()
    this.index = 0
    this.width = this.getAttribute('width') || '100%'
    this.height = this.getAttribute('height')
    this.mode = this.getAttribute('mode') || 'shallow'
    this.hasDots = this.getAttribute('has-dots') === 'true' || true
    this.hasArrows = this.getAttribute('has-arrows') === 'true' || true
    this.images = JSON.parse(this.innerText)
    this.innerText = ''
    this.setAttribute('image', this.images[this.index])

    this.shadow = this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('wrapper')
  }

  static get observedAttributes() { return ['image'] }

  connectedCallback() {
    this.load(this.mode)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    
  }

  load(mode) {
    let load
    if (mode === 'shallow') {
      load = () => {
        const div = document.createElement('div')
        div.classList.add('img-wrapper')

        if (this.hasArrows) {
          const prevBtn = document.createElement('button')
          prevBtn.type = 'button'
          prevBtn.classList.add('btn')
          prevBtn.classList.add('prev')
          prevBtn.innerText = '←'
          const nextBtn = document.createElement('button')
          nextBtn.type = 'button'
          nextBtn.classList.add('btn')
          nextBtn.classList.add('next')
          nextBtn.innerText = '→'
          this.wrapper.appendChild(prevBtn)
          this.wrapper.appendChild(nextBtn)
        }

        if (this.hasDots) {
          const dotUl = document.createElement('ul')
          dotUl.classList.add('dotUl')
          const dots = Array(this.images.length).fill(document.createElement('span'))
          dots.forEach((dot) => {
            dot.classList.add('dot')
            dotUl.appendChild(dot.cloneNode(true))
          })
          this.wrapper.appendChild(dotUl)
        }

        const style = document.createElement('style')
        style.textContent = `
          * {
            margin: 0;
            padding: 0;
            border: none;
          }
          .wrapper {
            position: relative;
            width: ${this.width};
            height: ${this.height};
          }
          .img-wrapper {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url(${this.images[this.index]});
            background-position: center;
            background-size: cover;
            transition: opacity .5s ease-in;
            opacity: 1;
          }
          .btn {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            width: 8%;
            height: 25%;
            font-size: 0;
            background: transparent;
            z-index: 1;
            outline: none;
            cursor: pointer;
          }
          .btn:hover {
            font-size: 100%;
            background: rgba(119, 136, 153, 0.5);
          }
          .prev {
            left: 0;
          }
          .next {
            right: 0;
          }
          .dotUl {
            display: flex;
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translate(-50%);
            z-index: 1;
          }
          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #F0FFFF;
            margin: 0 8px;
            cursor: pointer;
          }
          .dot:hover {
            background: #778899;
          }
          .dot:nth-child(${this.index + 1}) {
            background: #778899;
          }`
        this.shadow.appendChild(style)
        this.wrapper.appendChild(div)
        this.shadow.appendChild(this.wrapper)
      }
    } else if (mode === 'scroll') {
      // load =
    } else if (mode === 'stage') {
      // load =
    } else {
      load = () => {
        throw new Error('Mode selection error: Can only select shallow, scroll, stage or default mode')
      }
    }
    return load()
  }

  updataImage(mode) {
    let updataImage
    if (mode === 'shallow') {
      // updataImage =
    } else if (mode === 'scroll') {
      // updataImage =
    } else if (mode === 'stage') {
      // updataImage =
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
