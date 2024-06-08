import './App.css';
import supabase from './config/supabaseClient';
import { useState, useEffect} from 'react'

function App() {
  console.log(supabase)
  const [fetchError, setFetchError] = useState(null)
  const [test, setTest] = useState(null)

  useEffect(() => {
    const fetchTest = async () => {
      const { data, error } = await supabase
        .from('quiz')
        .select()
        //.eq('test', 'test2')

        if(error) {
          setFetchError('Could not fetch the test')
          setTest(null)
          console.log(error)
        }
        if(data) {
          setTest(data)
          setFetchError(null)
          console.log(data)
        }
    }
    fetchTest()
  }, [])
  return (
    <div className="App">
      <table>
        <tr>
          <th>ID</th>
          <th>Pytanie</th>
          <th>Odpowiedź</th>
        </tr>
      {fetchError && (<p>{fetchError}</p>)}
      {test && (<>{test.map(test1 => (
      <tr><td>{test1.id}</td><td>{test1.pytanie}</td><td>{test1.odp}</td></tr>
      ))}
      </>
    )}
    </table>
    </div>
  );
}

export default App;
