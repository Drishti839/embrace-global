import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
  senderRole?: 'donor' | 'visitor';
  senderId?: string;
}

const MESSAGES_KEY = 'aidconnect-messages';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(MESSAGES_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  const saveMessage = (message: Omit<Message, 'id' | 'createdAt' | 'status'>) => {
    const newMessage: Message = {
      ...message,
      id: `MSG-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    
    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    return newMessage;
  };

  const updateMessageStatus = (id: string, status: Message['status']) => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  };

  const getMessagesForUser = (userId: string) => {
    return messages.filter(m => m.senderId === userId);
  };

  const getAllMessages = () => messages;

  return { messages, saveMessage, updateMessageStatus, getMessagesForUser, getAllMessages };
};
