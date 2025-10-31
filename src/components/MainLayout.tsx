import React, { ReactNode, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

// ── SVG for the hamburger (you can replace with any icon) ─────────────────────
const hamburger = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// ── Sidebar content (customise as you wish) ───────────────────────────────────
const Sidebar = () => (
  <View style={styles.sidebar}>
    {/* Example menu items */}
    <TouchableOpacity style={styles.menuItem}>
      <SvgXml xml={hamburger} width={24} height={24} />
      <View style={styles.menuText}>Profile</View>
    </TouchableOpacity>
    {/* …add more items… */}
  </View>
);

// ── Main layout (Drawer + Header + children) ─────────────────────────────────
type MainLayoutProps = {
  children: ReactNode;
  title?: string;               // optional screen title
  showBack?: boolean;           // if you ever need a back button
};

export const MainLayout = ({ children, title, showBack }: MainLayoutProps) => {
  const navigation = useNavigation<any>();
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="slide"
      drawerStyle={styles.drawer}
      renderDrawerContent={Sidebar}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          {showBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <SvgXml xml={hamburger} width={24} height={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setOpen(true)}>
              <SvgXml xml={hamburger} width={24} height={24} />
            </TouchableOpacity>
          )}

          <View style={styles.titleContainer}>
            {/* You can pass a custom title prop or fallback to route name */}
            <View style={styles.title}>{title && <Text>{title}</Text>}</View>
          </View>

{/* 

at style <= 

No overload matches this call.
  Overload 1 of 2, '(props: ViewProps): View', gave the following error.
    Type '{ fontSize: number; fontWeight: "600"; }' is not assignable to type 'StyleProp<ViewStyle>'.
  Overload 2 of 2, '(props: ViewProps, context: any): View', gave the following error.
    Type '{ fontSize: number; fontWeight: "600"; }' is not assignable to type 'StyleProp<ViewStyle>'.ts(2769)
ViewPropTypes.d.ts(212, 3): The expected type comes from property 'style' which is declared here on type 'IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps>'
ViewPropTypes.d.ts(212, 3): The expected type comes from property 'style' which is declared here on type 'IntrinsicAttributes & IntrinsicClassAttributes<View> & Readonly<ViewProps>'
*/}
          <View style={styles.rightPlaceholder} />
        </View>

        {/* ── Screen content ── */}
        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleContainer: { flex: 1, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600' },
  rightPlaceholder: { width: 24 },
  drawer: { backgroundColor: '#f9f9f9', width: 280 },
  sidebar: { flex: 1, paddingTop: 40, paddingHorizontal: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  menuText: { marginLeft: 12, fontSize: 16 },
  content: { flex: 1 },
});