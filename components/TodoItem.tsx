import { View, Text, Pressable } from "react-native";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View className="flex-row items-center bg-white p-4 mb-2 mx-4 rounded-lg shadow-sm">
      <Pressable
        onPress={() => onToggle(todo.id)}
        className="w-6 h-6 rounded-full border-2 border-indigo-500 mr-3 items-center justify-center"
        style={{
          backgroundColor: todo.completed ? "#4f46e5" : "transparent",
        }}
      >
        {todo.completed && <Text className="text-white text-xs">✓</Text>}
      </Pressable>

      <Text
        className={`flex-1 text-base ${
          todo.completed ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {todo.text}
      </Text>

      <Pressable
        onPress={() => onDelete(todo.id)}
        className="w-8 h-8 items-center justify-center"
      >
        <Text className="text-red-500 text-lg">×</Text>
      </Pressable>
    </View>
  );
}
