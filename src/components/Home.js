import Notes from "./Notes"


const Home = (props) => {
  const showalert = props.showalert
  return (
    <div className="container">
      <Notes showalert={showalert} Theme={props.Theme} />
    </div>
  )
}

export default Home
