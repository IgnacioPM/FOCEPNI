import React, {useState} from 'react'

 const pagNews = ({pagina, setPagina, maximo}) => {
    const [input, setInput] = useState (1);

    const nextPage = () => {
      setInput (parseInt(input) + 1);
      setPagina (parseInt(pagina) + 1);
    };
  
    const previousPage = () => {
      setInput (parseInt(input) - 1);
      setPagina (parseInt(pagina) - 1);
    };
  
    const onKeyDown = e => {
      if (e.keyCode == 13) {
        setPagina (parseInt (e.target.value));
        if (
          parseInt (e.target.value < 1) ||
          parseInt (e.target.value) > Math.ceil (maximo) ||
          isNaN (parseInt (e.target.value))
        ) {
          setPagina (1);
          setInput (1);
        } else {
          setPagina (parseInt (e.target.value));
        }
      }
    };
  
    const onChange = e => {
        setInput (e.target.value);
         
    };

  return (
    <nav className="mt-5 mb-5">
        <ul className="pagination justify-content-center mt-0" style={{height:"50px"}}>
          
            <li className="page-item">
                <button className='page-link text-dark border-0'   onClick={previousPage} style={{backgroundColor : "#EEEEEE"}}
                disabled={pagina === 1 || pagina < 1}><i className="row-hover bi bi-arrow-left"></i></button>
            </li>

            <li className='page-item '>
                <input readOnly type="text" className='form-control text-center text-dark fw-bold border-0' style={{backgroundColor : "#EEEEEE"}}  value={`Página ${pagina} de ${Math.round(maximo)}`}/>
            </li>

            <li className="page-item mb-5">
                <button className='page-link text-dark border-0'   onClick={nextPage} style={{backgroundColor : "#EEEEEE"}}
                disabled={pagina === Math.ceil (maximo) || pagina > Math.ceil (maximo)}><i className="row-hover bi bi-arrow-right"></i></button>
            </li>
           </ul>
     </nav>

  )
}

export default pagNews