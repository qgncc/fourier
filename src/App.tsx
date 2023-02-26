import './App.css'
import Graph from './components/Graph'

function App() {
  return (
    <div className="App">
      <Graph scale={5} detailLevel={20} width={500} height={500} mathFunction={x=>3*x^3+x^2+x+20}/>
    </div>
  )
}

export default App
