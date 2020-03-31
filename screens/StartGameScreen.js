import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Alert
} from 'react-native';
import Card from '../components/Card';
import Color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [finalValue, setFinalValue] = useState()

    const numberInputHandeler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetButtonHandller = () => {
        setConfirm(false)
        setEnteredValue('')
    }

    const confirmButtonHandller = () => {
        const chossedNumber = parseInt(enteredValue)
        if (isNaN(chossedNumber) || chossedNumber <= 0) {
            Alert.alert('Invalid Number!', 'Number has to be between 1 to 100.',
                [{ text: 'Okay', style: 'destructive', onPress: resetButtonHandller }])
            return;
        }
        setConfirm(true)
        setFinalValue(chossedNumber)
        setEnteredValue('')
        Keyboard.dismiss();
    };



    let confirmedOutput;

    if (confirm) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>{finalValue}</NumberContainer>
            <Button title="Start Game" onPress={() => props.onStartGame(finalValue)} />
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.rootscreen}>
                <Text style={styles.title}>Start a Game</Text>
                <Card style={styles.inputContainer}>
                    <Text >Select a Number</Text>
                    <Input style={styles.input}
                        keyboardType="numeric"
                        maxLength={2}
                        value={enteredValue}
                        onChangeText={numberInputHandeler} />
                    <View style={styles.buttonContainer}>
                        {/* <View style={styles.button}> <Button title="Reset" color={Color.primary} onPress={resetButtonHandller} /></View>
                        <View style={styles.button}><Button title="Confirm" color={Color.accent} onPress={confirmButtonHandller} /></View> */}
                        <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'white', borderBottomLeftRadius: 10, height: 40, width: '50%', backgroundColor: Color.accent }} onPress={resetButtonHandller}>Reset</Text>
                        <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'white', borderBottomRightRadius: 10, height: 40, width: '50%', backgroundColor: Color.primary }} onPress={confirmButtonHandller}>Confirm</Text>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
};

// hello world the at

const styles = StyleSheet.create({

    rootscreen: {
        padding: 10,
        alignItems: 'center',
        height: '100%'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        paddingTop: 10,
        width: 350,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
       
    },
    button: {
        width: 100,
    },
    input: {
        width: 100,
        textAlign: "center",
        marginBottom: 20,
    },
    summaryContainer: {
        padding: 20,
        marginTop: 20,
        elevation: 2,
        alignItems: 'center'
    }
});

export default StartGameScreen;