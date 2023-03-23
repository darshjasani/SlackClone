import React, { useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import db from './firebase.js';
import { useState } from 'react';
const Chat = ()=>{
    const {roomID} = useParams();
    const [roomDetails,setRoomDetails] = useState(null);
    const [roomMessages,setRoomMessages] = useState(null)
    useEffect(()=>{
        if(roomID){
            db.collection('rooms').doc(roomID)
            .onSnapshot(snapshot => (
                setRoomDetails(snapshot.data())
            ))
        }

        db.collection('room')
        .doc(roomID)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(
            (snapshot) => setRoomMessages(
                snapshot.docs.map(doc => doc.data())
            )
        );
    },[roomID]);
    return (
        <div className='chat'>
            <div className='chat_header'>
                <div className='chat_headerLeft'>
                    <h4 className='chat_channelName'>
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderIcon/>
                    </h4>
                </div>
                <div className='chat_headerRight'>
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Chat;