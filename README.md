# @nfsmonstr/react-native-action-button

Customizable floating action button (FAB) component for React Native — TypeScript rewrite targeting React 19 + RN 0.83+.

> **Based on** [mastermoo/react-native-action-button](https://github.com/mastermoo/react-native-action-button) by Yousef Kamawall. Original concept, API design, and demos are his work.

![react-native-action-button demo](http://i.giphy.com/26BkMir9IcAhqe4EM.gif)
![react-native-action-button demo](http://i.giphy.com/xTcnTeW9BBXh8wMhLq.gif)
![react-native-action-button demo](http://i.giphy.com/l0K7psuhDQGLeT3d6.gif)
![react-native-action-button demo](http://i.giphy.com/xTcnSOtuet39cM46s0.gif)

---

## v3 Breaking Changes

Migrating from v2 (`react-native-action-button`)?

- **Removed props**: `icon` (use `renderIcon` instead), `useNativeFeedback`, `fixNativeFeedbackRadius` — these are obsolete with `Pressable`
- **Package name**: `@nfsmonstr/react-native-action-button`
- **Peer deps**: React ≥ 19, React Native ≥ 0.83
- **No more `prop-types`** — full TypeScript types instead

---

## Installation

```bash
npm i @nfsmonstr/react-native-action-button
# or
yarn add @nfsmonstr/react-native-action-button
```

No native modules — pure JS/TS, no linking required.

---

## Usage

```tsx
import ActionButton from '@nfsmonstr/react-native-action-button';

<ActionButton buttonColor="rgba(231,76,60,1)">
  <ActionButton.Item buttonColor="#9b59b6" title="New Task" onPress={() => {}}>
    <Text>✏️</Text>
  </ActionButton.Item>
  <ActionButton.Item buttonColor="#3498db" title="Notifications" onPress={() => {}}>
    <Text>🔔</Text>
  </ActionButton.Item>
</ActionButton>
```

---

## Configuration

### ActionButton

| Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| size | number | 56 | Size of the main button |
| resetToken | any | null | Change to reset open/close state in a re-render cycle |
| active | boolean | false | Whether action items are visible |
| autoInactive | boolean | true | Auto-close when an item is pressed |
| hideShadow | boolean | false | Hide default shadow/elevation |
| position | string | `"right"` | One of: `left`, `center`, `right` |
| bgColor | string | `"transparent"` | Overlay background color when expanded |
| bgOpacity | number | 1 | Overlay background opacity when expanded |
| buttonColor | string | `"rgba(0,0,0,1)"` | Background color of the FAB |
| spacing | number | 20 | Spacing between items |
| offsetX | number | 30 | Horizontal offset from screen edge |
| offsetY | number | 30 | Vertical offset from screen edge |
| btnOutRange | string | buttonColor | FAB color to animate to when expanded |
| btnOutRangeTxt | string | buttonText color | FAB text color to animate to when expanded |
| outRangeScale | number | 1 | Scale multiplier during expand animation |
| onPress | function | `() => {}` | Called when FAB is tapped |
| onPressIn | function | `() => {}` | Called on press in |
| onPressOut | function | `() => {}` | Called on press out |
| onLongPress | function | undefined | Called on long press |
| onReset | function | undefined | Called after FAB closes |
| renderIcon | function | undefined | `(active: boolean) => ReactElement` — render custom icon |
| backdrop | Component/boolean | false | Custom backdrop component (e.g. BlurView) |
| degrees | number | 45 | Rotation degrees for the icon when expanded |
| buttonText | string | `"+"` | Text on the FAB when no renderIcon |
| buttonTextStyle | style | `{}` | Style for FAB text |
| verticalOrientation | string | `"up"` | Direction items expand: `up` or `down` |
| backgroundTappable | boolean | false | Make overlay tappable to close |
| activeOpacity | number | 0.85 | Opacity on press |
| shadowStyle | style | undefined | Custom shadow style |
| nativeFeedbackRippleColor | string | `'rgba(255,255,255,0.75)'` | Android ripple color (Pressable) |
| style | style | undefined | Style for the outer container |
| elevation | number | undefined | Android z-order of the overlay (not button shadow — use `shadowStyle` for shadow customisation) |
| zIndex | number | undefined | CSS z-index of the overlay |
| accessible | boolean | undefined | Accessibility flag for the FAB |

### ActionButton.Item

| Property | Type | Default | Description |
| --- | :---: | :---: | --- |
| size | number | 40 | Size of the item button |
| title | string/ReactElement | undefined | Label shown next to the button |
| onPress | function | **required** | Called when item is tapped |
| buttonColor | string | same as FAB | Background color of the item |
| textContainerStyle | style | undefined | Style for the label container |
| textStyle | style | undefined | Style for the label text |
| spaceBetween | number | 15 | Space between button and label |
| numberOfLines | number | 1 | Max lines for the label text |
| activeOpacity | number | 0.85 | Opacity on press |
| hideShadow | boolean | false | Hide shadow/elevation |
| hideLabelShadow | boolean | hideShadow | Hide label shadow specifically |
| shadowStyle | style | undefined | Custom shadow style |
| nativeFeedbackRippleColor | string | `'rgba(255,255,255,0.75)'` | Android ripple color |

---

### Shadow behaviour

On **Android API 28+** (Android 9+) and **iOS**, the default shadow is rendered via `boxShadow` (CSS-style, fades with opacity).
On **Android API < 28**, `elevation` is used as fallback. Sub-item shadows are animated so they appear only when items are fully visible (avoids the Android material shadow "ghost" at opacity 0).

To customise the shadow, use the `shadowStyle` prop on `ActionButton.Item`. On old Android you can also control the elevation value this way:

```tsx
<ActionButton.Item shadowStyle={{ elevation: 6 }}>
```
