import { createSlice } from '@reduxjs/toolkit'

const personaSlice = createSlice({
    name: 'persona',
    initialState: {
        name: '',
        role: '',
        experience: '',
        techStack: '',
        team: '',
        startDate: '',
        isDetected: false,
        confidenceScore: 0,
    },
    reducers: {
        setPersonaField: (state, action) => {
            const { field, value } = action.payload
            state[field] = value
        },
        setPersona: (state, action) => {
            return { ...state, ...action.payload, isDetected: true }
        },
        setConfidenceScore: (state, action) => {
            state.confidenceScore = action.payload
        },
        resetPersona: () => ({
            name: '', role: '', experience: '', techStack: '', team: '',
            startDate: '', isDetected: false, confidenceScore: 0,
        }),
    },
})

export const { setPersonaField, setPersona, setConfidenceScore, resetPersona } = personaSlice.actions
export const selectPersona = (state) => state.persona
export default personaSlice.reducer
