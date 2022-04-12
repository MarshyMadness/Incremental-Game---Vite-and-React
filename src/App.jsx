import { useState, useEffect ,useRef} from 'react'
import React from 'react'
import logo from './logo.svg'
import './App.css'
import {Gather} from "./maindata.js"
import {Time, FixBorder} from "./maindata.js"
import * as Buttons from "./Buttons.jsx"
import useKeypress from './hooks/useKeypress'
import ResourceTable from "./ResourceTable"
import { useSetState } from '@mantine/hooks'
import {TimerApp, MyTimer} from "./Timer.jsx"
import FoodPerClickUpgrade from "./buttons/foodPerClickUpgrade.jsx"

window.addEventListener('load', (event) => {
  FixBorder();

});

const LOCAL_STORAGE_KEY="IncrementalGame.game"

export function App() {
 var [count, setCount] = useState(0);
 var [foodcount, setfoodCount] = useState(0);

 var [gameData, setGameData] = useState(0);


 const food = localStorage.getItem(gameData["foodAmount"]);
 const prevCountRef = useRef();

 useEffect(() => {
	const storedGameData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	if (storedGameData) setGameData(storedGameData)
	if (storedGameData == false){
		setGameData((gameData) = ({
			GameVersion: "v0.0.6",
			foodAmount: 0,
			foodPerClick: 25,
			foodPerClickCost: 25,
			foodPerClickUpgradeNum: 0,
			wood: 0,
			woodPerClick: 25,
			woodPerClickCost: 25,
			copper: 0,
			copperPerClick: 1,
			copperPerClickCost: 25,
			copperPerClickUpgradeNum: 0,
			bronze: 0,
			bronzePerClick: 1,
			bronzePerClickUpgradeNum: 0,
			TotalTime: 0,
			TotalTimeString: 0
		}))
	}

}, [])

var x = 0;




	useEffect(() => {   
		
		let interval= setInterval(() => {
		

			var prevfoodamount = gameData.foodAmount;
			setGameData(prevData => ({ ...prevData, foodAmount: prevData.foodAmount + x}))
		

			return () => { clearInterval(interval); };

   }, 1000)
	}, [])


    


    useKeypress('Escape', () => {
    	Buttons.CloseButton();
    });

	
	
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameData))
	}, [gameData])


/*
  const useMyFirstCustomHook = () => {
    const [foodCount, setfoodCount] = useState(0);
    // do some stuff
    //return { foodCount, setFoodCount };
    setFoodCount(prevFoodCount => prevFoodCount +1);
  };
*/


  return (
<>
    <div className="App">
    <div id="TopOfPageContainer">
    	<div id="header">
    		<p className="Version"> </p>
    		<p id="gameVersion"> Game Version: {gameData.GameVersion} </p>
    		<div id="TimeStateButtonContainer">

    		<button className="TimeStateButton" id="start"> Play </button>
    		<button className="TimeStateButton" id="pause"> Pause </button>
    		<button id="MenuIcon" className="fa-solid fa-bars"></button>
    		</div>
    	</div>

    	<div className="tabHolder">
    		<div className="tab">
    			<button className="tablinks" onClick={Buttons.GatherButton} id="GatherButton">Gather</button>
    			<button className="tablinks" onClick={Buttons.BuildingsButton} id="BuildingsButton">Buildings</button>
    			<button className="tablinks Hidden" id="PeopleButton" >People</button>
    			<button className="tablinks Hidden" id="ResearchButton">Research</button>
    			<button className="tablinks Hidden" id="ReligionButton">Religion</button>
    			<div id="TestButtonContainer"></div>
    		</div>
    	</div>

    </div>

      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome To My First Game</p>

          <button id="Button" type="button" onClick={() => setCount((count) => count + 1)}>
            Forced Resource Refresh: {count}
          </button>




      </header>

	  

      <div id="footer">

      <div className="FooterContainer">
          <div className="QuickOptionButtons">
            <button onClick={Buttons.SaveButton} id ="SaveButton" className="OptionsQuick">Save</button>
            <button onClick={Buttons.LoadButton} id ="LoadButton" className="OptionsQuick">Load</button>
            <button onClick={Buttons.ClearSaveButton} id ="ClearSaveButton" className="OptionsQuick">Clear Save</button>
            <span className="GameStats" id="Time">Current Playtime: {gameData.TotalTimeString} seconds</span> <br></br>
    				<span className="GameStats" id="TimeElapsedTotal"> Total Elapsed Time: </span>
          </div>
          <div id="Development">
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
          </div>
        </div>
        </div>
      </div>


	<ResourceTable gameData={gameData}/>
	<FoodPerClickUpgrade gameData={gameData}/>
</>
  )

}
