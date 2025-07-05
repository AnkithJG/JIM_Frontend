import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CustomCalendar = ({ workoutDates = [], onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');

  // Sample workout dates - replace with your actual data
  const defaultWorkoutDates = [
    '2024-09-02',
    '2024-09-03', 
    '2024-09-05',
    '2024-09-09',
    '2024-09-12',
    '2024-09-16',
    '2024-09-19',
    '2024-09-23',
    '2024-09-26',
  ];

  const workoutDatesArray = workoutDates.length > 0 ? workoutDates : defaultWorkoutDates;

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (onDateSelect) {
      onDateSelect(new Date(day.dateString));
    }
  };

  // Function to get today's date in YYYY-MM-DD format
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Function to check if a date is in the past
  const isPastDate = (dateString) => {
    const today = getTodayString();
    return dateString < today;
  };

  // Create marked dates object
  const getMarkedDates = () => {
    const marked = {};
    const today = getTodayString();

    // Mark past dates first (that aren't workout dates)
    const currentDate = new Date();
    for (let i = 1; i <= 31; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      
      if (isPastDate(dateString) && !workoutDatesArray.includes(dateString)) {
        marked[dateString] = {
          customStyles: {
            container: {
              backgroundColor: '#6a2230',
              borderRadius: 16,
            },
            text: {
              color: '#FFFFFF',
            },
          },
        };
      }
    }

    // Mark workout dates (these will override past dates if they overlap)
    workoutDatesArray.forEach(dateString => {
      const isSelected = selectedDate === dateString;
      
      marked[dateString] = {
        customStyles: {
          container: {
            backgroundColor: '#4A90E2',
            borderRadius: 16,
            // Add border if selected
            ...(isSelected && {
              borderWidth: 3,
              borderColor: '#FFFFFF',
            }),
          },
          text: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
        },
      };
    });

    // Mark selected date (only if it's not a workout date)
    if (selectedDate && !workoutDatesArray.includes(selectedDate)) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        customStyles: {
          ...marked[selectedDate]?.customStyles,
          container: {
            ...marked[selectedDate]?.customStyles?.container,
            borderWidth: 2,
            borderColor: '#ff5b7a',
            backgroundColor: marked[selectedDate]?.customStyles?.container?.backgroundColor || '#ff5b7a',
          },
        },
      };
    }

    return marked;
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={getMarkedDates()}
        markingType={'custom'}
        
        // Theme customization
        theme={{
          calendarBackground: 'transparent',
          textSectionTitleColor: '#FFFFFF',
          textSectionTitleDisabledColor: '#FFFFFF',
          selectedDayBackgroundColor: '#ff5b7a',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#FFFFFF',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#FFFFFF',
          dotColor: '#FFFFFF',
          selectedDotColor: '#FFFFFF',
          arrowColor: '#FFFFFF',
          disabledArrowColor: '#FFFFFF',
          monthTextColor: '#FFFFFF',
          indicatorColor: '#FFFFFF',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        
        // Header styling
        renderHeader={(date) => {
          const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];
          
          return (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                {monthNames[date.getMonth()]} {date.getFullYear()}
              </Text>
            </View>
          );
        }}
        
        // Arrow customization
        renderArrow={(direction) => (
          <Text style={styles.arrowText}>
            {direction === 'left' ? '‹' : '›'}
          </Text>
        )}
        
        // Additional props
        firstDay={0} // Sunday as first day
        hideExtraDays={false}
        disableMonthChange={false}
        hideDayNames={false}
        showWeekNumbers={false}
        disableArrowLeft={false}
        disableArrowRight={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
  },
  headerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  arrowText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default CustomCalendar;