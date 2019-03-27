# carousel-web-component

- [x] 三种轮播方式可选择

- [x] 可制定高宽

- [x] 可选择有无 dot 和左右 arrow

- [x] 可选择轮换周期时间

scroll 点击 dot 有点 ~~bug~~ feature，一改要改好多，不如去看书。

![](./img/haha.jpg)

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
    "./img/some-image-0.png",
    "./img/some-image-1.png",
    "./img/some-image-2.png"
  ]
</h-carousel>
```
