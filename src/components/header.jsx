import appLogo from "../assets/quiz-logo.png";

export default function Header(){
    return(
        <header>
            <img src={appLogo} alt="app logo"/>
            <h1>REACT QUIZ</h1>
        </header>
    )
}