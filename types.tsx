export type RootStackParamList = {
  Root: undefined;
  ChatRoom: undefined;
  Contacts: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Status: undefined;
  Chats: undefined;
  Calls: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  status: String;
};

export type Message = {
  id: String;
  content: String;
  createdAt: String;
  user: User;
};

export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
};
