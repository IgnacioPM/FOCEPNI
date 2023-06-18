import React from "react";
class Footer extends React.Component {
  render() {
    return(
      <div>

           <footer className="text-center text-lg-start bg-light text-muted">
          
            <div className="text-center p-4" style={{"backgroundColor" : "rgba(0, 0, 0, 0.05)"}}>
                © 2021 Copyright:
                <a className="text-reset fw-bold" target="_blank" href="https://www.Nicoya.go.cr/">Municipalidad de
                    Nicoya</a>
            </div>
            
        </footer>
       
      </div>
    );
  }
}
export default Footer;