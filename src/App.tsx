
import Headers from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import'./App.scss';



function App() {
    return (
        <div className='wrapper'>
            <div className='container'>
                <Headers />
                <TodoList/>
                <Footer/>
            </div>

        </div>
    )

}

export default App;