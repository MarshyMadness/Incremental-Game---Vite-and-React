import React from 'react'

export default function FoodPerClickUpgrade( {gameData} ) {
    console.log(gameData);
        if (gameData.foodAmount >= gameData.foodPerClickCost) {
          gameData.wood -= gameData.foodPerClickCost;
          gameData.foodPerClick += 1;
          gameData.foodPerClickUpgradeNum += 1;
          gameData.foodPerClickCost *= 2;
          //document.getElementById("foodPerClickUpgrade").innerHTML = "Upgrade Gathering (Currently Level " + gameData.foodPerClickUpgradeNum + ") Cost: " + gameData.foodPerClickCost + " wood";
        }
  return (
    <div>


    </div>
  )
}
