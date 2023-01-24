import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

const VerticalFoodCard = ({icons, item, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      {/* top */}
      <View className="flex-row justify-between mt-2">
        <View className="flex-row">
          <Image source={icons.calories} className="w-[50px] h-[50px] " />
          <Text className="relative top-2.5 text-black">
            {item.calories} Calories
          </Text>
        </View>
        <Image
          source={icons.love}
          className="w-[30px] h-[30px] relative top-1 mr-3"
          style={{
            tintColor: item.isFavourite ? 'red' : 'gray',
          }}
        />
      </View>
      {/* middle */}
      <View className="items-center mb-[25px]">
        <Image
          source={{uri: item.image}}
          className="w-[180px] h-[110px]"
          resizeMode="contain"
        />
      </View>

      {/* footer */}
      <View className="relative top-[-25px] items-center">
        <Text className="text-md font-bold  text-black leading-5">
          {item.name}
        </Text>
        <Text className="text-xs font-bold italic text-black">
          {item.description}
        </Text>
        <Text className="text-lg font-bold  text-black leading-5">
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
