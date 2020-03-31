import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, Dimensions } from 'react-native';


const GameOverScreen = props => {
    return <ScrollView  >
        <View style={styles.screen} >
            <Text style={{ fontSize: 40, fontStyle: 'italic' }} >Game over !</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode="cover" source={require('../assets/sss.jpg')} />
            </View>
            <Text style={{ fontSize: 25 }}>Number was :{props.userNumber}</Text>
            <Text style={{ fontSize: 15, marginBottom: 20 }}>Number of Rounds : {props.roundNum}</Text>
            <Button title="New Game" onPress={props.onRestart} />
        </View>
    </ScrollView>
};

const styles = StyleSheet.create({

    screen: {
        alignItems: 'center',
        height: '100%',
        paddingVertical:10,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        backgroundColor: 'grey',
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        overflow: 'hidden',
        marginTop: 50,
        borderWidth: 0.7,
        borderColor: 'orange',
        marginBottom: 20,
        elevation: 8,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;
