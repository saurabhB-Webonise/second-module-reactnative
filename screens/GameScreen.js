import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons'
import Color from '../constants/color'

const generateRandomNumberBetween = (min, max, exclude) => {

    min = Math.ceil(min);
    max = Math.max(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    if (randNum === exclude) {
        return generateRandomNumberBetween(min, max, exclude);
    } else {
        return randNum;
    }
};

const GameScreen = props => {

    const initialGuess = generateRandomNumberBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)


    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    });

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, props.userChoice, props.onGameOver])


    const nextGuesshandler = direction => {
        if (direction === 'lower' && currentGuess <= props.userChoice ||
            direction === 'greater' && currentGuess >= props.userChoice) {
            Alert.alert('Don\'t lie', 'You know that this wrong...', [{ text: 'Sorry', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNum = generateRandomNumberBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNum);
        setPastGuesses(curPastGuess => [nextNum.toString(), ...curPastGuess])
    };

    if (availableDeviceHeight < 500) {

        return (<View style={styles.screen}>

            <Text>Opponent's Guess</Text>

            <Card style={styles.card1}>

                <View style={styles.buttonContainer1}>

                    <Button title="LOWER" onPress={nextGuesshandler.bind(this, 'lower')} />
                    <NumberContainer >{currentGuess}</NumberContainer>
                    <Button title="GREATER" onPress={nextGuesshandler.bind(this, 'greater')} />

                </View>

            </Card>

            <Text>Past Guess</Text>

            <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={itemData => (
                <View style={styles.listRow} >
                    <Text>#{(pastGuesses.length) - itemData.index}  :  {itemData.item}</Text>
                </View>)
            } />
        </View>);
    }

    return <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <Card style={styles.card}>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuesshandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuesshandler.bind(this, 'greater')} />
            </View>
        </Card>
        <Text>Past Guess</Text>


        <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={itemData => (
            <View style={styles.listRow} >
                <Text>#{(pastGuesses.length) - itemData.index}  :  {itemData.item}</Text>
            </View>)
        } />
      </View>

};

const styles = StyleSheet.create({

    screen: {
        height: '100%',
        padding: 10,
        alignItems: 'center',
    },
    card: {
        marginTop: 20,
        width: 200,
        maxWidth: '80%',
        marginTop: 10,
        alignItems: 'center',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 10
    },
    listRow: {

        borderColor: Color.accent,
        padding: 10,
        borderWidth: 0.6,
        marginTop: 10,
        borderRadius: 5,
    },
    card1: {
        marginTop: 10,
        width: 300,
        maxWidth: '80%',
        marginTop: 10,
        alignItems: 'center',
        padding:20,
    },
    buttonContainer1: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 10
    },
  
});



export default GameScreen;
