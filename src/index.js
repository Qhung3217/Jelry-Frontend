import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import './index.css'
import App from './App'
import GlobalStyle from './Components/GlobalStyle'
import reportWebVitals from './reportWebVitals'
import { Provider } from './Components/GlobalVariable'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Provider>
          <GlobalStyle>
            <App />
          </GlobalStyle>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
