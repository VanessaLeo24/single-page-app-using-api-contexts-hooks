import React from 'react';
import {Routes, Route} from "react-router-dom";
import Navigation from './components/Navigation';
import HomePageWrapper from './pages/HomePage';
import AddPage from './pages/AddPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/api';
import ArchivePageWrapper from './pages/ArchivePage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Link } from "react-router-dom";
import ToggleTheme from './components/ToggleTheme';
import { LocaleProvider } from './contexts/LocaleContext';
import LocaleTheme from './components/LocaleTheme';


class App extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        authedUser : null,
        initializing: true,
        themeContext : {
          theme: localStorage.getItem('theme') || 'dark',
          toggleTheme: () => {
            this.setState((prevState) => {
              const newTheme = prevState.themeContext.theme === "dark" ? "light" : "dark";
              localStorage.setItem('theme', newTheme);

              return {
                themeContext : {
                  ...prevState.themeContext,
                  theme: newTheme
                }
              }
            })
          }
        },

        localeContext : {
          locale: localStorage.getItem('locale') || 'id',
          toggleLocale: () => {
            this.setState((prevState) => {
              const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
              localStorage.setItem('locale', newLocale);

              return {
                localeContext: {
                  ...prevState.localeContext,
                 locale: newLocale
                }
              }
            })
          }
        }
      }

      this.onLoginSuccess = this.onLoginSuccess.bind(this);
      this.onLogout = this.onLogout.bind(this);
    }

    async onLoginSuccess({ accessToken }){
      putAccessToken(accessToken);
      const { data } = await getUserLogged();

      this.setState(() => {
        return {
          authedUser: data
        }
      })
    }

    onLogout(){
      this.setState(() => {
        return {
          authedUser: null
        }
      });

      putAccessToken('');
    }

    async componentDidMount(){
      const { data } = await getUserLogged();

      this.setState(() => {
        return {
          authedUser: data,
          initializing: false
        }
      })
    }

    componentDidUpdate(prevState) {
      if(prevState.theme !== this.state.themeContext.theme){
        document.documentElement.setAttribute('data-theme', this.state.themeContext.theme)
      }
    }

    render(){
      if(this.state.initializing){
        return null;
      }

      if(this.state.authedUser === null){
        return (

          <LocaleProvider value={this.state.localeContext}>
            <ThemeProvider value={this.state.themeContext}>
              <div className="app-container"> 
                <header> 
                  <h1><Link to="/">{this.state.localeContext.locale === 'id' ?'Aplikasi Catatan' : 'Notes App'}</Link></h1>
                  <nav className='navigation'>
                    <ul>
                      <li><ToggleTheme /></li>
                      <li><LocaleTheme /></li>
                    </ul>
                  </nav>
                </header> 
                      
                <main>
                  <Routes>
                    <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </LocaleProvider>
        )
      }

      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state.themeContext}>
            <div className="app-container">
              <header>
                <h1><Link to="/">{this.state.localeContext.locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>       
                <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
              </header>

              <main>
                <Routes>
                  <Route path='/' element={<HomePageWrapper />} />
                  <Route path='/notes' element={<AddPage />} />
                  <Route path='/notes/:id' element={<DetailPage />} />
                  <Route path='/archives' element={<ArchivePageWrapper />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </LocaleProvider>
        
      )
    }
}

export default App;
