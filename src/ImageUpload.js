import React ,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import {db,storage} from './Firebase';
import firebase from 'firebase';
import './Imageupload.css'


const ImageUpload = (username) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [upbtn, setupbtn] = useState('Upload');


    const handleChange=(e)=>{
        if(e.target.files[0]){
            setFile(e.target.files[0])
        }
    }
    const handleUpload=()=>{
        setupbtn('Uploading')
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress =Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message)
            },
            ()=>{
                storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        imageUrl:url,
                        username:username.username
                    });
                    setProgress(0);
                    setCaption('');
                    setFile(null);
                    setupbtn('uploaded');
                   
                  
                });
            }
        )
    }
   
    return (
        <div className="image_upload">
            
            <progress value={progress} max="100" className="u_progress"/>
            <Input
      type="text"
      placeholder="Your Caption..."
      value={caption}
      onChange={(e)=>setCaption(e.target.value)}
      required
      />  
      <br/> <Input
      type="file"
      accept="image/png, image/jpeg,image/jpg" 
      onChange={handleChange}
    //   required

      /> 
      <br/>
       <Button onClick={handleUpload} variant="contained" color="secondary" >
     {upbtn}
    </Button>
    
        </div>
    );
}


export default ImageUpload;
