import React from "react"
import Header from "./Header"

class Main extends React.Component {
  render(){
    return (
    
      <React.Fragment>
      
        <main>{this.props.children}</main>
        
      </React.Fragment>
    )
  }
}
export default Main;