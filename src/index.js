import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './Store/Store';


const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      //main: '#3F51B5',
      main:'#795548',
    },
    secondary: {
      //main: '#FFC107',
      main:'#F5F5F5'
    },
    warning: {
      main: '#f44336',
    },
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <BrowserRouter>
   
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Provider store={store}>
             <App />
            </Provider>
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
