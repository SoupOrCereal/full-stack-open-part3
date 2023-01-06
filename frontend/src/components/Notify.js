const Notify = ({ message, isError = true }) => {
    if(!message || message == ''){
        return(<></>)
    }
    return (
      <div className={isError? 'error' : 'success'}>
        {message}
      </div>
    )
  }

  export default Notify