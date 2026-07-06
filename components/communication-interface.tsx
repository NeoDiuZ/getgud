'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Utensils, Users, Droplets, Navigation, Sun, Moon, WifiOff, HelpCircle, Brain, Plus, X, Globe, Heart, Home, Star, Car, Phone, Music, Coffee, Bed, Sun as SunIcon, Zap, Camera, Gift, Clock, MapPin, Thermometer, Mic, MessageCircle, Play, Bus, Bike, Plane, Key, Building2, Stethoscope, Users2, Briefcase, GraduationCap, Dumbbell, Pill, Frown, Smile, CloudRain, AlertTriangle, Activity, GamepadIcon, Monitor } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  lightColor: string;
  soundFile: string;
}

// Language types
type Language = 'en' | 'ms' | 'ta' | 'zh';

// Translation interface
interface Translations {
  en: {
    appTitle: string;
    connected: string;
    disconnected: string;
    connecting: string;
    menuActive: string;
    connect: string;
    disconnect: string;
    mainTitle: string;
    subtitle: string;
    addCard: string;
    food: string;
    help: string;
    outing: string;
    television: string;
    washroom: string;
    water: string;
    addCommunicationCard: string;
    cardName: string;
    chooseIcon: string;
    cancel: string;
    addCardButton: string;
    pleaseConnect: string;
    enterLabel: string;
    bluetoothNotSupported: string;
    connectionFailed: string;
    language: string;
  };
  ms: {
    appTitle: string;
    connected: string;
    disconnected: string;
    connecting: string;
    menuActive: string;
    connect: string;
    disconnect: string;
    mainTitle: string;
    subtitle: string;
    addCard: string;
    food: string;
    help: string;
    outing: string;
    television: string;
    washroom: string;
    water: string;
    addCommunicationCard: string;
    cardName: string;
    chooseIcon: string;
    cancel: string;
    addCardButton: string;
    pleaseConnect: string;
    enterLabel: string;
    bluetoothNotSupported: string;
    connectionFailed: string;
    language: string;
  };
  ta: {
    appTitle: string;
    connected: string;
    disconnected: string;
    connecting: string;
    menuActive: string;
    connect: string;
    disconnect: string;
    mainTitle: string;
    subtitle: string;
    addCard: string;
    food: string;
    help: string;
    outing: string;
    television: string;
    washroom: string;
    water: string;
    addCommunicationCard: string;
    cardName: string;
    chooseIcon: string;
    cancel: string;
    addCardButton: string;
    pleaseConnect: string;
    enterLabel: string;
    bluetoothNotSupported: string;
    connectionFailed: string;
    language: string;
  };
  zh: {
    appTitle: string;
    connected: string;
    disconnected: string;
    connecting: string;
    menuActive: string;
    connect: string;
    disconnect: string;
    mainTitle: string;
    subtitle: string;
    addCard: string;
    food: string;
    help: string;
    outing: string;
    television: string;
    washroom: string;
    water: string;
    addCommunicationCard: string;
    cardName: string;
    chooseIcon: string;
    cancel: string;
    addCardButton: string;
    pleaseConnect: string;
    enterLabel: string;
    bluetoothNotSupported: string;
    connectionFailed: string;
    language: string;
  };
}

