import React from 'react'
import Header from '../Books/Nav'
import Home from '../Books/Home'
import CreateMemory from '../Books/CreateBook'
import EditMemory from '../Books/EditBook'
import ReadMemory from '../Books/DetailsBook'
import Profile from '../Books/Profile'
import ProfileEdit from '../Books/EditProfile'
import { BrowserRouter as Router , Route } from 'react-router-dom'


const Books = ({setIslogin}) => {
    return (
      <Router>
          <div className="notes-page" >
             <Header setIslogin= {setIslogin} />
             <section>
                 <Route exact path="/" component={Home} />
                 <Route exact path="/create" component={CreateMemory}  />
                 <Route exact path="/edit/:id" component={EditMemory}  />
                 <Route exact path = "/read/:id" component= {ReadMemory}  />
                 <Route exact path = "/profile" component= {Profile}  />
                 <Route exact path = "/profileEdit" component= {ProfileEdit}  />
             </section>
            
          </div>
      </Router>
    )
}

export default Books
