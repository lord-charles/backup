import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const HorizontalFoodCard = ({item, icons, onPress}) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between overflow-x-hidden h-[110px]"
      onPress={onPress}>
      <View className="relative top-3 flex-row gap-x-5">
        <Image
          source={{uri: item.image}}
          className="h-[90px] w-[100px] "
          resizeMode="contain"
        />
        {/* price name & description */}
        <View className="justify-center mt-[-25px]">
          <Text className="font-bold text-black text-md">{item.name}</Text>
          <Text className="text-[10px] text-black ">{item.description}</Text>
          <Text className="font-bold text-black text-lg">${item.price}</Text>
        </View>
      </View>

      <View className="flex-row mt-5 absolute  left-[74vw] top-[-15px]">
        <Image
          source={icons.calories}
          className="h-[30px] w-[30px]"
          resizeMode="contain"
        />
        <Text className="text-black top-[1px]  ">{item.calories} calories</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