// Translation data
const translations: Translations = {
  en: {
    appTitle: "Neural Drive",
    connected: "Connected",
    disconnected: "Disconnected",
    connecting: "Connecting...",
    menuActive: "Menu Active",
    connect: "Connect",
    disconnect: "Disconnect",
    mainTitle: "Neural Communication Interface",
    subtitle: "Express your needs through neural signals with instant audio feedback",
    addCard: "Add Communication Card",
    food: "Food",
    help: "Help",
    outing: "Outing",
    television: "Television",
    washroom: "Washroom",
    water: "Water",
    addCommunicationCard: "Add Communication Card",
    cardName: "Card name...",
    chooseIcon: "Choose an icon:",
    cancel: "Cancel",
    addCardButton: "Add Card",
    pleaseConnect: "Please connect to NeuralHelp first!",
    enterLabel: "Please enter a label for the card",
    bluetoothNotSupported: "Web Bluetooth not supported",
    connectionFailed: "Connection failed",
    language: "Language"
  },
  ms: {
    appTitle: "Neural Drive",
    connected: "Disambung",
    disconnected: "Terputus",
    connecting: "Menyambung...",
    menuActive: "Menu Aktif",
    connect: "Sambung",
    disconnect: "Putus",
    mainTitle: "Antara Muka Komunikasi Neural",
    subtitle: "Luahkan keperluan anda melalui isyarat neural dengan maklum balas audio segera",
    addCard: "Tambah Kad Komunikasi",
    food: "Makanan",
    help: "Bantuan",
    outing: "Keluar",
    television: "Televisyen",
    washroom: "Bilik Air",
    water: "Air",
    addCommunicationCard: "Tambah Kad Komunikasi",
    cardName: "Nama kad...",
    chooseIcon: "Pilih ikon:",
    cancel: "Batal",
    addCardButton: "Tambah Kad",
    pleaseConnect: "Sila sambung ke NeuralHelp terlebih dahulu!",
    enterLabel: "Sila masukkan label untuk kad",
    bluetoothNotSupported: "Web Bluetooth tidak disokong",
    connectionFailed: "Sambungan gagal",
    language: "Bahasa"
  },
  ta: {
    appTitle: "Neural Drive",
    connected: "இணைக்கப்பட்டது",
    disconnected: "தொடர்பு துண்டிக்கப்பட்டது",
    connecting: "இணைக்கிறது...",
    menuActive: "மெனு செயலில்",
    connect: "இணை",
    disconnect: "துண்டி",
    mainTitle: "நரம்பு தொடர்பு இடைமுகம்",
    subtitle: "நரம்பு சமிக்ஞைகள் மூலம் உங்கள் தேவைகளை உடனடி ஆடியோ பின்னூட்டத்துடன் வெளிப்படுத்துங்கள்",
    addCard: "தொடர்பு அட்டை சேர்",
    food: "உணவு",
    help: "உதவி",
    outing: "வெளியே செல்",
    television: "தொலைக்காட்சி",
    washroom: "கழிப்பறை",
    water: "தண்ணீர்",
    addCommunicationCard: "தொடர்பு அட்டை சேர்",
    cardName: "அட்டையின் பெயர்...",
    chooseIcon: "ஒரு ஐகான் தேர்வு:",
    cancel: "ரத்து",
    addCardButton: "அட்டை சேர்",
    pleaseConnect: "முதலில் NeuralHelp உடன் இணைக்கவும்!",
    enterLabel: "அட்டைக்கு ஒரு லேபிள் உள்ளிடவும்",
    bluetoothNotSupported: "வெப் புளூடூத் ஆதரிக்கப்படவில்லை",
    connectionFailed: "இணைப்பு தோல்வி",
    language: "மொழி"
  },
  zh: {
    appTitle: "神经驱动",
    connected: "已连接",
    disconnected: "已断开",
    connecting: "连接中...",
    menuActive: "菜单激活",
    connect: "连接",
    disconnect: "断开",
    mainTitle: "神经通信界面",
    subtitle: "通过神经信号表达您的需求，获得即时音频反馈",
    addCard: "添加通信卡",
    food: "食物",
    help: "帮助",
    outing: "外出",
    television: "电视",
    washroom: "洗手间",
    water: "水",
    addCommunicationCard: "添加通信卡",
    cardName: "卡片名称...",
    chooseIcon: "选择图标:",
    cancel: "取消",
    addCardButton: "添加卡片",
    pleaseConnect: "请先连接到NeuralHelp!",
    enterLabel: "请为卡片输入标签",
    bluetoothNotSupported: "不支持Web蓝牙",
    connectionFailed: "连接失败",
    language: "语言"
  }
};

// Language options
const languageOptions = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ms' as Language, name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ta' as Language, name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' }
];

