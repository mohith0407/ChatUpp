'use client';

import { useState } from 'react';
import { useSocket } from './context/SocketProvider';
import styles from './page.module.css'; // Adjust path as needed

export default function Page() {
  const {sendMessage}=useSocket();
  const [message,setMessage]=useState('');
  return (
    <div className={styles.chatContainer}>
      <div className={styles.messages}>
        <div className={`${styles.message} ${styles.sent}`}>Hi!</div>
        <div className={`${styles.message} ${styles.received}`}>Hello!</div>
      </div>
      <div className={styles.inputContainer}>
        <input
          onChange={e=>setMessage(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className={styles.inputField}
        />
        <button onClick={(e)=>sendMessage(message)} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}
