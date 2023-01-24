import React from 'react';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {View} from 'react-native';
import AwesomeLoading from 'react-native-awesome-loading';

const Search = () => {
  return (
    <View className="bg-white w-full h-full">
      <AwesomeLoading
        indicatorId={20}
        size={50}
        isActive={true}
        text="loading"
      />
    </View>
  );
};
export default Search;
