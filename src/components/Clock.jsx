import React from 'react'
import styled from 'styled-components'
import City from './City'
import Time from './Time'
import Pointer from './Pointer'
import Center from './Center'
import Core from './Core'

const StyledClock = styled.div`
  width: ${props => props.$size};
  aspect-ratio: 1/1;
  background-color: ${({ $light, theme }) => $light ? theme.clockBackground.light : theme.clockBackground.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  color: ${props => props.color};
  border-radius: 2rem;
  padding: 2rem;
  margin: 2rem;
`

//设置默认属性值
StyledClock.defaultProps = {
  $size: "40rem",
  $light: false,
  $color: 'black'
}

const Clock = (props) => {

  const { city, timezone } = props
  const [light, setLight] = React.useState(false)

  const [year, setYear] = React.useState();
  const [month, setMonth] = React.useState();
  const [day, setDay] = React.useState();

  const [hour, setHour] = React.useState();
  const [minute, setMinute] = React.useState();
  const [second, setSecond] = React.useState();

  const [hourDeg, setHourDeg] = React.useState(0);
  const [minuteDeg, setMinuteDeg] = React.useState();
  const [secondDeg, setSecondDeg] = React.useState();

  //通过偏转得到对应时区的时间
  const setTime = () => {
    const currentTime = new Date()
    const offset = timezone * 60 * 60 * 1000
    const timeWithOffset = new Date(currentTime.getTime() + offset)

    const unitDeg = 360 / 60
    const bigUnitDeg = 360 / 12

    setYear(timeWithOffset.getUTCFullYear())
    setMonth(timeWithOffset.getUTCMonth() + 1)
    setDay(timeWithOffset.getUTCDate())
    setHour(timeWithOffset.getUTCHours())
    setMinute(timeWithOffset.getUTCMinutes())
    setSecond(timeWithOffset.getUTCSeconds())

    //分钟之后还要加秒的deg，小时后要加分钟的deg  这样会一点一点渐进，不会一次跳一格
    setSecondDeg(timeWithOffset.getUTCSeconds() * unitDeg)
    setMinuteDeg((timeWithOffset.getUTCMinutes() + timeWithOffset.getUTCSeconds() / 60) * unitDeg)
    setHourDeg((timeWithOffset.getUTCHours() + timeWithOffset.getUTCMinutes() / 60) * bigUnitDeg)
  }

  React.useEffect(() => {
    setTime()
    const interval = setInterval(() => {
      setTime()
    }, 200)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {//控制黑天还是白天
    (hour >= 6 && hour < 18) ? setLight(true) : setLight(false)
  }, [hour])

  return (
    //$表示这个特殊属性只属于styledClock样式操作，因为light并不属于html里面的标准属性，是styled组件
    //有时候也为了防止和html本身的属性重名，而误传给html属性，而不是我们自己定义的属性
    //在 styled-components 中，使用 $ 前缀的主要目的是为了防止非标准的属性传递到原生 DOM 元素上。
    //$ 前缀可以用来表示 "transient props"（临时属性），它们不会传递到最终渲染的 HTML 元素上，而是仅用于 styled-components 内部进行样式的处理。
    <StyledClock $light={light}>
      <City $light={light}>{city}</City>
      <Pointer $light={light}>
        <Center $light={light} />
        <Core $light={light} $angle={hourDeg} $pointer_width={7} $block_size={90} $pointer_light={"#848484"} $pointer_dark={"#ff6767"} />
        <Core $light={light} $angle={minuteDeg} $pointer_width={4} $block_size={120} $pointer_light={"#848484"} $pointer_dark={"#fff"} />
        <Core $light={light} $angle={secondDeg} $pointer_width={2} $block_size={140} $tail={25} />
      </Pointer>
      <Time $light={light}>{year}-{month}-{day}——{hour}:{minute}:{second} </Time>
    </StyledClock>
  )
}
export default Clock