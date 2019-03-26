class Carousel extends HTMLElement {
  constructor() {
    super()
    this.width = this.getAttribute('width') || '100%'
    this.height = this.getAttribute('height')
    this.mode = this.getAttribute('mode') || 'shallow'
    this.hasDots = this.getAttribute('has-dots') === 'true' || true
    this.hasArrows = this.getAttribute('has-arrows') === 'true' || true
    this.time = this.getAttribute('time') || 3000
    this.images = JSON.parse(this.innerText)
    this.imgLength = this.images.length
    this.innerText = ''
    this.setAttribute('index', '0')
    this.timer = null

    this.shadow = this.attachShadow({ mode: 'open' })
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('wrapper')

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
      for (let i = 0; i < this.images.length; i++) {
        const dot = document.createElement('span')
        dot.classList.add('dot')
        dot.dataset.index = i
        if (i === 0) {
          dot.classList.add('active')
        }
        dotUl.appendChild(dot)
      }
      this.wrapper.appendChild(dotUl)
    }

    this.css = document.createElement('style')
    this.css.textContent = `
      * {
        margin: 0;
        padding: 0;
        border: none;
      }
      .wrapper {
        overflow: hidden;
        position: relative;
        width: ${this.width};
        height: ${this.height};
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
      .active {
        background: #778899;
      }`
  }

  static get observedAttributes() { return ['index'] }

  connectedCallback() {
    this.load(this.mode)
    this.bindEvent()
  }

  attributeChangedCallback() {
    this.updataImage(this.mode)
  }

  load(mode) {
    let load
    if (mode === 'shallow') {
      load = () => {
        const div = document.createElement('div')
        div.classList.add('img-wrapper')
        this.css.textContent += `
        .img-wrapper {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-image: url(${this.images[this.getAttribute('index')]});
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
        }`
        this.wrapper.appendChild(div)
        this.shadow.appendChild(this.css)
        this.shadow.appendChild(this.wrapper)
      }
    } else if (mode === 'scroll') {
      load = () => {
        this.images.forEach((img, i) => {
          const div = document.createElement('div')
          div.classList.add('img')
          div.style.backgroundImage = `url(${this.images[i]})`
          if (i === this.images.length - 1) div.classList.add('left')
          else if (i === 0) div.classList.add('now')
          this.wrapper.appendChild(div)
        })
        this.css.textContent += `
          .img {
            width: ${this.width};
            height: ${this.height};
            position: absolute;
            top: 0;
            transform: translate(100%);
            background-position: center;
            background-size: cover;
            transition: transform .5s ease-in;
          }
          .left {
            transform: translate(-100%);
          }
          .now {
            transform: translate(0);
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
          }`
        this.shadow.appendChild(this.css)
        this.shadow.appendChild(this.wrapper)
      }
    } else if (mode === 'stage') {
      load = () => {

      }
    } else {
      load = () => {
        throw new Error('Mode selection error: Can only select shallow, scroll, stage or default mode')
      }
    }
    return load()
  }

  getClass(eleClass) {
    const getTheEleByClass = function (eleClass, root) {
      const nodes = root.children
      const len = root.children.length
      let ele
      for (let i = 0; i < len; i++) {
        if (nodes[i].classList.contains(eleClass)) {
          ele = nodes[i]
          break
        }
        if (nodes[i].children.length > 0) {
          ele = getTheEleByClass(eleClass, nodes[i])
        }
      }
      return ele
    }
    return getTheEleByClass(eleClass, this.wrapper)
  }

  updataImage(mode) {
    let updataImage
    if (mode === 'shallow') {
      updataImage = () => {
        // 读取 index 值，更新图片
        const imgWrapper = this.getClass('img-wrapper')
        imgWrapper.style.opacity = 0
        setTimeout(() => {
          imgWrapper.style.backgroundImage = `url(${this.images[this.getAttribute('index')]})`
          imgWrapper.style.opacity = 1
        }, 500)
        // 更改 dot
        this.getClass('active').classList.remove('active')
        Array.from(this.getClass('dotUl').children)[this.getAttribute('index')].classList.add('active')
      }
    } else if (mode === 'scroll') {
      updataImage = () => {
        this.getClass('now').classList.remove('now')
        this.getClass('left').classList.remove('left')
        const imgs = Array.from(this.getClass('img'))
        const len = imgs.length
        for (let i = 0; i < len; i++) {
          if (i === this.getAttribute('index')) {
            // imgs[i].classList.add('now')
            // const j = i === 0 ? len - 1 : i - i
            // imgs[j].classList.add('left')
          }
        }
        // 更改 dot
        this.getClass('active').classList.remove('active')
        Array.from(this.getClass('dotUl').children)[this.getAttribute('index')].classList.add('active')
      }
    } else if (mode === 'stage') {
      updataImage = () => {

      }
    }
    return updataImage()
  }

  clickDot(event) {
    // 更改 index 属性的 值
    this.setAttribute('index', event.path[0].dataset.index)
  }

  prevOne() {
    let index = Number(this.getAttribute('index'))
    if (index === 0) {
      index = this.imgLength - 1
    } else {
      index -= 1
    }
    this.setAttribute('index', index)
  }

  nextOne() {
    let index = Number(this.getAttribute('index'))
    if (index === this.imgLength - 1) {
      index = 0
    } else {
      index += 1
    }
    this.setAttribute('index', index)
  }

  setTimer() {
    this.timer = setInterval(() => {
      this.nextOne()
    }, this.time)
  }

  clearTimer() {
    clearInterval(this.timer)
  }

  bindEvent() {
    this.wrapper.addEventListener('mouseenter', this.clearTimer.bind(this))
    this.wrapper.addEventListener('mouseleave', this.setTimer.bind(this))
    this.getClass('dotUl').addEventListener('click', this.clickDot.bind(this))
    this.getClass('next').addEventListener('click', this.nextOne.bind(this))
    this.getClass('prev').addEventListener('click', this.prevOne.bind(this))
  }
}

customElements.define('h-carousel', Carousel)
