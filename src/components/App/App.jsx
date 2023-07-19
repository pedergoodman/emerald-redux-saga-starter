import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function App() {
// Sidebar

// Generator functions

// can pause them in the middle while keeping scope intact
// can run multiple times, but will remember where it was...
// paused in the middle once or many times, and resumed later
function* myGenerator() {
  // yield is a "soft return"
  yield 1; 
  yield 'hello';
  yield {name: 'Peder'};
  yield 35;
};

// create an instance of hte function
const myGeneratorInstance = myGenerator();

// execute the generator function and get back whatever was yield
// console.log('first time:', myGeneratorInstance.next().value);
// console.log('second time:', myGeneratorInstance.next().value);
// console.log('third time:', myGeneratorInstance.next().value);
// console.log('fourth time:', myGeneratorInstance.next().value);







  const dispatch = useDispatch();
  const elements = useSelector(store => store.elementList)
  const [newElement, setNewElement] = useState('');



  useEffect(() => {
    dispatch({type: 'FETCH_ELEMENTS'})
  }, []);

  const addElement = () => {
    dispatch({type: 'ADD_ELEMENT', payload: newElement});
    setNewElement('');

    
    // axios.post('/api/element', { 
    //   name: newElement
    // })
    //   .then(() => {
    //     dispatch({type: 'FETCH_ELEMENTS'})
    
    //   })
    //   .catch(error => {
    //     console.log('error with element get request', error);
    //   });

  }


  return (
    <div>
      <h1>Atomic Elements</h1>

      <ul>
        {elements.map(element => (
          <li key={element}>
            {element}
          </li>
        ))}
      </ul>

      <input 
        value={newElement} 
        onChange={evt => setNewElement(evt.target.value)} 
      />
      <button onClick={addElement}>Add Element</button>
    </div>
  );
}


export default App;
