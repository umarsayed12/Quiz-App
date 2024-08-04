import React, { useRef, useState } from "react";
import './questions.css';
import { questions } from '../assets/data';
const Questions = () => {
    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(questions[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let Options = [Option1,Option2,Option3,Option4];

    const checkAnswer = (el,answer) => {
        if(lock === false){
            if(question.correctOption === answer){
                el.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{ 
                el.target.classList.add("incorrect");
                setLock(true);
                Options[(question.correctOption)-1].current.classList.add("correct");
            }
        }
    }
    const playagain = ()=>{
        setIndex(0);
        setQuestion(questions[index]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    const next = ()=>{
        if(index === questions.length-1){
            setResult(true);
            return 0;
        }
        if(lock===true){
            setIndex(++index);
            setQuestion(questions[index]);
            setLock(false);
            Options.map((option)=>{
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
                return null;
            })

        }
    }

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr/>
            {result?<>
            <div className="score">
                {
                score>5?<h3 className="good">Congratulations! You Scored : {score*10}</h3> : 
                <h3 className="bad"> 
                    You Scored : {score*10}<br/>
                    You can do better!</h3>
                }
            </div>
            <div className="reset">
                <button onClick={playagain}>Play Again!</button>
            </div>
            </> : 
            <>
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref = {Option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
                <li ref = {Option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.option2}</li>
                <li ref = {Option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
                <li ref = {Option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">{index+1} of {questions.length} questions</div>
            </>} 
        </div>
    )
}

export default Questions