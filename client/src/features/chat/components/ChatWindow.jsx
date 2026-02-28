import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectMessages, selectIsTyping } from '../chatSlice.js'
import { selectPersona } from '../../onboarding/personaSlice.js'
import { ChatMessage } from './ChatMessage.jsx'
import { ChatInput } from './ChatInput.jsx'
import { TypingIndicator } from './TypingIndicator.jsx'
import { useAgentChat } from '../chatHooks.js'
import { Sparkles } from 'lucide-react'

export const ChatWindow = () => {
    const messages = useSelector(selectMessages)
    const isTyping = useSelector(selectIsTyping)
    const persona = useSelector(selectPersona)
    const { sendMessage } = useAgentChat()
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '100%',
            background: 'var(--bg-primary)',
        }}>
            {/* Header */}
            <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'var(--bg-primary)',
            }}>
                <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent) 0%, #0f766e 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Sparkles size={16} color="white" />
                </div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        Onboarding Assistant
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                        RAG-powered · Company knowledge base
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 10px' }}>
                {messages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: '50%',
                            background: 'var(--accent-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Sparkles size={22} color="var(--accent)" />
                        </div>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 8, fontSize: '1rem' }}>
                            Welcome, {persona.name || 'Developer'}! 👋
                        </p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: 320, margin: '0 auto' }}>
                            I'm your onboarding assistant. Ask me anything about setup, team processes, or let me know when you've completed a task.
                        </p>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isTyping && <TypingIndicator />}
                </div>
                <div ref={bottomRef} />
            </div>

            <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
    )
}
