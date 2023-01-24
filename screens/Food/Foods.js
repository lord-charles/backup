import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {
  View,
  Text,
  Image,
  RefreshControl,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, dummyData, images, icons} from '../../constants';
import Carousel from 'react-native-reanimated-carousel';
import {
  IconLabel,
  TextButton,
  CustomLineDivider,
  HorizontalFoodCard,
} from '../../components';

const Foods = ({navigation, food, recommendation}) => {
  const [selectedSize, setSelectedSize] = React.useState('1');
  const [loading, setLoading] = React.useState(false);
  const width = Dimensions.get('window').width;
  //Refresh control in main flatlist
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 2250);
  }, []);
  return (
    <View className="bg-white">
      <FlatList
        data={recommendation}
        keyExtractor={item => `${item._id}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red', 'green', 'blue', 'orange']}
            style={{backgroundColor: 'transparent'}}
            tintColor="transparent" //iso
          />
        }
        ListHeaderComponent={
          <View>
            <View className=" w-[98vw] h-[220px] bg-gray-200 rounded-lg mx-auto">
              <View className="flex-row justify-between w-[98vw] mt-1 ml-[-5px] bg-transparent">
                {/* calories */}
                <View className="flex-row">
                  <Image
                    source={icons.calories}
                    className="w-[50px] h-[50px]"
                  />
                  <Text className="text-black mt-3">78 calories</Text>
                </View>
                {/* love */}
                <View>
                  <Image
                    source={icons.love}
                    className="h-[30px] w-[30px]"
                    style={{
                      tintColor: food.isFavourite ? COLORS.red : COLORS.gray2,
                    }}
                  />
                </View>
              </View>
              <View className="w-[98vw] mt-[-5px]">
                <Carousel
                  loop
                  width={width}
                  height={width / 2}
                  autoPlay={true}
                  data={food.images}
                  scrollAnimationDuration={1000}
                  mode="parallax"
                  // onSnapToItem={index => console.log('current index:', index)}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                      }}
                      className="mt-[-40px]">
                      <Image
                        source={{uri: item}}
                        className="w-[100%] h-[180px] "
                        resizeMode="contain"
                      />
                      <Text className="text-center text-black font-bold text-lg">
                        ${food.price} only
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
            {/* rating & shipping & derivery */}
            <View className="flex-row justify-between mx-2">
              {/* rating */}
              <IconLabel
                label="4.5"
                icon={icons.star}
                iconStyle={{
                  tintColor: COLORS.white,
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
                containerStyle={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.orange,
                  borderRadius: 8,
                  padding: 8,
                  width: 70,
                }}
              />
              {/* time */}
              <IconLabel
                label="30 min"
                icon={icons.clock}
                iconStyle={{
                  tintColor: COLORS.black,
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
                containerStyle={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.gray3,
                  borderRadius: 8,
                  padding: 8,
                  width: 90,
                }}
              />
              {/* derivery */}
              <IconLabel
                label="Free derivery"
                icon={icons.dollar}
                iconStyle={{
                  tintColor: COLORS.black,
                  width: 20,
                  height: 20,
                  marginRight: 5,
                }}
                containerStyle={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.lightOrange3,
                  borderRadius: 8,
                  padding: 8,
                  width: 120,
                }}
              />
            </View>
            {/* sizes */}
            <View className="mt-10 mx-2 flex-row gap-x-4">
              <Text className="text-black font-bold text-[22px] relative left-8 top-0 rounded-md border-green-300 border h-[40px] p-2  text-center ">
                Sizes
              </Text>
              <View className="relative left-[50px] flex-row">
                {dummyData.sizes.map((item, index) => (
                  <TextButton
                    label={item.label}
                    key={item.id}
                    buttonContainerStyle={{
                      padding: 13,
                      marginHorizontal: 10,
                      borderRadius: 8,
                      backgroundColor:
                        selectedSize == item.id ? COLORS.primary : COLORS.null,
                      borderColor:
                        selectedSize == item.id
                          ? COLORS.primary
                          : COLORS.lightOrange,
                      borderWidth: 1,
                    }}
                    labelStyle={{
                      color:
                        selectedSize == item.id ? COLORS.white : COLORS.black,
                      fontSize: selectedSize == item.id ? 16 : 13,
                      fontWeight: selectedSize == item.id ? '900' : '400',
                    }}
                    onPress={() => setSelectedSize(item.id)}
                  />
                ))}
              </View>
            </View>
            <CustomLineDivider />
            <View className="flex-row items-center justify-center">
              <Image
                source={icons.down_arrow_gif}
                className="h-[30px] w-[25px] mt-3"
              />
              <Text className=" text-lg text-red-500 font-semibold">
                Foods You may also like
              </Text>
              <Image
                source={icons.down_arrow_gif}
                className="h-[30px] w-[25px]"
              />
            </View>
          </View>
        }
        renderItem={({item}, props) => {
          return (
            <>
              {!recommendation || loading ? (
                <View className="relative top-[-94px]">
                  <ContentLoader
                    speed={1}
                    width={400}
                    height={460}
                    viewBox="0 0 400 460"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecdada"
                    {...props}>
                    <Rect
                      x="0"
                      y="0"
                      rx="10"
                      ry="10"
                      width="400"
                      height="160"
                    />
                  </ContentLoader>
                </View>
              ) : (
                <TouchableOpacity className="bg-gray-200 mb-1 mx-2 rounded-lg">
                  <HorizontalFoodCard
                    item={item}
                    icons={icons}
                    onPress={() =>
                      navigation.replace('FoodDetail', {
                        item,
                        recommendation,
                      })
                    }
                  />
                </TouchableOpacity>
              )}
            </>
          );
        }}
        ListFooterComponent={<View className="h-[90px]" />}
      />
    </View>
  );
};

export default Foods;
