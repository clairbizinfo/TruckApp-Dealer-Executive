import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import Sidebar from '../../components/Sidebar';
import { useState } from 'react';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;


const { width } = Dimensions.get('window');

type Feature = {
  id: string;
  title: string;
  image: any;
  color: string;
  navigateTo?: keyof RootStackParamList;
};

const features: Feature[] = [
  {
    id: '1',
    title: 'Dashboard',
    image: require('../../assets/dashboard.png'),
    color: '#0288D1',
    navigateTo: 'Dashboard',
  },
  {
    id: '2',
    title: 'Enquiry',
    image: require('../../assets/Enquiry.png'),
    color: '#EF6C00',
    navigateTo: 'Enquiry',
  },
  // {
  //   id: '3',
  //   title: 'Add Truck',
  //   image: require('../../assets/Add.png'),
  //   color: '#7b2cbf',
  //   navigateTo: 'AddTruck',
  // },
  // {
  //   id: '4',
  //   title: '',
  //   image: require('../../assets/purchase.png'),
  //   color: '#7C3AED',
  //   navigateTo: 'Loan',
  // },
];



const HomeScreen = () => {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible((prev) => !prev);


  const renderFeature = ({ item }: { item: Feature }) => {

    const handlePress = () => {
      switch (item.id) {
        case '1':
          navigation.navigate('Dashboard');
          break;
        case '2':
          navigation.navigate('Enquiry');
          break;
        case '3':
          navigation.navigate('AddTruck');
          break;

        default:
          console.warn(`No navigation defined for item id: ${item.id}`);
          break;
      }
    };



    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={[styles.card, { backgroundColor: item.color }]}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={item.image}
            style={styles.featureImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.cardText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>

      <CustomHeader
        title="Truck Deals"
        onMenuPress={toggleSidebar}
        onProfilePress={() => navigation.navigate('Profile')}
      />



      {/* <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={22} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Trucks"
          placeholderTextColor="#6c757d"
        />
      </View> */}

      {/* <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          autoplayTimeout={3.5}
          showsPagination
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          loop
        >
          {sliderImages.map((image, index) => (
            <Image key={index} source={image} style={styles.sliderImage} resizeMode="cover" />
          ))}
        </Swiper>
      </View> */}

      <FlatList
        data={features}
        renderItem={renderFeature}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={4}
        maxToRenderPerBatch={6}
        windowSize={10}
      />
      <Sidebar visible={sidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ced4da',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: '#adb5bd',
    marginTop: 10,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#495057',
    fontWeight: '600',
    letterSpacing: 0.1,
  },

  sliderContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },

  sliderImage: {
    width: width - 32,
    height: 180,
    borderRadius: 12,
  },

  dotStyle: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },

  activeDotStyle: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  gridContainer: {
    marginTop: 40,
  },

  row: {
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },

  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 25,
  },

  imageWrapper: {
    borderRadius: 50,
    padding: 14,
    marginBottom: 10,
  },

  featureImage: {
    width: 150,
    height: 55,
  },

  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
