import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';

// Constants
import Colors from '../../constants/Colors';

// Other
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={Icon} iconSize={23} color="white" />
  )
}

export default CustomHeaderButton

const styles = StyleSheet.create({})
