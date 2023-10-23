import '../sass/Button.scss'


const Button = ({icon, handleClick}) => {
  return (
    <div className='button__box'>
        <button 
            className="button" 
            onClick={handleClick}>{icon}
        </button>
        <div className='button_shadow'></div>
    </div>
    
  )
}

export {Button}