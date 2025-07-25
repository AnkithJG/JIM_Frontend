import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const Workout = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('main'); // main, workouts, exercises, presets, create
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [presets, setPresets] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createType, setCreateType] = useState(''); // workout, exercise, preset

  // Animation values
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);

  useEffect(() => {
    // Entrance animation
    fadeAnim.value = withTiming(1, { duration: 300 });
    slideAnim.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) });
    
    // Load data
    loadWorkouts();
    loadExercises();
    loadPresets();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  const loadWorkouts = async () => {
    // Mock data - replace with actual API calls
    setWorkouts([
      { id: 1, title: 'Morning Push', started_at: '2025-01-20', ended_at: null, preset_id: 1 },
      { id: 2, title: 'Evening Cardio', started_at: '2025-01-19', ended_at: '2025-01-19', preset_id: null },
    ]);
  };

  const loadExercises = async () => {
    // Mock data - replace with actual API calls
    setExercises([
      { id: 1, name: 'Push-ups', category: 'Chest', sets: 3, reps: 12 },
      { id: 2, name: 'Squats', category: 'Legs', sets: 4, reps: 15 },
      { id: 3, name: 'Pull-ups', category: 'Back', sets: 3, reps: 8 },
    ]);
  };

  const loadPresets = async () => {
    // Mock data - replace with actual API calls
    setPresets([
      { id: 1, title: 'Upper Body Blast', workout_id: null, created_at: '2025-01-15' },
      { id: 2, title: 'Leg Day Special', workout_id: null, created_at: '2025-01-14' },
    ]);
  };

  const MainMenu = () => (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fitness Hub</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => setCurrentView('workouts')}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="fitness" size={40} color="#fff" />
            </View>
            <Text style={styles.menuCardTitle}>Workouts</Text>
            <Text style={styles.menuCardSubtitle}>View & manage your workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => setCurrentView('exercises')}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="barbell" size={40} color="#fff" />
            </View>
            <Text style={styles.menuCardTitle}>Exercises</Text>
            <Text style={styles.menuCardSubtitle}>Browse exercise library</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => setCurrentView('presets')}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="bookmark" size={40} color="#fff" />
            </View>
            <Text style={styles.menuCardTitle}>Presets</Text>
            <Text style={styles.menuCardSubtitle}>Saved workout templates</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => {
              setCreateType('workout');
              setIsCreateModalVisible(true);
            }}
          >
            <View style={styles.menuIconContainer}>
              <Icon name="add-circle" size={40} color="#fff" />
            </View>
            <Text style={styles.menuCardTitle}>Quick Start</Text>
            <Text style={styles.menuCardSubtitle}>Start a new workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );

  const WorkoutsList = () => (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Workouts</Text>
        <TouchableOpacity 
          onPress={() => {
            setCreateType('workout');
            setIsCreateModalVisible(true);
          }}
          style={styles.addButton}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {workouts.map((workout) => (
          <TouchableOpacity 
            key={workout.id} 
            style={styles.listItem}
            onPress={() => setSelectedWorkout(workout)}
          >
            <View style={styles.listItemContent}>
              <View style={styles.listItemIcon}>
                <Icon 
                  name={workout.ended_at ? "checkmark-circle" : "play-circle"} 
                  size={30} 
                  color="#fff" 
                />
              </View>
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>
                  {workout.title || `Workout #${workout.id}`}
                </Text>
                <Text style={styles.listItemSubtitle}>
                  {new Date(workout.started_at).toLocaleDateString()}
                  {workout.ended_at ? ' • Completed' : ' • In Progress'}
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const ExercisesList = () => (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercises</Text>
        <TouchableOpacity 
          onPress={() => {
            setCreateType('exercise');
            setIsCreateModalVisible(true);
          }}
          style={styles.addButton}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {exercises.map((exercise) => (
          <TouchableOpacity key={exercise.id} style={styles.listItem}>
            <View style={styles.listItemContent}>
              <View style={styles.listItemIcon}>
                <Icon name="barbell" size={30} color="#fff" />
              </View>
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{exercise.name}</Text>
                <Text style={styles.listItemSubtitle}>
                  {exercise.category} • {exercise.sets} sets × {exercise.reps} reps
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const PresetsList = () => (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Presets</Text>
        <TouchableOpacity 
          onPress={() => {
            setCreateType('preset');
            setIsCreateModalVisible(true);
          }}
          style={styles.addButton}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {presets.map((preset) => (
          <TouchableOpacity key={preset.id} style={styles.listItem}>
            <View style={styles.listItemContent}>
              <View style={styles.listItemIcon}>
                <Icon name="bookmark" size={30} color="#fff" />
              </View>
              <View style={styles.listItemText}>
                <Text style={styles.listItemTitle}>{preset.title}</Text>
                <Text style={styles.listItemSubtitle}>
                  Created {new Date(preset.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const CreateModal = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const handleCreate = () => {
      if (!title.trim()) {
        Alert.alert('Error', 'Please enter a title');
        return;
      }

      // Handle creation based on type
      switch (createType) {
        case 'workout':
          // Create workout logic here
          Alert.alert('Success', 'Workout created!');
          break;
        case 'exercise':
          if (!category.trim()) {
            Alert.alert('Error', 'Please enter a category');
            return;
          }
          // Create exercise logic here
          Alert.alert('Success', 'Exercise created!');
          break;
        case 'preset':
          // Create preset logic here
          Alert.alert('Success', 'Preset created!');
          break;
      }

      setIsCreateModalVisible(false);
      setTitle('');
      setCategory('');
      setSets('');
      setReps('');
    };

    return (
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Create New {createType.charAt(0).toUpperCase() + createType.slice(1)}
              </Text>
              <TouchableOpacity 
                onPress={() => setIsCreateModalVisible(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  {createType === 'exercise' ? 'Exercise Name' : 'Title'}
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder={`Enter ${createType} ${createType === 'exercise' ? 'name' : 'title'}`}
                  placeholderTextColor="#rgba(255,255,255,0.7)"
                />
              </View>

              {createType === 'exercise' && (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Category</Text>
                    <TextInput
                      style={styles.textInput}
                      value={category}
                      onChangeText={setCategory}
                      placeholder="Enter category (e.g., Chest, Legs)"
                      placeholderTextColor="#rgba(255,255,255,0.7)"
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Sets</Text>
                      <TextInput
                        style={styles.textInput}
                        value={sets}
                        onChangeText={setSets}
                        placeholder="3"
                        keyboardType="numeric"
                        placeholderTextColor="#rgba(255,255,255,0.7)"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Reps</Text>
                      <TextInput
                        style={styles.textInput}
                        value={reps}
                        onChangeText={setReps}
                        placeholder="12"
                        keyboardType="numeric"
                        placeholderTextColor="#rgba(255,255,255,0.7)"
                      />
                    </View>
                  </View>
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsCreateModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleCreate}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'workouts':
        return <WorkoutsList />;
      case 'exercises':
        return <ExercisesList />;
      case 'presets':
        return <PresetsList />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderCurrentView()}
      <CreateModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ff5b7a',
  },
  container: {
    flex: 1,
    backgroundColor: '#ff5b7a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c13e58',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c13e58',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#c13e58',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6a2230',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  menuCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  menuCardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#c13e58',
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  listItemIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6a2230',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  listItemText: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  listItemSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#c13e58',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalCloseButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6a2230',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#6a2230',
    borderRadius: 40,
    padding: 15,
    fontSize: 16,
    color: '#fff',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  cancelButton: {
    width: 100,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#6a2230',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButton: {
    width: 100,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#279CF6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Workout;