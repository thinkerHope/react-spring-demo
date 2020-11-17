# react-spring介绍

让动画有了物理弹簧特效的库。继承了animated的插值和react-motion的高性能。

[react-spring官网](https://www.react-spring.io/docs/)



# 简单入门

### from and to 

UseSpring是一个可以设置样式的自定义钩子，它接受一个对象，该对象具有from和to值作为开始和结束状态，react-spring正是用这两个状态来处理过渡的动画效果。from和to几乎可以设置所有的CSS属性对象：`颜色，大小，transform，甚至滚动条`。

默认情况下，动画会在`组件挂载`的时候立即执行。

从一个值过渡到另外一个值可能有点单调，但react-spring可以使用数组来渲染具有多个阶段的动画。只需记住始终将起始状态包含在要添加的任何属性里面即可。

```react
const App = () => {
  const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const colorAnimation = useSpring({
    from: { color: 'blue' },
    to: { color: `rgb(255,0,0)` }
  });

  const multiAnimation = useSpring({
    from: { opacity: 0, color: 'red' },
    to: [
        { opacity: 1, color: '#ffaaee' },
        { opacity: 1, color: 'red' },
        { opacity: .5, color: '#008000' },
        { opacity: .8, color: 'black' }
    ]
  });
  return (
    <div>
      <animated.h1 style={animation}>Hello World</animated.h1>
      <animated.h1 style={colorAnimation}>Hello World</animated.h1>
      <animated.h1 style={multiAnimation}>Hello World</animated.h1>
    </div>
  )
};

export default App;
```

> 注意，以下为 from/to 的简写

```js
const animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
// 简写
const animation = useSpring({
    from: { opacity: 0 },
    opacity: 1
  });
```

```react
const { o, xyz, color } = useSpring({
  from: { o: 0, xyz: [0, 0, 0], color: 'red' },
  to: {
    o: 1,
  	xyz: [10, 20, 5],
  	color: 'green'
  }
})
// 简写
const {o, xyz, color} = useSpring({
  from: { o: 0, xyz: [0, 0, 0], color: 'red' },
  o: 1,
  xyz: [10, 20, 5],
  color: 'green'
})
```



### State的概念

绑定一些本地状态能够向动画中添加一些实时的效果，而不是在挂载时进行动画效果过渡。 对于单步动画，我们可以使用三元运算符来代替from and to属性。

```react
const App = () => {
  const [on, toggle] = useState(false);

  const animation = useSpring({
    color: on ? 'blue' : 'red'
  });
  return (
    <div>
      <animated.h1 style={animation}>{!on ? "I'm red" : "Now I'm blue" }		  </animated.h1>
      <button onClick={() => toggle(!on)}>Change</button>
    </div>
  )
};
```



### 插值（interpolate）

值得一提的是强大的interpolate插值函数。

有了Interpolate，我们可以从spring中取值，并使用Interpolate对其进行更多分解，将其放入模板中， 这将使我们能够自由设置更多的动态值。

```react
const App = () => {
  const [on, toggle] = useState(false);

  const { xy } = useSpring({
    from: { xy: [0, 0], color: 'green' },
    xy: on ? [800, 200] : [0, 0],
    c: 'red'
  });
  return (
    <div>
      <animated.h1
        style={{ 
            transform: xy.interpolate((x, y) => `translate(${x}px, ${y}px)`), 
            color: c.interpolate(c => c)}}>
        {!on ? "I'm here" : "Now I'm over here"}</animated.h1>
      <button onClick={() => toggle(!on)}>Change</button>
    </div>
  )
};
```



### Mimicking Keyframes

Interpolate更有用的方面之一是我们可以模拟CSS关键帧。与其将值传递到spring中，不如将其设置为1或0。像以前一样Interpolate之前，我们需要传递一个具有范围和输出的对象。 范围可以是0到1之间的任何值，并且可以像使用CSS关键帧设置断点那样工作，相应的输出是将要预渲染的值。

然后，第二次插值将在每次输出更改时重置我们的样式。

```react
const App = () => {
  const [on, toggle] = useState(false)

  const { x, c } = useSpring({
    from: { xy: [0, 0], c: 0 },
    x: on ? 1 : 0,
    c: on ? 1 : 0
  })

  return ( 
    <div>
      <animated.h1
        style={{
          transform: x.interpolate({
            range: [0, .25, .5, .75, 1],
            output: [0, 500, 200, 800, 500]
          }).interpolate(x => `translateX(${x}px)`),

          color: c.interpolate({
            range: [0, .5, 1],
            output: ['red', 'blue', 'green']
          }).interpolate(c => c)
        }}>
        {!on ? "I'm here" : "Now don't know where I'm going"}</animated.h1>
      <button onClick={() => toggle(!on)}>Change</button>
    </div>
  )
}
```



### Configs

```js
useSpring({ config: { duration: 250 }, ... })
```

详细见[官网](https://www.react-spring.io/docs/hooks/api)。

比较重要的三个参数：

```
mass // 弹簧质量
tension // 弹簧张力
friction // 摩擦力（和弹簧张力构成反作用力）
```