// Define types for Bluetooth objects
interface BluetoothDevice extends EventTarget {
  gatt?: BluetoothRemoteGATTServer;
}
declare global {
  interface Navigator {
    bluetooth: {
      requestDevice(options: {
        filters: Array<{ name?: string }>;
        optionalServices?: string[];
      }): Promise<BluetoothDevice>;
    };
  }
}
interface BluetoothRemoteGATTServer {
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  connected: boolean;
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic extends EventTarget {
  startNotifications(): Promise<void>;
  stopNotifications(): Promise<void>;
  readValue(): Promise<DataView>;
  value?: DataView;
}

const CommunicationInterface: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('neuralDriveLanguage') as Language;
    if (savedLanguage && languageOptions.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('neuralDriveLanguage', currentLanguage);
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [menuActive, setMenuActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const connectedDeviceRef = useRef<BluetoothDevice | null>(null);

  // Get current translations
  const t = translations[currentLanguage];

  // Default options - now with multilingual support
  const getDefaultOptions = useCallback((): Option[] => [
    {
      id: 'food',
      label: t.food,
      icon: <Utensils size={40} strokeWidth={1.5} />,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-400',
      soundFile: 'food.mp3'
    },
    {
      id: 'help',
      label: t.help,
      icon: <HelpCircle size={40} strokeWidth={1.5} />,
      color: 'bg-red-500',
      lightColor: 'bg-red-400',
      soundFile: 'help.mp3'
    },
    {
      id: 'outing',
      label: t.outing,
      icon: <Users size={40} strokeWidth={1.5} />,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-400',
      soundFile: 'outing.mp3'
    },
    {
      id: 'television',
      label: t.television,
      icon: <Monitor size={40} strokeWidth={1.5} />,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-400',
      soundFile: 'television.mp3'
    },
    {
      id: 'washroom',
      label: t.washroom,
      icon: <Navigation size={40} strokeWidth={1.5} />,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-400',
      soundFile: 'washroom.mp3'
    },
    {
      id: 'water',
      label: t.water,
      icon: <Droplets size={40} strokeWidth={1.5} />,
      color: 'bg-cyan-500',
      lightColor: 'bg-cyan-400',
      soundFile: 'water.mp3'
    }
  ], [t]);

  // Dynamic options state
  const [options, setOptions] = useState<Option[]>([]);

  // Update options when language changes
  useEffect(() => {
    const defaultOptions = getDefaultOptions();
    setOptions(prev => {
      // Update default cards with new translations, keep custom cards
      const customCards = prev.filter(option => option.id.startsWith('custom-'));
      return [...defaultOptions, ...customCards];
    });
  }, [getDefaultOptions]);

  // Available icons for new cards
  const availableIcons = [
    // Basic needs
    { name: 'Food', icon: <Utensils size={40} strokeWidth={1.5} /> },
    { name: 'Water', icon: <Droplets size={40} strokeWidth={1.5} /> },
    { name: 'Coffee', icon: <Coffee size={40} strokeWidth={1.5} /> },
    { name: 'Help', icon: <HelpCircle size={40} strokeWidth={1.5} /> },
    
    // People & Social
    { name: 'People', icon: <Users size={40} strokeWidth={1.5} /> },
    { name: 'Family', icon: <Users2 size={40} strokeWidth={1.5} /> },
    { name: 'Doctor', icon: <Stethoscope size={40} strokeWidth={1.5} /> },
    { name: 'Phone', icon: <Phone size={40} strokeWidth={1.5} /> },
    { name: 'Message', icon: <MessageCircle size={40} strokeWidth={1.5} /> },
    { name: 'Speak', icon: <Mic size={40} strokeWidth={1.5} /> },
    
    // Places
    { name: 'Home', icon: <Home size={40} strokeWidth={1.5} /> },
    { name: 'Hospital', icon: <Building2 size={40} strokeWidth={1.5} /> },
    { name: 'Location', icon: <MapPin size={40} strokeWidth={1.5} /> },
    
    // Transportation
    { name: 'Car', icon: <Car size={40} strokeWidth={1.5} /> },
    { name: 'Plane', icon: <Plane size={40} strokeWidth={1.5} /> },
    { name: 'Bus', icon: <Bus size={40} strokeWidth={1.5} /> },
    { name: 'Bike', icon: <Bike size={40} strokeWidth={1.5} /> },
    
    // Health & Emotions
    { name: 'Medicine', icon: <Pill size={40} strokeWidth={1.5} /> },
    { name: 'Pain', icon: <Frown size={40} strokeWidth={1.5} /> },
    { name: 'Happy', icon: <Smile size={40} strokeWidth={1.5} /> },
    { name: 'Sad', icon: <Frown size={40} strokeWidth={1.5} /> },
    { name: 'Tired', icon: <Activity size={40} strokeWidth={1.5} /> },
    
    // Activities
    { name: 'Sleep', icon: <Bed size={40} strokeWidth={1.5} /> },
    { name: 'Work', icon: <Briefcase size={40} strokeWidth={1.5} /> },
    { name: 'Study', icon: <GraduationCap size={40} strokeWidth={1.5} /> },
    { name: 'Exercise', icon: <Dumbbell size={40} strokeWidth={1.5} /> },
    { name: 'Music', icon: <Music size={40} strokeWidth={1.5} /> },
    { name: 'Game', icon: <GamepadIcon size={40} strokeWidth={1.5} /> },
    { name: 'Play', icon: <Play size={40} strokeWidth={1.5} /> },
    { name: 'Television', icon: <Monitor size={40} strokeWidth={1.5} /> },
    
    // Objects & Tools
    { name: 'Clock', icon: <Clock size={40} strokeWidth={1.5} /> },
    { name: 'Key', icon: <Key size={40} strokeWidth={1.5} /> },
    { name: 'Camera', icon: <Camera size={40} strokeWidth={1.5} /> },
    { name: 'Gift', icon: <Gift size={40} strokeWidth={1.5} /> },
    
    // Weather & Environment
    { name: 'Sun', icon: <SunIcon size={40} strokeWidth={1.5} /> },
    { name: 'Cold', icon: <CloudRain size={40} strokeWidth={1.5} /> },
    { name: 'Rain', icon: <CloudRain size={40} strokeWidth={1.5} /> },
    { name: 'Temperature', icon: <Thermometer size={40} strokeWidth={1.5} /> },
    
    // Generic/Important
    { name: 'Heart', icon: <Heart size={40} strokeWidth={1.5} /> },
    { name: 'Star', icon: <Star size={40} strokeWidth={1.5} /> },
    { name: 'Emergency', icon: <Zap size={40} strokeWidth={1.5} /> },
    { name: 'Important', icon: <AlertTriangle size={40} strokeWidth={1.5} /> }
  ];

  const playSound = useCallback((soundFile: string) => {
    try {
      const audio = new Audio(`./sounds/${soundFile}`);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } catch (error) {
      console.log('Audio creation failed:', error);
    }
  }, []);

  const handleNotifications = useCallback((event: Event) => {
    const target = event.target as BluetoothRemoteGATTCharacteristic;
    const value = target.value;
    if (!value) return;

    const data = new Uint8Array(value.buffer);

    if (data.length === 1) {
      if (data[0] === 0) {
        setMenuActive(true);
        setCurrentMenuIndex(1);
        setActiveSelection(null);
      } else if (data[0] === 127) {
        setMenuActive(false);
        setCurrentMenuIndex(0);
        setActiveSelection(null);
      }
    } else if (data.length === 2) {
      if (data[0] === 'S'.charCodeAt(0)) {
        const newIndex = data[1];
        setMenuActive(true);
        setCurrentMenuIndex(newIndex);
        setActiveSelection(null);
      } else if (data[0] === 'A'.charCodeAt(0)) {
        const selectedIndex = data[1];
        // Make sure we don't exceed the current options array length
        if (selectedIndex > 0 && selectedIndex <= options.length) {
          const optionId = options[selectedIndex - 1].id;
          setSelectedOption(optionId);
          setActiveSelection(optionId);
          playSound(options[selectedIndex - 1].soundFile);
          setTimeout(() => {
            setActiveSelection(null);
          }, 3000);
        }
      }
    }
  }, [options, playSound]); // Add options to dependency array

  useEffect(() => {
    if (menuActive && currentMenuIndex > 0 && currentMenuIndex <= options.length) {
      const optionId = options[currentMenuIndex - 1].id;
      setSelectedOption(optionId);
      playSound("select.mp3");
    } else if (!menuActive) {
      setSelectedOption(null);
    }
  }, [currentMenuIndex, menuActive, options, playSound]); // Add options to dependency array

  const handleDisconnection = useCallback(() => {
    setIsConnected(false);
    setMenuActive(false);
    setCurrentMenuIndex(0);
  }, []);

  const connectToDevice = useCallback(async () => {
    try {
      setIsConnecting(true);
      setConnectionError(null);

      if (!navigator.bluetooth || !navigator.bluetooth.requestDevice) {
        throw new Error(t.bluetoothNotSupported);
      }

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'ESP32C6_EEG' }],
        optionalServices: ['6910123a-eb0d-4c35-9a60-bebe1dcb549d']
      }) as BluetoothDevice;

      connectedDeviceRef.current = device;

      if (!device.gatt) {
        throw new Error('Bluetooth device does not support GATT');
      }

      device.addEventListener('gattserverdisconnected', handleDisconnection);

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('6910123a-eb0d-4c35-9a60-bebe1dcb549d');
      const characteristic = await service.getCharacteristic('5f4f1107-7fc1-43b2-a540-0aa1a9f1ce78');

      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleNotifications);

