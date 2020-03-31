import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Card = props => {
return (<View style={{...styles.card,...props.style}}>{props.children}</View>);
};

const styles = StyleSheet.create({
    card: {
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default Card;