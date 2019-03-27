# carousel-web-component

- [x] 三种轮播方式可选择

- [x] 可制定高宽

- [x] 可选择有无 dot 和左右 arrow

- [x] 可选择轮换周期时间

## usage

height: (required)

width: 100%(default)

mode: shallow(default) / scroll / stage

has-dots: true(default) / false

has-arrows: true(default) / false

time: 3000(default)

```html
<h-carousel
  width="400px"
  height="200px"
  mode="shallow"
  has-dots="false"
  has-arrows="true"
  time="2000">
  <!-- An image url array -->
  [
    "./img/some-image0.png",
    "./img/some-image1.png",
    "./img/some-image2.png"
  ]
</h-carousel>
```
