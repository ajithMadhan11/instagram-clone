import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './Firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
   
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 5),
    
  },
}));


function App() {
 const classes = useStyles();
 const [modalStyle] = React.useState(getModalStyle);
 const [posts, setPosts] = useState([]);
 const [open, setOpen] = useState(false);
 const [openS, setOpenS] = useState(false);
 const [openP, setOpenP] = useState(false);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [email, setEmail] = useState('');
 const [user, setUser] = useState('');



//  auth helper
useEffect(() => {
 const unsubscribe=auth.onAuthStateChanged((authUser)=>{
   if(authUser){
    setUser(authUser);
   }
 })
console.log(username);
 return ()=>{
  unsubscribe();
 }
}, [user,username]);

// pull post
useEffect(() => {
  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
    setPosts(snapshot.docs.map(doc =>({
      id:doc.id,
      post:doc.data()
    })))
  })
}, []);

// signup user
const signup=(e)=>{
  e.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
  if(authUser){
    authUser.user.updateProfile({
      displayName:username,
    }).then(()=>{
      console.log("updated name");
    })
    .catch((error)=>{
      console.log(error.message);
    })
  }
  })
  .catch((error)=>alert(error.message))
  setOpen(false);
}

// signin user
const signin=(e)=>{
  e.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  
  
  .catch((error)=>alert(error.message))
  setOpenS(false);
}

const signout=()=>{
  auth.signOut();
  window.location.reload(false);
}

  return (
    <div className="App">
     
     
      
       <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
      <center>
      <div className="app_header1">
       <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app_headerImage"/>
     </div>
     <form className="App_signup">
     <Input 
      type="text" 
      placeholder="Enter username"
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      /> 
      <Input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      /> 
     
      <Input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <br/>
         <Button type="submit" onClick={signup} variant="contained" color="primary" >
      Sign UP
    </Button>
     </form>
     
      </center>
      </div>
      </Modal>
      <Modal
        open={openS}
        onClose={()=>setOpenS(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
      <center>
      <div className="app_header1">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app_headerImage"/>
     </div>
     <form className="App_signup">
      <Input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      /> 
     
      <Input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <br/>
         <Button type="submit" onClick={signin} variant="contained" color="primary" >
      SignIn
    </Button>
     </form>
     
      </center>
      </div>
      </Modal>
      <Modal
        open={openP}
        onClose={()=>setOpenP(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="app_header2">
       <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app_headerImage"/>
       {user.displayName?
      (<ImageUpload username= {user.displayName} />)
       :
       (<h3>Sorry you need to login !!</h3>) 
      
       }
     </div>
   
      </Modal>
     <div className="app_header">
       <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app_headerImage"/>
     
      {
      user ?
     ( 
     <div className="auth_container">
         <Button className="signout_bt"onClick={()=>setOpenP(true)}  variant="contained" color="secondary" >
    Upload
  </Button>
  <Button className="upload_btn" onClick={signout}>
    Logout
  </Button> 

     </div>

   
):
  (
    <div className="auth_container">
  <Button className="signin_btn" onClick={()=>setOpenS(true)}  >
   Sign In
 </Button>

 <Button className="signup_btn" onClick={()=>setOpen(true)}  >
   Sign Up
 </Button>
    </div>
  ) 
      }
     </div>
     
      <div className="app_posts">
   {
        posts.map(({id,post}) => (
          <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} user={user}/>
        ))
    }
   </div>
      
  
    
  
    </div>
  );
}

export default App;
