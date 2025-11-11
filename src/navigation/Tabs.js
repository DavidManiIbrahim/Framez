import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useThemeMode } from '../context/ThemeContext';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { theme, toggleTheme } = useThemeMode();
  const nav = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerTintColor: theme === 'dark' ? '#fff' : undefined,
        tabBarActiveTintColor: theme === 'dark' ? '#fff' : undefined,
        tabBarInactiveTintColor: theme === 'dark' ? '#aaa' : undefined,
        headerRight: () => (
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={22}
            color={'#fff'}
            style={{ marginRight: 16 }}
            onPress={toggleTheme}
          />
        ),
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Feed') return <Ionicons name="home" size={size} color={color} />;
          if (route.name === 'Create') return <Ionicons name="add-circle" size={size} color={color} />;
          return <Ionicons name="person" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Create" component={CreatePostScreen} options={{ title: 'Create Post' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