      setIsConnected(true);
      setIsConnecting(false);

      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnecting(false);
      setIsConnected(false);
      setConnectionError(error instanceof Error ? error.message : t.connectionFailed);
      return false;
    }
  }, [handleNotifications, handleDisconnection, t]);

  const disconnectDevice = useCallback(async () => {
    try {
      if (!connectedDeviceRef.current) {
        return;
      }

      const server = connectedDeviceRef.current.gatt;
      if (!server) {
        return;
      }

      if (!server.connected) {
        connectedDeviceRef.current = null;
        setIsConnected(false);
        return;
      }

      const service = await server.getPrimaryService("6910123a-eb0d-4c35-9a60-bebe1dcb549d");
      const dataChar = await service.getCharacteristic("5f4f1107-7fc1-43b2-a540-0aa1a9f1ce78");

      await dataChar.stopNotifications();
      dataChar.removeEventListener("characteristicvaluechanged", handleNotifications);

      server.disconnect();
    } catch (error) {
      console.error("Error during disconnection:", error);
    } finally {
      setIsConnected(false);
      setIsConnecting(false);
      setMenuActive(false);
      setCurrentMenuIndex(0);
    }
  }, [handleNotifications]);

  const toggleConnection = async () => {
    if (isConnected) {
      disconnectDevice();
    } else {
      await connectToDevice();
    }
  };

  const handleOptionClick = (option: Option) => {
    if (!isConnected) {
      alert(t.pleaseConnect);
      return;
    }

    setSelectedOption(selectedOption === option.id ? null : option.id);
    playSound(option.soundFile);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Language selection handler
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setShowLanguageDropdown(false);
  };

  // Add new card functionality
  const addNewCard = (newCard: Omit<Option, 'id'>) => {
    const id = `custom-${Date.now()}`;
    const cardWithId: Option = { ...newCard, id };
    setOptions(prev => [...prev, cardWithId]);
    setShowAddCard(false);
  };

  // Remove card functionality
  const removeCard = (cardId: string) => {
    setOptions(prev => prev.filter(option => option.id !== cardId));
    // Reset selection if the removed card was selected
    if (selectedOption === cardId) {
      setSelectedOption(null);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-sm sticky top-0 z-50 ${isDarkMode ? 'border-gray-700 bg-slate-900/80' : 'border-gray-200 bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.appTitle}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg border ${
                isConnected 
                  ? 'border-green-400 bg-green-50 text-green-700' 
                  : isDarkMode 
                    ? 'border-red-400 bg-red-950 text-red-400'
                    : 'border-red-400 bg-red-50 text-red-700'
              }`}>
                <div className="relative">
                  {isConnected ? (
                    <WifiOff size={16} className="text-green-500" />
                  ) : isConnecting ? (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <WifiOff size={16} className="text-red-400" />
                  )}
                </div>
                <span className="font-medium text-sm">
                  {isConnected ? t.connected : isConnecting ? t.connecting : t.disconnected}
                </span>
                {menuActive && (
                  <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                    {t.menuActive}
                  </span>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <Globe size={16} />
                  <span className="text-sm">{languageOptions.find(lang => lang.code === currentLanguage)?.flag}</span>
                  <span className="text-xs">▼</span>
                </button>

                {showLanguageDropdown && (
                  <div className={`absolute top-full right-0 mt-2 min-w-48 rounded-lg border shadow-lg z-50 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-white border-gray-200'
                  }`}>
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:transition-all ${
                          currentLanguage === lang.code
                            ? isDarkMode 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-blue-50 text-blue-700'
                            : isDarkMode 
                              ? 'hover:bg-gray-700 text-gray-200' 
                              : 'hover:bg-gray-50 text-gray-900'
                        } ${lang === languageOptions[0] ? 'rounded-t-lg' : ''} ${lang === languageOptions[languageOptions.length - 1] ? 'rounded-b-lg' : ''}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Connect Button */}
              <button
                onClick={toggleConnection}
                disabled={isConnecting}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isConnected
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${isConnecting ? 'opacity-75' : ''}`}
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">↻</span>
                    {t.connecting}
                  </span>
                ) : isConnected ? (
                  t.disconnect
                ) : (
                  t.connect
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Click outside to close language dropdown */}
      {showLanguageDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}

      {/* Main Interface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.mainTitle}
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.subtitle}
          </p>
        </div>

        {connectionError && (
          <div className="mb-6 text-center">
            <div className="inline-block bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {connectionError}
            </div>
          </div>
        )}

        {/* Add Card Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowAddCard(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            <Plus size={20} />
            <span>{t.addCard}</span>
          </button>
        </div>

        {/* Communication Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const isCurrentMenuOption = menuActive && currentMenuIndex === index + 1;
            const isCustomCard = option.id.startsWith('custom-');

            return (
              <div
                key={option.id}
                className={`
                  relative group cursor-pointer transition-all duration-300 transform
                  ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}
                  hover:scale-105 hover:shadow-lg rounded-xl p-6 border-2
                  ${isSelected ? 'border-green-400 bg-green-50' : ''}
                  ${isCurrentMenuOption ? 'ring-4 ring-purple-400/50' : ''}
                  ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}
                  ${activeSelection === option.id ? '!bg-green-500/30 border-green-400 scale-105' : ''}
                `}
              >
                {/* Remove button for custom cards */}
                {isCustomCard && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCard(option.id);
                    }}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X size={14} />
                  </button>
                )}

                <div onClick={() => handleOptionClick(option)} className="flex flex-col items-center space-y-4">
                  <div className={`
                    p-4 rounded-lg transition-all duration-300 group-hover:scale-110
                    ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}
                    ${isSelected ? 'bg-green-100' : ''}
                    ${isCurrentMenuOption ? 'bg-purple-100' : ''}
                  `}>
                    <div className={`transition-all duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-700'
                    } ${isSelected ? 'text-green-600' : ''} ${isCurrentMenuOption ? 'text-purple-600' : ''}`}>
                      {option.icon}
                    </div>
                  </div>

                  <h3 className={`text-lg font-semibold text-center transition-all duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  } ${isSelected ? 'text-green-600' : ''} ${isCurrentMenuOption ? 'text-purple-600' : ''}`}>
                    {option.label}
                  </h3>

                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}

                  {isCurrentMenuOption && !isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Add Card Modal */}
      {showAddCard && (
        <AddCardModal
          isDarkMode={isDarkMode}
          availableIcons={availableIcons}
          onSave={addNewCard}
          onCancel={() => setShowAddCard(false)}
          translations={t}
        />
      )}
    </div>
  );
};

