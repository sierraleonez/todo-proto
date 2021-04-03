import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function addTodo({
  input,
  setInput,
  desc,
  setDesc,
  date,
  setDate,
  todoMaster,
  buatNotif,
  slideDown,
}) {
  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          marginTop: 24,
          height: hp('55%'),
          width: screenWidth,
        }}>
        <View style={{flexDirection: 'row', marginHorizontal: 32}}>
          <TouchableOpacity
            style={{alignItems: 'flex-start', flex: 1}}
            onPress={slideDown}>
            <Icon name="clear" size={24} color="#FD6969" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              flex: 1,
              fontSize: 18,
              marginBottom: 12,
              color: '#404852',
            }}>
            Create Task
          </Text>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'flex-end'}}
            onPress={() => {
              input == ''
                ? alert('Task Cannot Be Empty')
                : todoMaster(input, desc);
              buatNotif(input, desc, date);
            }}>
            <Icon name="save" size={24} color="#634DA2" />
          </TouchableOpacity>
        </View>
        <TextInput
          value={input}
          onChangeText={(inp) => {
            setInput(inp);
          }}
          placeholder="Tell Us What You Wanna Do..."
          style={{
            borderColor: '#634DA2',
            borderBottomWidth: 1,
            width: screenWidth - 72,
            paddingBottom: 2,
            height: 42,
          }}
        />
        <TextInput
          value={desc}
          onChangeText={(dsc) => {
            setDesc(dsc);
          }}
          placeholder="Description of your task goes here..."
          style={{
            marginTop: 16,
            borderColor: '#634DA2',
            borderBottomWidth: 1,
            width: screenWidth - 72,
            height: 42,
            paddingBottom: 2,
          }}
        />
        <View style={{alignItems: 'center', marginVertical: 16}}>
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              fontSize: 14,
              marginBottom: 4,
              color: '#404852',
            }}>
            When did it start?
          </Text>
          <DatePicker
            minimumDate={new Date()}
            date={date}
            onDateChange={(data) => {
              setDate(data);
            }}
            mode="time"
          />
        </View>
      </View>
    </ScrollView>
  );
}
