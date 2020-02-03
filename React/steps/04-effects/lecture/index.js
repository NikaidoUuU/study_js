import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import api from 'VanillaCoding/api'

function CustomHeader() {
  const query = '(min-width: 800px)'
  const initialScreenState = window.matchMedia(query).matches
  const [isWide, setIsWide] = useState(initialScreenState)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    console.log('running media side effect')

    const media = window.matchMedia(query)
    const listener = () => {
      setIsWide(media.matches)
    }

    media.addListener(listener)

    return function () {
      console.log('clean up')
      media.removeListener(listener)
    }
  }, [/* isWide */])

  useEffect(() => {
    console.log('running api side effect')

    api.getCourses().then((data) => {
      setCourses(data)
    })
  }, [])

  return (
    <header>
      <h1>Custom Header</h1>

      { isWide &&
        <ul>
          {
            courses.map(course => (
              <li key={course.id}>{course.full_name}</li>
            ))
          }
        </ul>
      }
      { !isWide &&
        <p>Too Small Screen</p>
      }
    </header>
  )
}

function App () {
  const [shouldShowHeader, setShouldShowHeader] = useState(true)

  return (
    <div>
      {
        shouldShowHeader &&
        <CustomHeader />
      }
      <button
        onClick={() => setShouldShowHeader(!shouldShowHeader)}
        style={{ marginTop: '30px', width: '150px', height: '30px', backgroundColor: 'green', color: 'white' }}
      >Show Header
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
