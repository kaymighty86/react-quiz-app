import { useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";

const CountdownBar = forwardRef(function CountdownBar ({time, onFinish}, ref){

    const [currentTime, updateCurrentTime] = useState(time);
    const timerRef = useRef();
    let logCount = 0;

    function startTimer(time){
        updateCurrentTime(time);

        //assign the setInterval() execution to the created ref
        timerRef.current = setInterval(()=>{
            updateCurrentTime(prevTime => {
                const updatedTime = prevTime - 10;

                if(updatedTime <= 0){
                    logCount += 1;
                    console.log("timer finished!"+ logCount);
                    // onFinish();
                    clearInterval(timerRef.current);
                    // setTimeout(onFinish,100);
                }

                return updatedTime;
            });

            
        }, 10);
    }

    useEffect(()=>{
        startTimer(time);

        //if for some reason the countdown time is changed, it will trigger use effect to re-execute so we want to clean up somethings before it does that
        return ()=>{
            clearInterval(timerRef.current);
        }
    }, [time]);


    useImperativeHandle(ref, ()=>{
        return {
            stop(){
                if(timerRef.current != undefined){
                    clearInterval(timerRef.current);
                }
            },
            start(time){
                //ensure that the setInterval() is not running
                if(timerRef.current != undefined){
                    clearInterval(timerRef.current);
                }
                //start the timer again
                startTimer(time);
            }
        }
    })

    return <progress value={currentTime} max={time}></progress>
})

export default CountdownBar;