import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Card from '../components/Card'
import Color from '../constants/color'



const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>
                {props.children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        borderColor: Color.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center'
    },
    number: {
        color: Color.primary,
        fontSize: 20,
        textAlign: 'center'
    },

});


export default NumberContainer;