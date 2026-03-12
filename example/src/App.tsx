import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from '@nfsmonstr/react-native-action-button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Example</Text>

      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => {}}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => {}}
        >
          <Ionicons name="notifications-outline" size={20} color="#fff" />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => {}}
        >
          <Ionicons name="checkmark-done-outline" size={20} color="#fff" />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
