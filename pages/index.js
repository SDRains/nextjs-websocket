import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

const Home = () => {
    const [input, setInput] = useState('') // Add value inside '' to provide a default value
    const [secondInput, setSecondInput] = useState('')

    useEffect(() => { socketInitializer().then(r => [])});

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()

        socket.on('connect', () => {
          console.log('connected')
        })

        socket.on('update-input', msg => {
          setInput(msg)
        })

        socket.on('update-input2', msg => {
            setSecondInput(msg)
        })
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value)
        socket.emit('input-change', e.target.value)
    }

    const onSecondChangeHandler = (e) => {
        setSecondInput(e.target.value)
        socket.emit('input2-change', e.target.value)
    }

    return (
        <div className="w-full mt-5 pl-5 pr-5">
            <input
                type="text"
                name="firstInput"
                autoComplete="name"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                placeholder="First Input"
                value={input}
                onChange={onChangeHandler}
            />

            <input
                type="text"
                name="secondInput"
                autoComplete="name"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md mt-4"
                placeholder="Second Input"
                value={secondInput}
                onChange={onSecondChangeHandler}
            />

            <div className="w-52 mt-4">
                <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    value={secondInput}
                    onClick={onChangeHandler}
                >
                    Click Me!
                </button>
            </div>

            <p>Message below:</p>
            <p>{input}</p>
        </div>
    )
}

export default Home;