import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import dayjs from 'dayjs';
import { supabase } from '../lib/supabase';

function PostItem({ item }) {
  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <Text style={styles.author}>{item.author_name}</Text>
        <Text style={styles.time}>{dayjs(item.created_at).format('MMM D, HH:mm')}</Text>
      </View>
      {item.content_text ? <Text style={styles.text}>{item.content_text}</Text> : null}
      {item.image_url ? <Image source={{ uri: item.image_url }} style={styles.image} /> : null}
    </View>
  );
}

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (!error && data) setPosts(data);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel('posts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
        fetchPosts();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostItem item={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  post: { marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  author: { fontWeight: '600' },
  time: { color: '#666' },
  text: { fontSize: 16, marginBottom: 8 },
  image: { height: 240, borderRadius: 8 },
});

