## Компоненти

### `CustomButton`
Кнопка з підтримкою іконки, двох варіантів (primary / outline), стану завантаження та блокування.

**Пропси:** `title`, `icon?`, `onPress`, `variant?`, `loading?`, `disabled?`

### `CoffeeCard`
Картка напою із зображенням, назвою, типом, ціною, рейтингом та кнопкою "додати до кошика". Ширина розраховується через `useWindowDimensions` для відображення у 2 колонки.

**Пропси:** `name`, `type`, `price`, `rating?`, `imageUrl`, `isFavourite?`, `onPress?`, `onAddToCart?`, `onToggleFavourite?`

### `Header`
Шапка застосунку з логотипом, вітальним текстом, заголовком та іконкою кошика з лічильником.

**Пропси:** `logoUrl?`, `greeting?`, `title`, `cartCount?`, `onCartPress?`

### `SearchBar`
Поле пошуку з кнопкою фільтра та мікропідказками — при введенні тексту показується список відповідних варіантів.

**Пропси:** `value?`, `onChangeText?`, `onFilterPress?`, `onSuggestionSelect?`, `placeholder?`, `suggestions?`

### `CategoryList`
Горизонтальний скролл-список категорій із підсвіченням активної та посиланням "See all".

**Пропси:** `categories`, `title?`, `onSelect?`, `onSeeAll?`

### `PromoBanner`
Банер з фоновим зображенням, тегом та заголовком акції.

**Пропси:** `tag?`, `title`, `imageUrl`, `onPress?`

### `BottomNavBar`
Нижня панель навігації з 4 вкладками (Home, Search, Favorites, Profile) і індикатором активної вкладки.

**Пропси:** `activeTab?`, `onTabPress?`

---

## Структура проекту

```
src/
├── components/
│   ├── CustomButton.tsx
│   ├── CoffeeCard.tsx
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── CategoryList.tsx
│   ├── PromoBanner.tsx
│   └── BottomNavBar.tsx
└── constants/
    ├── colors.ts
    └── typography.ts
```

---

[Скріншоти компонентів](screenshots/)

---

## Запуск

```sh
# Залежності
npm install

# iOS (після bundle install && bundle exec pod install)
npm run ios

# Android
npm run android
```
