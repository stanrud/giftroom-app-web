import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: '#9ef9d3' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: '#9ef9d3',
    inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: '#555' },
  },
};