// Add Card Modal Component
interface AddCardModalProps {
  isDarkMode: boolean;
  availableIcons: Array<{ name: string; icon: React.ReactNode }>;
  onSave: (card: Omit<Option, 'id'>) => void;
  onCancel: () => void;
  translations: Translations['en'];
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  isDarkMode,
  availableIcons,
  onSave,
  onCancel,
  translations: t
}) => {
  const [label, setLabel] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Categorize icons
  const iconCategories = {
    all: { name: 'All', icons: availableIcons },
    basic: { 
      name: 'Basic Needs', 
      icons: availableIcons.filter(icon => 
        ['Food', 'Water', 'Coffee', 'Help'].includes(icon.name)
      )
    },
    people: { 
      name: 'People & Social', 
      icons: availableIcons.filter(icon => 
        ['People', 'Family', 'Doctor', 'Phone', 'Message', 'Speak'].includes(icon.name)
      )
    },
    places: { 
      name: 'Places', 
      icons: availableIcons.filter(icon => 
        ['Home', 'Hospital', 'Location'].includes(icon.name)
      )
    },
    transport: { 
      name: 'Transport', 
      icons: availableIcons.filter(icon => 
        ['Car', 'Plane', 'Bus', 'Bike'].includes(icon.name)
      )
    },
    health: { 
      name: 'Health & Emotions', 
      icons: availableIcons.filter(icon => 
        ['Medicine', 'Pain', 'Happy', 'Sad', 'Tired'].includes(icon.name)
      )
    },
    activities: { 
      name: 'Activities', 
      icons: availableIcons.filter(icon => 
        ['Sleep', 'Work', 'Study', 'Exercise', 'Music', 'Game', 'Play', 'Television'].includes(icon.name)
      )
    },
    objects: { 
      name: 'Objects & Tools', 
      icons: availableIcons.filter(icon => 
        ['Clock', 'Key', 'Camera', 'Gift'].includes(icon.name)
      )
    },
    weather: { 
      name: 'Weather & Environment', 
      icons: availableIcons.filter(icon => 
        ['Sun', 'Cold', 'Rain', 'Temperature'].includes(icon.name)
      )
    },
    important: { 
      name: 'Important', 
      icons: availableIcons.filter(icon => 
        ['Heart', 'Star', 'Emergency', 'Important'].includes(icon.name)
      )
    }
  };

  type CategoryKey = keyof typeof iconCategories;

  // Filter icons based on search and category
  const getFilteredIcons = () => {
    let icons = iconCategories[selectedCategory as CategoryKey]?.icons || availableIcons;
    
    if (searchTerm) {
      icons = icons.filter(icon => 
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return icons;
  };

  const filteredIcons = getFilteredIcons();

  // Helper function to safely render icons with appropriate sizing
  const renderIconWithSize = (icon: React.ReactNode, size: number) => {
    const element = icon as React.ReactElement;
    
    // For Lucide icons, try to clone with size prop
    try {
      return React.cloneElement(element, { size } as Record<string, unknown>);
    } catch {
      // Fallback: return original element if cloning fails
      return element;
    }
  };

  const handleSave = () => {
    if (!label.trim()) {
      alert(t.enterLabel);
      return;
    }

    onSave({
      label: label.trim(),
      icon: selectedIcon.icon,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-400',
      soundFile: 'select.mp3'
    });
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-sm`}>
      <div className={`${isDarkMode ? 'bg-slate-800 text-white border-slate-600' : 'bg-white text-gray-900 border-gray-200'} rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 shadow-xl max-h-[90vh] flex flex-col`}>
        <h2 className="text-lg font-bold mb-4 text-center flex-shrink-0">{t.addCommunicationCard}</h2>
        
        {/* Label Input */}
        <div className="mb-6 flex-shrink-0">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className={`w-full px-3 py-2 sm:py-3 border rounded-lg text-center text-base sm:text-lg ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder={t.cardName}
          />
        </div>

        {/* Selected Icon Preview */}
        <div className="mb-6 flex-shrink-0">
          <p className="text-sm text-center mb-3 opacity-70">Selected Icon:</p>
          <div className="flex justify-center">
            <div className={`p-4 sm:p-6 rounded-xl border-2 border-blue-500 ${
              isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center">
                  {renderIconWithSize(selectedIcon.icon, 40)}
                </div>
                <span className="text-sm font-medium text-blue-600">{selectedIcon.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex-shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-sm ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Search icons..."
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {Object.entries(iconCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.icons.length})
              </button>
            ))}
          </div>
        </div>

        {/* Icon Selection */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <p className="text-sm text-center mb-3 opacity-70 flex-shrink-0">
            {filteredIcons.length} icons in {iconCategories[selectedCategory as CategoryKey]?.name || 'All'}
          </p>
          
          {/* Icon grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 max-h-64 overflow-y-auto p-2 border rounded-lg bg-opacity-50" style={{
            backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.5)'
          }}>
            {filteredIcons.map((iconOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedIcon(iconOption)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all hover:scale-110 group relative ${
                  selectedIcon.name === iconOption.name
                    ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                    : isDarkMode
                      ? 'border-slate-600 hover:border-slate-400 hover:bg-slate-700'
                      : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }`}
                title={iconOption.name}
              >
                <div className="flex items-center justify-center">
                  {renderIconWithSize(iconOption.icon, 24)}
                </div>
                
                {/* Icon name tooltip on hover */}
                <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 ${
                  isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
                }`}>
                  {iconOption.name}
                </div>
              </button>
            ))}
          </div>
          
          {filteredIcons.length === 0 && (
            <div className="text-center py-8 opacity-60">
              <p>No icons found matching &quot;{searchTerm}&quot;</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:underline text-sm mt-2"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 flex-shrink-0">
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-2 rounded-lg transition-all ${
              isDarkMode 
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSave}
            disabled={!label.trim()}
            className={`flex-1 px-4 py-2 rounded-lg transition-all ${
              !label.trim()
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {t.addCardButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationInterface;