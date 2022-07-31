import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;

const Home = () => {
    const [input, setInput] = useState('') // Add value inside '' to provide a default value
    const [secondInput, setSecondInput] = useState('')
    const [iArr, setIArr] = useState([])

    useEffect(() => { socketInitializer().then(r => [])});

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()

        socket.on('update-input', msg => { // This allows for other devices to get new data
            setInput(msg)
        })

        socket.on('update-array', msg => { // Something isn't working here possibly
            setIArr(msg)
        })

        socket.on('update-input2', msg => {
            setSecondInput(msg)
        })
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value)
        const arr = iArr
        arr.push(e.target.value)
        setIArr(arr)
        socket.emit('array-change', arr)
        socket.emit('input-change', e.target.value)
    }

    const onSecondChangeHandler = (e) => {
        setSecondInput(e.target.value)
        socket.emit('input2-change', e.target.value)
    }

    return (
        <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
            <div className="relative max-w-xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500">
                        Message: {input}
                    </p>
                    <p className="mt-4 text-lg leading-6 text-gray-500">
                        Array: {iArr}
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Real-time Results
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="firstInput"
                                autoComplete="name"
                                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                placeholder="First Input"
                                value={input}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Results After Submit
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="secondInput"
                                autoComplete="name"
                                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                placeholder="Second Input"
                                value={secondInput}
                                onChange={onSecondChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            value={secondInput}
                            onClick={onChangeHandler}
                        >
                            Click Me!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;