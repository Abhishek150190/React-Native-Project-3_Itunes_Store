import React from 'react'
import { View, Image, Text, StyleSheet ,Linking, TouchableOpacity } from 'react-native'
import moment from 'moment';



export default (props) => {

    function formatDate(date, format) {
        return moment(date).format(format);
    };

    return (
        <View style={styles.mainContainer}>

            <View style={styles.insideContainer}>

                <View style={styles.imageContainer} >
                    <TouchableOpacity onPress={() => Linking.openURL(props.link)}>
                    <Image source={{ uri: props.image }} style={styles.image} ></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.bodyContainer}>
                    <Text style={{ color: 'white', padding: 5, fontWeight: 'bold', marginLeft: '10%' }}>{props.title.slice(0, 30).concat("...")}</Text>
                    <View style={{ backgroundColor: 'white', width: 100, padding: 1, borderRadius: 5, marginLeft: '12%' }}><Text style={{ color: 'black', padding: 5,}}>Price: {props.price}</Text></View>
                    <Text style={{ color: 'grey', marginLeft: '10%', padding: 5 }}>Released: {formatDate(props.date, "MMM Do YY")}</Text>
                </View>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 20
    },

    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 10,
        backgroundColor: 'black'
    },

    insideContainer: {
        flexDirection: 'row',
        width: '90%',
        height: '100%',
        padding: 10,
        borderRadius: 20,
        shadowColor: 'blue'
    }
})