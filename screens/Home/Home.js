import React from 'react';
import baseUrl from '../../utils/common/baseUrl';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {COLORS, icons, dummyData} from '../../constants/index';
import {HorizontalFoodCard, VerticalFoodCard} from '../../components';
import {FilterModal} from '../index';
import axios from 'axios';
const Home = ({navigation}) => {
  const [selectedMenuType, setSelectedMenuType] = React.useState(
    '63b443800dc6bf2b86794367',
  );
  const [selectedMenuType2, setSelectedMenuType2] = React.useState(1);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  //from db
  const [category, setCategory] = React.useState([
    {
      _id: 11,
      name: 'Fast Food',
      // icon: require('../assets/icons/burger.png'),
    },
    {
      _id: 12,
      name: 'Fruit Item',
      // icon: require('../assets/icons/cherry.png'),
    },
    {
      _id: 13,
      name: 'Rice Item',
      // icon: require('../assets/icons/rice.png'),
    },
  ]);
  const [recommendedFoods, setRecommendedFoods] = React.useState([
    {
      _id: 1,
      name: 'Hamburger',
    },
    {
      _id: 2,
      name: 'Hot Tacos',
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);

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

  //setting categories
  const [fastFood, setFastFood] = React.useState([]);
  const [fruit, setFruit] = React.useState([]);
  const [rice, setRice] = React.useState([]);
  const [meat, setMeat] = React.useState([]);
  const [popularFoods, setPopularFoods] = React.useState([
    {
      _id: 1,
      name: 'Hamburger',
    },
    {
      _id: 2,
      name: 'Hot Tacos',
    },
  ]);
  //setting footer menu categories
  const [featured, setFeatured] = React.useState([]);
  const [nearYou, setNearYou] = React.useState([]);
  const [popular, setPopular] = React.useState([]);
  const [newest, setNewest] = React.useState([]);
  const [trending, setTrending] = React.useState([]);
  const [recommended, setRecommended] = React.useState([]);
  const [footerRecommended, setFooterRecommended] = React.useState([]);

  const [popularRecommendedation, setPopularRecommendation] = React.useState(
    [],
  );
  const [footerFoods, setFooterFoods] = React.useState([
    {
      _id: 1,
      name: 'Hamburger',
    },
    {
      _id: 2,
      name: 'Hot Tacos',
    },
  ]);
  //get data from db
  const getCategories = async () => {
    // setLoadingPopularFoods(true);
    const {data} = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/categories`,
    );
    setCategory(data);
    !data
      ? setLoading(true)
      : setTimeout(() => {
          setLoading1(false);
        }, 50);
  };
  const getPopularFoods = _id => {
    if (_id == '63b443800dc6bf2b86794367' || _id == undefined)
      setPopularFoods(fastFood),
        setSelectedMenuType(_id),
        setPopularRecommendation(fastFood);
    else if (_id == '63b443ae0dc6bf2b86794369')
      setPopularFoods(fruit),
        setSelectedMenuType(_id),
        setPopularRecommendation(fruit);
    else if (_id == '63b443ba0dc6bf2b8679436b')
      setPopularFoods(rice),
        setSelectedMenuType(_id),
        setPopularRecommendation(rice);
    else if (_id == '63b443f00dc6bf2b8679436d')
      setPopularFoods(meat),
        setSelectedMenuType(_id),
        setPopularRecommendation(meat);
  };
  const getFoods = async () => {
    const fastFood = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products?categories=63b443800dc6bf2b86794367`,
    );
    setFastFood(fastFood.data),
      setPopularFoods(fastFood.data),
      setFooterRecommended(fastFood.data);
    setPopularRecommendation(fastFood.data);
    const fruits = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products?categories=63b443ae0dc6bf2b86794369`,
    );
    setFruit(fruits.data);
    const rice = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products?categories=63b443ba0dc6bf2b8679436b`,
    );
    setRice(rice.data);

    const meat = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products?categories=63b443f00dc6bf2b8679436d`,
    );
    setMeat(meat.data);
  };

  const getRecommendedFoods = async () => {
    const {data} = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products`,
    );
    setRecommendedFoods(data);
    !data
      ? setLoading(true)
      : setTimeout(() => {
          setLoading2(false);
        }, 500);
  };

  const getFooterFoods = _id => {
    if (_id == 1 || _id == undefined)
      setFooterFoods(featured),
        setSelectedMenuType2(_id),
        setFooterRecommended(featured);
    else if (_id == 2)
      setFooterFoods(nearYou),
        setSelectedMenuType2(_id),
        setFooterRecommended(nearYou);
    else if (_id == 3)
      setFooterFoods(popular),
        setSelectedMenuType2(_id),
        setFooterRecommended(popular);
    else if (_id == 4)
      setFooterFoods(newest),
        setSelectedMenuType2(_id),
        setFooterRecommended(newest);
    else if (_id == 5)
      setFooterFoods(trending),
        setSelectedMenuType2(_id),
        setFooterRecommended(trending),
        setFooterRecommended(trending);
    else if (_id == 6)
      setFooterFoods(recommended),
        setSelectedMenuType2(_id),
        setFooterRecommended(recommended);
  };

  const getFooterFoodsEarlier = async () => {
    const featured = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products/get/isFeatured`,
    );
    setFeatured(featured.data), setFooterFoods(featured.data);
    const nearYou = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products`,
    );
    setNearYou(nearYou.data);
    const popular = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products?categories=63b443800dc6bf2b86794367`,
    );
    setPopular(popular.data);

    const newest = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products/get/isFeatured`,
    );
    setNewest(newest.data);
    const trending = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products?categories=63b443f00dc6bf2b8679436d`,
    );
    setTrending(trending.data);
    setNewest(newest.data);
    const recommended = await axios.get(
      `https://charles-jumiafoods-api.onrender.com/products`,
    );
    setRecommended(recommended.data);
  };
  React.useEffect(() => {
    getCategories();
    getFoods();
    getRecommendedFoods();
    getFooterFoodsEarlier();
  }, []);
  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        className="p-2 mt-3 "
        renderItem={({item, index}) => (
          <TouchableOpacity
            className="ml-3 bg-orange-400 rounded-lg px-[8px] mt-4"
            onPress={() => {
              getFooterFoods(item.id);
            }}>
            <Text
              className="font-bold text-lg text-red-700 "
              style={{
                color: selectedMenuType2 == item.id ? 'red' : 'black',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
  function renderRecommendedSection() {
    return (
      <View className="fixed top-1">
        <View className="flex-row justify-between mx-3 mt-5">
          <Text className="font-bold text-[20px] text-gray-700">
            Recommended
          </Text>
          <TouchableOpacity>
            <Text className="font-bold text-[20px] text-orange-500">
              Show All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recommendedFoods}
          snapToAlignment="center" // snapss on a page
          pagingEnabled //displays each image on its own page
          keyExtractor={item => `${item._id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}, props) => (
            <>
              {loading2 || loading ? (
                <ContentLoader
                  speed={1}
                  width={400}
                  height={460}
                  viewBox="0 0 400 460"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecdada"
                  {...props}>
                  <Rect x="0" y="0" rx="10" ry="10" width="400" height="160" />
                </ContentLoader>
              ) : (
                <View className="bg-gray-200 p-3 mt-1 rounded-lg ml-2 relative left-0 h-[130px] w-[390px]">
                  <HorizontalFoodCard
                    item={item}
                    icons={icons}
                    onPress={() =>
                      navigation.navigate('FoodDetail', {
                        item,
                        recommendedFoods,
                      })
                    }
                  />
                </View>
              )}
            </>
          )}
        />
      </View>
    );
  }
  function renderPopularSection() {
    return (
      <View>
        <View className="flex-row justify-between mx-3 mt-5">
          <Text className="text-gray-700 font-bold text-[18px]">
            Popular Near You
          </Text>
          <TouchableOpacity>
            <Text className="text-orange-500 font-bold text-[17px]">
              Show All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={popularFoods}
          keyExtractor={item => `${item._id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}, props) => (
            <View className="w-[188px] h-[230px] bg-gray-200 rounded-lg ml-3 mt-1 ">
              {popularFoods.length < 3 || loading ? (
                <View className="relative top-[-94px]">
                  <ContentLoader
                    speed={1}
                    width={417}
                    height={665}
                    viewBox="0 0 400 460"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecdada"
                    {...props}>
                    <Rect
                      x="0"
                      y="0"
                      rx="10"
                      ry="10"
                      width="180"
                      height="225"
                    />
                  </ContentLoader>
                </View>
              ) : (
                <VerticalFoodCard
                  item={item}
                  icons={icons}
                  onPress={() =>
                    navigation.navigate('FoodDetail', {
                      item,
                      popularRecommendedation,
                    })
                  }
                />
              )}
            </View>
          )}
        />
      </View>
    );
  }
  function renderFoodCategory() {
    return (
      <View>
        <FlatList
          data={category}
          keyExtractor={item => `${item._id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}, props) => (
            <TouchableOpacity
              className="flex-row bg-gray-200 mt-3 ml-1 rounded-lg px-2 w-[180px]"
              style={{
                backgroundColor:
                  selectedMenuType == item._id ? 'orange' : COLORS.lightOrange3,
              }}
              onPress={() => {
                getPopularFoods(item._id);
              }}>
              {loading1 || loading ? (
                <View className="relative top-[-94px]">
                  <ContentLoader
                    speed={1}
                    width={180}
                    height={60}
                    viewBox="0 0 400 460"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecdada"
                    {...props}>
                    <Rect x="0" y="2" rx="10" ry="10" width="180" height="60" />
                  </ContentLoader>
                </View>
              ) : (
                <>
                  <Image
                    source={{uri: item.icon}}
                    className="h-[60px] w-[60px]"
                  />
                  <Text className="relative top-4 left-5 font-bold text-[15px] text-black">
                    {item.name}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
  function renderDeriveryTo() {
    return (
      <View className="ml-2 mt-7">
        <Text className=" font-bold text-orange-500">DELIVERY TO</Text>
        <TouchableOpacity className="flex-row gap-1">
          <Text className="text-black font-bold">
            {dummyData?.myProfile.address}
          </Text>
          <Image source={icons.down_arrow} className="w-[20px] h-[20px]" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      {/* searchbar */}
      <View className="w-[90%] h-[40px] bg-gray-200 rounded-lg mt-5 mx-auto justify-between flex-row">
        <View className="flex-row ">
          <Image
            source={icons.search}
            className="w-[25px] h-[25px] mt-2 ml-2"
          />
          <TextInput
            placeholder="Search food..."
            className="ml-3 w-[70%] text-black"
          />
        </View>
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            className="w-[25px] h-[25px] mr-2 mt-2"
          />
        </TouchableOpacity>
      </View>
      {/* filltermodal */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* list */}
      <FlatList
        data={footerFoods}
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
            {/* Derivery to */}
            {renderDeriveryTo()}
            {/* food category  */}
            {renderFoodCategory()}
            {/* Popular */}
            {renderPopularSection()}
            {/* Recommended */}
            {renderRecommendedSection()}
            {/* menuitems */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({item}, props) => {
          return (
            <>
              {footerFoods.length < 3 || loading ? (
                <ContentLoader
                  speed={1}
                  width={400}
                  height={460}
                  viewBox="0 0 400 460"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecdada"
                  {...props}>
                  <Rect x="0" y="0" rx="10" ry="10" width="400" height="160" />
                </ContentLoader>
              ) : (
                <View className="bg-gray-200 mt-1 rounded-lg mx-3">
                  <HorizontalFoodCard
                    item={item}
                    icons={icons}
                    onPress={() =>
                      navigation.navigate('FoodDetail', {
                        item,
                        footerRecommended,
                      })
                    }
                  />
                </View>
              )}
            </>
          );
        }}
        ListFooterComponent={<View className="h-[330px]" />}
      />
    </View>
  );
};

export default Home;
