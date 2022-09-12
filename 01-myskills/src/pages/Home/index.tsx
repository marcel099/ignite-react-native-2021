import React, { useState } from 'react';
import {
  FlatList,
  Text, TextInput, View,
} from 'react-native';

import { Button } from '../../components/Button';
import { SkillCard } from '../../components/SkillCard';

import { styles } from './styles';

interface Skill {
  id: string;
  name: string;
}

export function Home() {
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');

  function handleAddNewSkill() {
    const skill = {
      id: String(new Date().getTime()),
      name: newSkill,
    }

    setNewSkill('');
    setMySkills((previousValue) => [...previousValue, skill]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(previousValue => previousValue.filter(
      skill => skill.id !== id
    ));
  }

  let greeting = ''; const
    currentHour = new Date().getHours();

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good night';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="welcome">
        Welcome, Rodrigo
      </Text>
      <Text style={styles.greeting}>
        { greeting }
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />

      <Button
        onPress={handleAddNewSkill}
        title="Add"
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  );
}
