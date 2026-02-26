import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Pressable,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TodoItem } from "../components/TodoItem";
import { Todo } from "../types/todo";

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setInputText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1">
        {/* Stats */}
        <View className="px-4 py-3 bg-indigo-50">
          <Text className="text-indigo-700 text-center">
            {totalCount === 0
              ? "タスクを追加してください"
              : `${completedCount} / ${totalCount} 完了`}
          </Text>
        </View>

        {/* Todo List */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center py-10">
              <Text className="text-gray-400 text-lg">タスクがありません</Text>
            </View>
          }
        />

        {/* Input Area */}
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex-row">
          <TextInput
            className="flex-1 bg-gray-100 px-4 py-3 rounded-lg mr-2 text-base"
            placeholder="新しいタスクを入力..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Pressable
            onPress={addTodo}
            className="bg-indigo-500 px-6 rounded-lg items-center justify-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text className="text-white font-bold text-base">追加</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
