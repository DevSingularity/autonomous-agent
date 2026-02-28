import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setTyping } from './chatSlice.js'
import { markItemComplete } from '../checklist/checklistSlice.js'
import { selectPersona } from '../onboarding/personaSlice.js'
import { selectChecklist } from '../checklist/checklistSlice.js'
import { MOCK_KNOWLEDGE_RESPONSES } from '../../lib/mockData.js'

const simulateDelay = (ms) => new Promise((res) => setTimeout(res, ms))

const getAgentResponse = (userText, persona, checklist) => {
    const lower = userText.toLowerCase()

    // Checklist completion detection
    const completionKeywords = ['done', 'finished', 'completed', 'set up', 'cloned', 'installed', 'merged', 'read', 'joined']
    if (completionKeywords.some((kw) => lower.includes(kw))) {
        const uncompleted = checklist.filter((i) => !i.completed)
        const matched = uncompleted.find((item) => {
            const taskWords = item.task.toLowerCase().split(' ')
            return taskWords.some((word) => lower.includes(word) && word.length > 3)
        })
        if (matched) {
            return {
                text: `Great work! I've marked **"${matched.task}"** as complete ✓\n\nYou're making solid progress. What are you working on next?`,
                completedTaskId: matched.id,
            }
        }
    }

    // RAG-simulated knowledge responses
    if (lower.includes('set up') || lower.includes('setup') || lower.includes('install') || lower.includes('local')) {
        return { text: MOCK_KNOWLEDGE_RESPONSES.setup }
    }
    if (lower.includes('git') || lower.includes('branch') || lower.includes('pr') || lower.includes('pull request')) {
        return { text: MOCK_KNOWLEDGE_RESPONSES.git }
    }
    if (lower.includes('deploy') || lower.includes('release') || lower.includes('ci') || lower.includes('pipeline')) {
        return { text: MOCK_KNOWLEDGE_RESPONSES.deploy }
    }
    if (lower.includes('security') || lower.includes('secret') || lower.includes('access') || lower.includes('permission')) {
        return { text: MOCK_KNOWLEDGE_RESPONSES.security }
    }
    if (lower.includes('progress') || lower.includes('checklist') || lower.includes('status')) {
        const completed = checklist.filter((i) => i.completed).length
        const total = checklist.length
        const pct = total ? Math.round((completed / total) * 100) : 0
        return {
            text: `You're **${pct}% through** your onboarding (${completed}/${total} tasks done).\n\n${pct < 50 ? "You're off to a good start! Keep going." : pct < 100 ? "You're over halfway there — great momentum!" : "🎉 You've completed your onboarding checklist!"}`,
        }
    }

    return { text: MOCK_KNOWLEDGE_RESPONSES.default }
}

export const useAgentChat = () => {
    const dispatch = useDispatch()
    const persona = useSelector(selectPersona)
    const checklist = useSelector(selectChecklist)

    const sendMessage = async (text) => {
        // Add user message
        dispatch(addMessage({ role: 'user', text }))
        dispatch(setTyping(true))

        // Simulate network delay
        await simulateDelay(800 + Math.random() * 600)

        const response = getAgentResponse(text, persona, checklist)

        if (response.completedTaskId) {
            dispatch(markItemComplete(response.completedTaskId))
        }

        dispatch(setTyping(false))
        dispatch(addMessage({ role: 'agent', text: response.text }))
    }

    return { sendMessage }
}
