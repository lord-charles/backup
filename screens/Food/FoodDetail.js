import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS, SIZES, dummyData, images, icons} from '../../constants';
import {
  HeaderDetails,
  IconButton,
  CartButton,
  IconLabel,
  TextButton,
  CustomLineDivider,
  RatingComponent,
  Stepper,
} from '../../components';
import {Foods, Information, Review} from './index';

const FoodDetail = ({navigation, route}) => {
  const [food, setFood] = React.useState([]);
  const [qty, setQty] = React.useState(1);
  const Tab = createMaterialTopTabNavigator();
  const [receivedRecommendedation, setReceivedRecommendedation] =
    React.useState([]);
  React.useEffect(() => {
    const {
      item,
      popularRecommendedation,
      footerRecommended,
      recommendedFoods,
      recommendation,
    } = route.params;
    setFood(item);
    if (popularRecommendedation)
      setReceivedRecommendedation(popularRecommendedation);
    else if (footerRecommended) setReceivedRecommendedation(footerRecommended);
    else if (recommendedFoods) setReceivedRecommendedation(recommendedFoods);
    else if (recommendation) setReceivedRecommendedation(recommendation);
  }, []);
  function renderHeader() {
    return (
      <View className="z-50">
        <HeaderDetails
          title="item"
          containerStyle={{height: 50, marginHorizontal: 8, marginTop: 20}}
          titleStyle={{
            marginTop: 10,
            fontWeight: 'bold',
            color: 'black',
            fontSize: 20,
          }}
          leftComponent={
            <IconButton
              icon={icons.back}
              containerStyle={{
                height: 37,
                width: 37,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: COLORS.gray2,
                backgroundColor: COLORS.lightOrange2,
              }}
              iconStyle={{width: 25, height: 25, tintColor: COLORS.orange}}
              onPress={() => navigation.goBack()}
            />
          }
          rightComponent={
            <CartButton
              icon={icons.cart}
              iconStyle={{width: 25, height: 25, tintColor: COLORS.blue}}
              containerStyle={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                backgroundColor: COLORS.lightOrange2,
              }}
              onPress={() => console.log('cart')}
              quantity={8}
            />
          }
        />
      </View>
    );
  }
  function renderFooter() {
    return (
      <View>
        {/* item profile */}
        <View className="mt-5">
          <CustomLineDivider className="mt-3" />
          <View className="mt-5 flex-row justify-between w-screen items-center px-4 ">
            <View className="flex-row gap-x-2 items-center">
              <Image
                source={dummyData.myProfile.profile_image}
                className="w-[50px] h-[50px] rounded-lg"
                resizeMode="contain"
              />
              <View>
                <Text className="text-black ">{dummyData.myProfile.name}</Text>
                <Text className="text-black ">1.5 km from you</Text>
              </View>
            </View>
            <View>
              <RatingComponent rating={4} />
            </View>
          </View>
          <CustomLineDivider />
        </View>
        <View className="flex-row justify-between gap-x-1">
          <Stepper
            value={qty}
            onAdd={() => setQty(qty + 1)}
            onMinus={() => {
              if (qty > 1) {
                setQty(qty - 1);
              }
            }}
          />
          <TouchableOpacity
            className="flex-row gap-x-6 bg-orange-500 rounded-lg items-center px-4 relative top-[-10px] right-[11px]"
            onPress={() => navigation.navigate('MyCart')}>
            <Text className="text-white text-[25px]">Buy Now</Text>
            <Text className="text-black text-[18px] italic">
              ${(food.price * qty).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* Header */}
      {renderHeader()}

      <View className="items-center">
        <ImageBackground
          source={{uri: food.image}}
          className="h-[23vh] w-[90vw] absolute top-[-70px]"
          resizeMode="stretch"
        />
      </View>

      {/* Body */}
      <View
        style={{
          flex: 1,
        }}
        className="relative top-[15vh]">
        <Tab.Navigator>
          <Tab.Screen name="Foods">
            {props => (
              <Foods
                {...props}
                food={food}
                recommendation={receivedRecommendedation}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Review">
            {props => <Review {...props} food={food} />}
          </Tab.Screen>
          <Tab.Screen name="Information">
            {props => <Information {...props} food={food} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default FoodDetail;
