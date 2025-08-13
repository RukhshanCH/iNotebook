const About = (props) => {
  return (
    
    <div className='container mt-5'><p className={`mb-5 pb-5 ${props.Theme ? 'text-black' : 'text-white'}`}><h2>📓 iNotebook – MERN Stack Note-Taking App with Authentication & CRUD Features</h2><br />
      <div className='px-5 lh-base'>
        <div style={{lineHeight: '25px'}}>iNotebook is a secure, full-stack note-taking web app built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to sign up, log in, and manage personal notes with a clean and responsive interface. All notes are saved in the cloud, enabling easy access from any device with an internet connection.
        </div> <br />

      <h5 className='m-0'><strong>🔑 Key Features:</strong></h5><br />
      ✅ User Authentication with Sign Up / Sign In using JWT<br /><br />

      🔐 Protected routes – only logged-in users can access their notes<br /><br />

      📝 Full CRUD functionality (Create, Read, Update, Delete) for personal notes<br /><br />
      
      ☁️ Secure cloud storage using MongoDB<br /><br />

      📱 Responsive UI built with React and Bootstrap<br /><br />

      🚀 Seamless front-end and back-end integration via RESTful APIs<br /><br />

      ⚙️ Clean code structure, modular components, and reusable functions<br /><br />

      Perfect for showcasing expertise in modern full-stack development, secure authentication, and responsive design.
      </div>

    </p></div>
  );
};

export default About;
