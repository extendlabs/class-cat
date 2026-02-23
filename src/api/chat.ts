export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  type: "place" | "instructor";
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "contact";
  text: string;
  time: string;
}

const MOCK_CONTACTS: ChatContact[] = [
  {
    id: "chat-1",
    name: "Studio Jogi Kazimierz",
    avatar:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop",
    type: "place",
    lastMessage: "Zapraszamy na poranne zajęcia!",
    lastMessageTime: "10:30",
    unread: 2,
  },
  {
    id: "chat-2",
    name: "Marco Rossi",
    avatar:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop&crop=face",
    type: "instructor",
    lastMessage: "Następne warsztaty w sobotę o 17:00",
    lastMessageTime: "Yesterday",
    unread: 0,
  },
  {
    id: "chat-3",
    name: "Kolektyw Sztuki Ruchu",
    avatar:
      "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=100&h=100&fit=crop",
    type: "place",
    lastMessage: "Dziękujemy za udział w zajęciach!",
    lastMessageTime: "Mon",
    unread: 0,
  },
  {
    id: "chat-4",
    name: "Aleksander Nowak",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    type: "instructor",
    lastMessage: "Turniej szachowy w przyszłym tygodniu",
    lastMessageTime: "Feb 15",
    unread: 1,
  },
  {
    id: "chat-5",
    name: "Fotoklub Kraków",
    avatar:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=100&h=100&fit=crop",
    type: "place",
    lastMessage: "Nowy spacer fotograficzny w marcu!",
    lastMessageTime: "Feb 12",
    unread: 0,
  },
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  "chat-1": [
    {
      id: "m1",
      sender: "contact",
      text: "Cześć! Dziękujemy za rezerwację porannej jogi.",
      time: "9:00",
    },
    {
      id: "m2",
      sender: "user",
      text: "Dzięki! Czy mogę zmienić godzinę na 8:00?",
      time: "9:15",
    },
    {
      id: "m3",
      sender: "contact",
      text: "Oczywiście, zmieniliśmy rezerwację. Do zobaczenia!",
      time: "9:22",
    },
    {
      id: "m4",
      sender: "contact",
      text: "Zapraszamy na poranne zajęcia!",
      time: "10:30",
    },
  ],
  "chat-2": [
    {
      id: "m1",
      sender: "user",
      text: "Cześć Marco! Kiedy będą następne warsztaty?",
      time: "14:00",
    },
    {
      id: "m2",
      sender: "contact",
      text: "Ciao! Planujemy warsztaty z focaccią.",
      time: "14:30",
    },
    {
      id: "m3",
      sender: "contact",
      text: "Następne warsztaty w sobotę o 17:00",
      time: "14:32",
    },
  ],
  "chat-3": [
    {
      id: "m1",
      sender: "contact",
      text: "Dziękujemy za udział w zajęciach tańca współczesnego!",
      time: "16:00",
    },
    {
      id: "m2",
      sender: "user",
      text: "Było super! Kiedy następne zajęcia?",
      time: "16:20",
    },
    {
      id: "m3",
      sender: "contact",
      text: "Dziękujemy za udział w zajęciach!",
      time: "16:25",
    },
  ],
  "chat-4": [
    {
      id: "m1",
      sender: "contact",
      text: "Witam! Mam nadzieję, że przygotowania do turnieju idą dobrze.",
      time: "11:00",
    },
    {
      id: "m2",
      sender: "user",
      text: "Tak, ćwiczę codziennie! Jaki będzie format?",
      time: "11:15",
    },
    {
      id: "m3",
      sender: "contact",
      text: "Turniej szachowy w przyszłym tygodniu",
      time: "11:20",
    },
  ],
  "chat-5": [
    {
      id: "m1",
      sender: "user",
      text: "Czy planujecie nowe spacery fotograficzne?",
      time: "10:00",
    },
    {
      id: "m2",
      sender: "contact",
      text: "Nowy spacer fotograficzny w marcu!",
      time: "10:45",
    },
  ],
};

export interface NewContactResult {
  id: string;
  name: string;
  avatar: string;
  type: "place" | "instructor";
}

const DISCOVERABLE_CONTACTS: NewContactResult[] = [
  {
    id: "new-1",
    name: "GlinArt Poznań",
    avatar:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=100&h=100&fit=crop",
    type: "place",
  },
  {
    id: "new-2",
    name: "Szkoła Tańca Salsa Kraków",
    avatar:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=100&h=100&fit=crop",
    type: "place",
  },
  {
    id: "new-3",
    name: "Ewa Kowalska",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    type: "instructor",
  },
  {
    id: "new-4",
    name: "Centrum Języków Obcych",
    avatar:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop",
    type: "place",
  },
  {
    id: "new-5",
    name: "Paweł Zieliński",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    type: "instructor",
  },
  {
    id: "new-6",
    name: "Studio Muzyczne Harmonia",
    avatar:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop",
    type: "place",
  },
];

export async function searchNewContacts(
  query: string
): Promise<NewContactResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  if (!query.trim()) return DISCOVERABLE_CONTACTS;
  const q = query.toLowerCase();
  return DISCOVERABLE_CONTACTS.filter((c) => c.name.toLowerCase().includes(q));
}

export async function fetchChatContacts(): Promise<ChatContact[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_CONTACTS;
}

export async function fetchChatMessages(
  contactId: string
): Promise<ChatMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_MESSAGES[contactId] ?? [];
}
