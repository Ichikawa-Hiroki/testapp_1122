import Slider from "./Slider";
import logo from "./logo.svg";

function Home() {
    return (<>
        <h1>Home</h1>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Slider></Slider>
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
            >
                Learn React
            </a>
        </header>
    </>);
}

export default Home;