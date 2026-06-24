# 📸 Instagram Clone — React Native + Expo

Clon móvil de Instagram desarrollado con React Native y Expo, consumiendo imágenes en tiempo real desde [The Cat API](https://thecatapi.com/). Trabajo Práctico para la materia de Desarrollo Móvil.

---

## 🖼️ Referencias Visuales (Figma / Mockups)

Las siguientes capturas fueron utilizadas como referencia de diseño:

- **Feed principal** — `Frame_1.png` (pantalla de inicio con stories, posts, barra de acción)
- **Detalle de post** — `Post.png` (vista extendida, comentarios, interacciones)
- **Perfil de usuario** — `Frame_2.png` (grilla 3 columnas, stats, highlights)

> 📌 Referencia de comunidad Figma de Instagram UI: [Instagram UI Kit (Community)](https://www.figma.com/community/file/1293565612897861727)

---

## 🗂️ Jerarquía de Archivos

```
instagram-clone/
├── app/
│   └── index.js              # Punto de entrada: NavigationContainer + Stack/Tab navigators
├── assets/
│   ├── icon.png              # Ícono nativo de la app
│   ├── splash.png            # Splash screen personalizado
│   └── adaptive-icon.png     # Ícono adaptativo Android
├── components/
│   ├── PostCard.js           # Ítem reutilizable del feed (avatar, imagen, acciones, caption)
│   └── StoriesBar.js         # Barra horizontal de stories con ScrollView
├── constants/
│   └── theme.js              # Paleta de colores, tipografía y espaciados
├── hooks/
│   └── useCatPosts.js        # Custom hook: fetch de The Cat API con Axios + estado local
├── screens/
│   ├── HomeScreen.js         # Feed principal (FlatList + StoriesBar)
│   ├── PostDetailScreen.js   # Vista extendida del post con comentarios
│   ├── ProfileScreen.js      # Perfil con stats, highlights y grid 3 columnas
│   ├── SearchScreen.js       # Pantalla de búsqueda (placeholder)
│   ├── ReelsScreen.js        # Pantalla de reels (placeholder)
│   └── NotificationsScreen.js# Pantalla de notificaciones (placeholder)
├── app.json                  # Configuración Expo (icon, splash, scheme)
├── babel.config.js
├── package.json
└── README.md
```

---

## 🧩 Componentes Atómicos y Props

### `PostCard.js`
Componente de presentación para cada ítem del feed. Recibe todo el dato del post por props.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `post` | `object` | Objeto completo con `id`, `imageUrl`, `user`, `likes`, `caption`, `liked`, `saved` |
| `onLike` | `function` | Callback que recibe `post.id` al tocar el corazón |
| `onSave` | `function` | Callback que recibe `post.id` al tocar el marcador |
| `onPress` | `function` | Callback con el objeto `post` completo al tocar la imagen o comentarios |
| `onUserPress` | `function` | Callback con el objeto `user` al tocar el avatar/username |

### `StoriesBar.js`
Barra horizontal de historias con datos mock. Renderiza `StoryItem` internamente. Sin props externas — usa datos estáticos simulados.

---

## 📦 Estados Manejados

### Global (via custom hook `useCatPosts`)

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `posts` | `array` | Lista de posts con su estado de like y guardado |
| `loading` | `boolean` | Indicador de carga durante el fetch |
| `error` | `string \| null` | Mensaje de error si el fetch falla |

Expone también: `toggleLike(postId)`, `toggleSave(postId)`, `refetch()`.

### Local (en `PostDetailScreen`)

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `liked` | `boolean` | Estado del botón "Me gusta" en tiempo real |
| `likes` | `number` | Contador de likes que se incrementa/decrementa en pantalla |
| `saved` | `boolean` | Estado del botón guardar |
| `commentText` | `string` | Texto del input de nuevo comentario |

### Local (en `ProfileScreen`)

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `activeTab` | `string` | Controla si se muestra la grilla o la pestaña de etiquetas |

---

## 🧭 Arquitectura de Navegación

```
NavigationContainer
└── Stack.Navigator (root)
    ├── Screen: "Main" → MainTabs (Bottom Tab Navigator)
    │   ├── Tab: "Home"          → HomeScreen
    │   ├── Tab: "Search"        → SearchScreen
    │   ├── Tab: "Reels"         → ReelsScreen
    │   ├── Tab: "Notifications" → NotificationsScreen
    │   └── Tab: "Profile"       → ProfileScreen
    ├── Screen: "PostDetail"     → PostDetailScreen
    │   └── Params: { post: PostObject }
    └── Screen: "Profile"        → ProfileScreen
        └── Params: { user: UserObject } (opcional)
```

La navegación `Feed → Detalle` se resuelve con `navigation.navigate('PostDetail', { post })`.
La navegación `Feed → Perfil` se resuelve con `navigation.navigate('Profile', { user })`.

---

## 🌐 Consumo de API

Se utiliza **Axios** dentro del hook personalizado `useCatPosts` para obtener imágenes de **The Cat API**:

```
GET https://api.thecatapi.com/v1/images/search?limit=12&mime_types=jpg,png&order=RANDOM
```

- Llamada dentro de `useEffect` con arreglo de dependencias vacío (solo al montar).
- Los datos se mapean a objetos de post con usuario simulado, likes aleatorios y caption mock.
- En caso de error de red, se usa un fallback con `cataas.com`.

---

## 🚀 Inicialización del Proyecto

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd instagram-clone

# 2. Instalar dependencias
npm install

# 3. Iniciar Expo
npx expo start

# 4. Escanear el QR con Expo Go (iOS/Android) o presionar:
#    a → Android emulator
#    i → iOS simulator
```

**Requisitos:** Node.js 18+, npm 9+, app Expo Go en el dispositivo.

---

## ✅ Checklist de Requisitos

- [x] Barra de navegación nativa (Bottom Tab + Stack)
- [x] Feed con `FlatList` de alto rendimiento (sin `.map()`)
- [x] Mínimo 10 imágenes asíncronas desde The Cat API via Axios
- [x] Exclusivo uso de `StyleSheet.create()` para estilos
- [x] `TouchableOpacity` / `Pressable` para interacciones táctiles
- [x] Flujo completo: Feed → Detalle de Post → Perfil
- [x] Grid de 3 columnas con `FlatList` + `numColumns={3}`
- [x] SplashScreen personalizada, ícono nativo, StatusBar dark
- [x] `SafeAreaView` en todas las pantallas
- [x] Interacción de like en tiempo real con `useState` en PostDetail
- [x] Componentes modulares con paso de datos por props
- [x] Documentación técnica completa (README)
