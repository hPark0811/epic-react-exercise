import React, { CSSProperties, forwardRef, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

interface ScrollStyle {
  width: number,
  height: number
}

const Scrollable = forwardRef(
  //@ts-ignore
  ({ style, children }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      scrollBottom();
    }, [])

    const scrollTop = () => {divRef?.current && (divRef.current.scrollTop = 0)}

    const scrollBottom = () => {divRef?.current && (divRef.current.scrollTop = divRef.current.scrollHeight)}

    useImperativeHandle(ref, () => ({ scrollTop, scrollBottom }))

    return (
      <div style={{ ...style, padding: 50, borderRadius: 20, backgroundColor: 'pink' }}>
        <div style={{ width: '100%', height: '100%', overflow: 'auto' }} ref={divRef}>
          {children}
        </div>
      </div>
    )
  }
)

function Scrolley() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScrollTop = () => {
    if (scrollRef?.current) {
      //@ts-ignore
      scrollRef.current.scrollTop();
    }
  }

  const onScrollBottom = () => {
    if (scrollRef?.current) {
      //@ts-ignore
      scrollRef.current.scrollBottom();
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 30 }}>
      <button onClick={onScrollTop}>Scroll to Top</button>
      {/*@ts-ignore*/}
      <Scrollable style={{ width: 500, height: 500 }} ref={scrollRef}>
        <div style={{ width: '100%', height: 2000, backgroundColor: 'grey' }}></div>
      </Scrollable>
      <button onClick={onScrollBottom}>Scroll to Bottom</button>
    </div>
  )
}
export default Scrolley;