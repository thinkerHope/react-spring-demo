
function ctor() {
  return function(){};
}

export default function baseCreate(prototype) {
  if (!isObject(prototype)) return {};
  if (nativeCreate) return nativeCreate(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result = new Ctor;
  Ctor.prototype = null;
  return result;
}

// useSpring除了传入对象，还可以传入一个函数
import { useSpring, animated } from 'react-spring'

function Demo2() {
  const [{ xys }, set] = useSpring(
    () => ({
      xys: [0, 0, 1],
      config: { mass: 5, tension: 350, friction: 40 }  
    })
  )
  
  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
  const calc = (x, y) => []
  
  return (
    <animated.div
      class="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: xys.interpolate(trans)
      }}
    >
    </animated.div>
  )
}