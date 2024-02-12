import './App.css';
import Fetch from './components/fetch'

//https://react-bootstrap.netlify.app/docs/components/placeholder/
//import Card from 'react-bootstrap/Card';

// Antons databas
//https://cna-product-service.vercel.app/products/getAllProducts


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Camel Store</h1>
            </header>
            
            <div className="Camel-content">
                <h2>Get yer camels here:</h2>
            </div>

            <Fetch />

        </div>
    )
}

export default App;