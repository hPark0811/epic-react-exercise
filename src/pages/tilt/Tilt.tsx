import React, { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TileDiv = styled.div`
  width: 500px;
  height: 500px;
  background-color: grey;
`

const Tilt = () => {
  // Using useRef to directly access dom nodes
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef?.current) {
      return;
    }

    const node = divRef.current as any;
    VanillaTilt.init(node, { max: 25, perspective: 150 });
    // Cleaning up event handlers to prevent memory leaks
    return () => node.vanillaTilt.destory();
  }, [])

  return (
    <Container>
      <TileDiv ref={divRef}></TileDiv>
    </Container>
  )
}

export default Tilt;