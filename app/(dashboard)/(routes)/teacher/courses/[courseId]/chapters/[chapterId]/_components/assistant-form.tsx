"use client"
import {  useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Markdown from 'react-markdown'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import axios from "axios";

// function AssistantForm() {
//   const [loading, setLoading] = useState(false);
//   const [apiData, setApiData] = useState("");
//   const [code, setCode] = useState("");
//   const [gender, setGender] = useState("");
//   const [age, setAge] = useState("");
//   const [country, setCountry] = useState("");
//   const [hobbies, setHobbies] = useState("");
//   const [total, setTotal] = useState("");
//   const [file, setFile] = useState("");
//   const [generatedText, setGeneratedText] = useState('');

  
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyC07GEJ_dLdgjinNvIYk3GERMU7t4vcsi4"
//   );

//   interface MarkdownRendererProps {
//     markdownText: string;
//   }
//   function MarcdownRender ({markdownText}: MarkdownRendererProps) {
//     return <Markdown>{markdownText}</Markdown>
//   }

//   const fetchData = async () => {

    
//     const generationConfig = {
//       // stopSequences: ["red"],
//       maxOutputTokens: 100,
//       // category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       // threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       temperature: 0.9,
//     };

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     const prompt = `Уяви що ти вчитель і тобі потрібно перевірити цей код: ${code} і скажи як він працює, якщо він відповідає усім критеріям і постав йому оцінку від 1 до 10`;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     const { totalTokens } = await model.countTokens(prompt);
    
//     setApiData(text);
//     setLoading(false);
//     console.log(totalTokens,"totalTokens");
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log(code, gender, age , country, hobbies);
//     fetchData();
//   };
//   return (
//     <div className="container">
//       <div className="mt-5 mb-5">
//         <form onSubmit={handleSubmit}>
//           <div className="row d-flex align-items-end">
//             <div className="col-lg-2">
//               <label htmlFor="code" className="form-label">
//                 <b>Input</b>
//               </label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 id="code"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//               />
//             </div>
//             <div className="col-lg-2">
//               <Button type="submit" className="btn btn-primary mt-3 col-lg-12">
//                 Submit
//               </Button>
//             </div>
            
//           </div>
//         </form>
//       </div>
//       <div className="">
//         {!loading && <MarcdownRender markdownText={apiData} />}
//         {loading && <p>Loading...</p>}
//       </div>
//     </div>
//   );
// }
// export default AssistantForm;

// function AssistantForm() {
//   const [generatedText, setGeneratedText] = useState('');

//   const generateText = async () => {
//     try {
//       const response = await axios.post('/generate', {
//         messages: [{role: 'user', content: 'Контекст: є така людина Даня Мазурак. придумай щось прикольне про нього'}]
//       });
//       setGeneratedText(response.data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>CHATGPT</h1>
//       <button onClick={generateText}>Сгенерировать текст</button>
//       <p>{generatedText}</p>
//     </div>
//   );
// }

// export default AssistantForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   // Завантаження повідомлень при завантаженні компонента
//   useEffect(() => {
//     loadMessages();
//   }, []);

//   // Функція для завантаження повідомлень з сервера
//   const loadMessages = async () => {
//     try {
//       const response = await axios.get('/api/messages');
//       setMessages(response.data);
//     } catch (error) {
//       console.error('Error loading messages:', error);
//     }
//   };

//   // Функція для додавання нового повідомлення
//   const addMessage = async () => {
//     try {
//       await axios.post('/api/messages', { content: newMessage });
//       // Після додавання повідомлення оновіть список повідомлень
//       loadMessages();
//       // Очистіть поле введення нового повідомлення
//       setNewMessage('');
//     } catch (error) {
//       console.error('Error adding message:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Chat</h1>
//       {/* Показ повідомлень */}
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message.content}</li>
//         ))}
//       </ul>
//       {/* Вікно введення нового повідомлення */}
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//       />
//       <button onClick={addMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;



// const AssistantForm = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   // useEffect(() => {
//   //   fetchMessages();
//   // }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8080/');
//       setMessages(response.data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const sendMessage = async () => {
//     try {
//       await axios.post('http://127.0.0.1:8080/backend-api/v2/conversation', { message: inputMessage });
//       setInputMessage('');
//       // fetchMessages();
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Chat</h1>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default AssistantForm;

 
 

function AssistantForm() {
  const [userMessage, setUserMessage] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSendMessage = async () => {
    const options = {
      method: 'POST',
      url: 'https://chat-gtp-free.p.rapidapi.com/v1/chat/completions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'dd2b25a7acmsh5c5bbb65b95332dp1bcce0jsn3892aa2992db',
        'X-RapidAPI-Host': 'chat-gtp-free.p.rapidapi.com'
      },
      data: {
        chatId: '92d97036-3e25-442b-9a25-096ab45b0525',
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      }
    };

    try {
      const response = await axios.request(options);
      setResponseText(response.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <div>
        <p>Response: {responseText}</p>
      </div>
    </div>
  );
}

export default AssistantForm;
