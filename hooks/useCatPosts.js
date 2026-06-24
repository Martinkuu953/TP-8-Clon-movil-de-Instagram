// hooks/useCatPosts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

// Usuarios simulados para el feed
const MOCK_USERS = [
  { id: 'ani', avatar: 'https://i.pravatar.cc/150?img=1', location: 'Buenos Aires, Argentina' },
  { id: 'fracrock', avatar: 'https://i.pravatar.cc/150?img=2', location: 'Córdoba, Argentina' },
  { id: 'devam', avatar: 'https://i.pravatar.cc/150?img=3', location: 'Rosario, Argentina' },
  { id: 'yukiscape', avatar: 'https://i.pravatar.cc/150?img=4', location: 'Mendoza, Argentina' },
  { id: 'mirodev', avatar: 'https://i.pravatar.cc/150?img=5', location: 'La Plata, Argentina' },
];

const MOCK_CAPTIONS = [
  'Lorem ipsum dolor sit amet. Et nisi debitis aut dolores totam aut repellendus ipsum eos distinctio explicab',
  'Disfrutando del día 🌿 cada momento importa. #vida #naturaleza',
  'El arte de vivir está en los pequeños detalles ✨',
  'Nuevas aventuras, nuevos horizontes 🗺️ #travel #explore',
  'La luz perfecta no existe, se crea 📸 #photography',
  'Cuando la naturaleza habla, hay que escuchar 🍃 #nature',
  'Momentos que quedan para siempre en la memoria ❤️',
  'Buenos días mundo 🌅 comenzando con energía',
  'El viaje más largo empieza con el primer paso 🚶',
  'Encontrando belleza en lo cotidiano ✨ #daily',
];

export const useCatPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch 12 imágenes de gatos desde The Cat API
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        params: {
          limit: 12,
          size: 'med',
          mime_types: 'jpg,png',
          order: 'RANDOM',
        },
        headers: {
          'x-api-key': 'live_example_key', // sin key funciona con rate limit
        },
        timeout: 10000,
      });

      const mappedPosts = response.data.map((cat, index) => {
        const user = MOCK_USERS[index % MOCK_USERS.length];
        return {
          id: cat.id,
          imageUrl: cat.url,
          width: cat.width || 500,
          height: cat.height || 500,
          user: {
            id: user.id,
            avatar: user.avatar,
            location: user.location,
          },
          likes: Math.floor(Math.random() * 50000) + 100,
          caption: MOCK_CAPTIONS[index % MOCK_CAPTIONS.length],
          commentsCount: Math.floor(Math.random() * 50000) + 100,
          timeAgo: `${Math.floor(Math.random() * 23) + 1} hours ago`,
          liked: false,
          saved: false,
        };
      });

      setPosts(mappedPosts);
    } catch (err) {
      console.error('Error fetching cat posts:', err);
      setError(err.message);
      // Fallback con imágenes de placeholder
      const fallbackPosts = Array.from({ length: 12 }, (_, index) => {
        const user = MOCK_USERS[index % MOCK_USERS.length];
        return {
          id: `fallback-${index}`,
          imageUrl: `https://cataas.com/cat?${index}`,
          width: 500,
          height: 500,
          user: {
            id: user.id,
            avatar: user.avatar,
            location: user.location,
          },
          likes: Math.floor(Math.random() * 50000) + 100,
          caption: MOCK_CAPTIONS[index % MOCK_CAPTIONS.length],
          commentsCount: Math.floor(Math.random() * 50000) + 100,
          timeAgo: `${Math.floor(Math.random() * 23) + 1} hours ago`,
          liked: false,
          saved: false,
        };
      });
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      )
    );
  };

  return { posts, loading, error, toggleLike, toggleSave, refetch: fetchPosts };
};
