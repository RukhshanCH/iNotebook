import './Myapp.css'

const Loader = (props) => {
  return (
    <>
        <div id="preloader" className={`${props.Theme ? 'preloader2' : 'preloader'}`}>
            <div id="status">
                <div className={`${props.Theme ? 'spinner2' : 'spinner'}`}>Loading...</div>
            </div>
        </div>
    </>
  )
}

export default Loader
