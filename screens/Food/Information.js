import React from 'react';
import {View, Text} from 'react-native';

const Information = ({food}) => {
  return (
    <View className="mx-1">
      {/* fooddescription */}
      <View className="w-[98vw] mt-8">
        <View className="flex-row items-center justify-between">
          <Text className="text-black font-bold text-[25px]">{food.name}</Text>
          <Text className="text-black font-bold text">
            Units left:{food.countInStock}
          </Text>
        </View>
        <Text className="text-orange-500 font-semibold text-[19px]">
          {food.description}
        </Text>
        <Text className="text-black text mx-1 mt-2">
          {food.richDescription}
        </Text>
      </View>
      <View className="mt-2">
        <Text className="text-black text-[25px] font-bold">
          Price Variations
        </Text>
        <View className="flex-row items-center gap-x-3">
          <Text className="text-black text-[18px]">Initial price</Text>
          <Text className="text-black line-through">${food.price + 1.75}</Text>
        </View>
        <View className="flex-row items-center gap-x-3">
          <Text className="text-black text-[18px]">Current price</Text>
          <Text className="text-black">${food.price}</Text>
        </View>
        <View className="flex-row items-center gap-x-3">
          <Text className="text-black text-[18px]">Savings</Text>
          <Text className="text-black">$1.75</Text>
        </View>
      </View>
    </View>
  );
};

export default Information;
