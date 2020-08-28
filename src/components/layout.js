import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// styled component
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { normalize } from "styled-normalize"

// components
import Header from './header'
import Cursor from './customCursor'

// context
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';

const GlobalStyle = createGlobalStyle`
${normalize}
* {
  text-decoration: none;
  ${'' /* cursor: none; */}
}
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  
  
}
body {
  font-size: 16px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: ${props => props.theme.background};
  overscroll-behavior: none;
  overflow-x: hidden;
}
`
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

const darkTheme = {
  background: '#000',
  text: '#fff',
}

const lightTheme = {
  background: '#fff',
  text: '#000',
}

const {currentTheme, cursorStyles} = useGlobalStateContext()
const dispatch = useGlobalDispatchContext()

const onCursor = cursorType => {
  cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
  dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
}

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme }>
    <GlobalStyle />
    <Cursor />
    <Header onCursor={onCursor} />
    <main>{children}</main>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout