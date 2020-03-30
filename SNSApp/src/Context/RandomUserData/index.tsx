import React, {createContext, useState, useEffect} from 'react';
import {ActivityIndicator, Image} from 'react-native';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = Styled.View`
  flex: 1;
  background-color: #FEFFFF;
  align-items: center;
  justify-content: center;
`;

interface Props {
  cache?: boolean;
  children: JSX.Element | Array<JSX.Element>;
}

interface IRandomUserData {
  getMyFeed: (number?: number) => Array<IFeed>;
}

const RandomUserDataContext = createContext<IRandomUserData>({
  getMyFeed: (number: number = 10) => {
    return [];
  },
});

const RandomUserDataProvider = ({cache, children}: Props) => {
  const [userList, setUserList] = useState<Array<IUserProfile>>([]);
  const [descriptionList, setDescriptionList] = useState<Array<string>>([]);
  const [imageList, setImageList] = useState<Array<string>>([]);

  const getCacheData = async (key: string) => {
    const cacheData = await AsyncStorage.getItem(key);
    if (cache === false || cacheData === null) {
      return undefined;
    }

    const cacheList = JSON.parse(cacheData);

    if (cacheList.length !== 25) {
      return undefined;
    }

    return cacheList;
  };
  const setCachedData = (key: string, data: Array<any>) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  };

  const setUsers = async () => {
    const cachedData = await getCacheData('UserList');
    if (cachedData) {
      setUserList(cachedData);
      return;
    }

    try {
      const response = await fetch('https://uinames.com/api/?amount=25&ext');

      console.log(response);

      // const data = await response.json();
      // const data = [];

      const data = [
        {name: 'test1', photo: 'test'},
        {name: 'test2', photo: 'test'},
        {name: 'test3', photo: 'test'},
        {name: 'test4', photo: 'test'},
        {name: 'test5', photo: 'test'},
        {name: 'test6', photo: 'test'},
        {name: 'test7', photo: 'test'},
        {name: 'test8', photo: 'test'},
        {name: 'test9', photo: 'test'},
        {name: 'test10', photo: 'test'},
        {name: 'test11', photo: 'test'},
        {name: 'test12', photo: 'test'},
        {name: 'test13', photo: 'test'},
        {name: 'test14', photo: 'test'},
        {name: 'test15', photo: 'test'},
        {name: 'test16', photo: 'test'},
        {name: 'test17', photo: 'test'},
        {name: 'test18', photo: 'test'},
        {name: 'test19', photo: 'test'},
        {name: 'test20', photo: 'test'},
        {name: 'test21', photo: 'test'},
        {name: 'test22', photo: 'test'},
        {name: 'test23', photo: 'test'},
        {name: 'test24', photo: 'test'},
        {name: 'test25', photo: 'test'},
      ];

      setUserList(data);
      setCachedData('UserList', data);
    } catch (error) {
      console.log(error);
    }
  };

  const setDescriptions = async () => {
    const cachedData = await getCacheData('DescriptionList');
    console.log(cachedData);
    if (cachedData) {
      setDescriptionList(cachedData);
      return;
    }

    try {
      const response = await fetch(
        'https://opinionated-quotes-api.gigalixirapp.com/v1/quotes?rand=t&n=25',
      );
      const data = await response.json();

      let text = [];
      for (const index in data.quotes) {
        text.push(data.quotes[index].quote);
      }

      setDescriptionList(text);
      setCachedData('DescriptionList', text);
    } catch (error) {
      console.log(error);
    }
  };

  const setImages = async () => {
    const cachedData = await getCacheData('ImageList');
    if (cachedData) {
      if (Image.queryCache) {
        Image.queryCache(cachedData);
        cachedData.map((data: string) => {
          Image.prefetch(data);
        });
      }
      setImageList(cachedData);
      return;
    }

    setTimeout(async () => {
      try {
        const response = await fetch('https://source.unsplash.com/random/');
        const data = response.url;
        if (imageList.indexOf(data) >= 0) {
          setImages();
          return;
        }
        setImageList([...imageList, data]);
      } catch (error) {
        console.log(error);
      }
    }, 400);
  };

  useEffect(() => {
    setUsers();
    setDescriptions();
  }, []);

  useEffect(() => {
    if (imageList.length !== 25) {
      setImages();
    } else {
      setCachedData('ImageList', imageList);
    }
  }, [imageList]);

  const getImages = (): Array<string> => {
    let images: Array<string> = [];
    const count = Math.floor(Math.random() * 4);

    for (let i = 0; i <= count; i++) {
      images.push(imageList[Math.floor(Math.random() * 24)]);
    }

    return images;
  };
  const getMyFeed = (number: number = 10): Array<IFeed> => {
    let feeds: Array<IFeed> = [];
    for (let i = 0; i < number; i++) {
      const user = userList[Math.floor(Math.random() * 24)];
      feeds.push({
        name: user.name,
        photo: user.photo,
        description: descriptionList[Math.floor(Math.random() * 24)],
        images: getImages(),
      });
    }
    return feeds;
  };

  console.log(
    `${userList.length} / ${descriptionList.length} / ${imageList.length}`,
  );
  return (
    <RandomUserDataContext.Provider
      value={{
        getMyFeed,
      }}>
      {userList.length === 25 &&
      descriptionList.length === 25 &&
      imageList.length === 25 ? (
        children
      ) : (
        <Loading>
          <ActivityIndicator color="#D3D3D3" size="large" />
        </Loading>
      )}
    </RandomUserDataContext.Provider>
  );
};

export {RandomUserDataProvider, RandomUserDataContext};
