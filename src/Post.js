import React,{useState,useEffect} from 'react';
import './post.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from './Firebase'
import firebase from 'firebase';


const Post = ({postId,username,caption,imageUrl,user}) => {

const [comments, setcomments] = useState([]);
const [comment, setcomment] = useState('');

// useEffect(() => {
    
//    if(postId){
//         db
//        .collection("posts")
//        .doc(postId)
//        .collection("comments")
//        .orderBy('timestamp','desc')
//        .onSnapshot((snapshot)=>{
//            setcomments(snapshot.docs.map((doc)=>doc.data()));
//        });
//    }
   

// }, [postId]);
useEffect(() => {
    
    
    if(postId){
        
         db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot)=>{
            setcomments(snapshot.docs.map((doc)=>doc.data()))
        })  
    }
    
}, [postId]);

const postComment =(e)=>{
e.preventDefault();
db.collection("posts").doc(postId).collection("comments").add({
    text:comment,
    username:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),


});
setcomment('');
    
}
    return (
        <div className="post">
            <div className="post_header">
            <Avatar className="post_avatar"
            alt="Ajith madhan"
            src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            </div>
            <img src={imageUrl} alt="" className="post_image"/>
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
                <div className="post_comments">
               
                {
                comments.map((comment)=>(
                    <p className="sin_com">
                        <strong>{comment.username} </strong>{comment.text} 
                    </p>
                ))
            }
          
                </div>
          {
              user?
              (  <form className="cmt_box">
              <input 
              type="text"
              className="post_input"
              placeholder="Add a Comment"
              value={comment}
              onChange={(e)=>setcomment(e.target.value)}
              />
              <button
              disabled={!comment}
              type="submit"
              className="btn_comment"
              onClick={postComment}
              >
                  Post
              </button>
          </form>):
          (<p className="sec_para">Please login to add comment...</p>)
          }
        </div>
    );
}

export default Post;
