import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Headers'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'

export default function App() {


  const [userNumber, setuserNumber] = useState();
  const [guessRounds, setGuessRound] = useState(0);


  const newGameStart = () => {
    setGuessRound(0);
    setuserNumber(null);
    ;
  }

  const startGameHandler = selectedNumber => {
    setuserNumber(selectedNumber)
  };

  const gameOverHandeler = numOfRounds => {
    setGuessRound(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNumber && guessRounds <= 0) {

    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandeler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundNum={guessRounds} userNumber={userNumber} onRestart={newGameStart} />
  }

  return (
    <View style={styles.screen1}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen1: {
    flex: 1
  },
});
