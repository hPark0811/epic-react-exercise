//@ts-nocheck TODO: Remove this later
import React, { createContext, useContext } from 'react';

/* Accordion Subcomponents */

const AccordionItemContext = createContext({ toggleItem: undefined, isOpen: false });


const AccordItem = ({ Component, toggleItem, isOpen, children, ...otherProps }) => {
  Component = Component || "div";

  return (
    <AccordionItemContext.Provider value={{ toggleItem, isOpen }}>
      <Component {...otherProps}> {children} </Component>
    </AccordionItemContext.Provider>
  )
}

const AccordPanel = ({ Component, children, ...otherProps }) => {
  Component = Component || 'div';
  const { isOpen } = useContext(AccordionItemContext);

  return (
    isOpen && <Component {...otherProps}>{children}</Component>
  )
}

const AccordBtnOpen = props => {
  const { isOpen } = useContext(AccordionItemContext)
  return isOpen ? null : <AccordBtn {...props} />
}

const AccordBtnClose = props => {
  const { isOpen } = useContext(AccordionItemContext)
  return isOpen ? <AccordBtn {...props} /> : null
}

const AccordBtn = ({ Component, ...otherProps }) => {
  Component = Component || "button"
  const { toggleItem } = useContext(AccordionItemContext)
  return <Component onClick={toggleItem} {...otherProps} />
}

/* Top level Accord component */

const Accord = ({ Component, children, ...otherProps }) => {
  const [openIndices, setOpenIndices] = React.useState([]);

  const updateAccord = ndx => {
    setOpenIndices(
      openIndices.includes(ndx)
        ? openIndices.filter((index) => index === ndx)
        : [...openIndices, ndx]
    )
  }

  return React.Children.map(
    children,
    (child, ndx) => {
      if (child.type !== AccordItem) {
        throw new Error(
          "Only AccordItem component is allowed here"
        )
      }

      return React.cloneElement(
        child,
        {
          ndx,
          toggleItem: updateAccord.bind(null, ndx),
          isOpen: openIndices.includes(ndx)
        }
      )
    }
  )
}

const AccordPage = () => {
  const TOWERS = [
    {name: 'A'},
    {name: 'B'},
    {name: 'C'}
  ]

  return (
    <Accord>
        {TOWERS.map(tower => (
            <AccordItem key={tower.name}>
                <div>
                    <AccordBtnOpen>{tower.name} (click to open) </AccordBtnOpen>
                    <AccordBtnClose>{tower.name} (click to close)</AccordBtnClose>
                </div>
                <AccordPanel>
                    <pre>{JSON.stringify(tower, null, 2)}</pre>
                </AccordPanel>
            </AccordItem>
        ))}
    </Accord>
)
}

export default AccordPage;