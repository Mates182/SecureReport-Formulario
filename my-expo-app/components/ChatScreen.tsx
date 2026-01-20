import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente virtual de SecureReport. Puedo ayudarte con información sobre números de emergencia, ley de protección de datos y defensa del consumidor. ¿En qué puedo ayudarte?',
      isBot: true,
      timestamp: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const scrollViewRef = useRef<ScrollView>(null);

  // Base de conocimientos del bot
  const botResponses: { [key: string]: string } = {
    'números de emergencia': `📞 **Números de Emergencia:**

• 911 - Emergencias (Ecuador)
• 171 - Violencia contra la mujer
• 1800-DELITO - Denuncias anónimas
• 102 - Cruz Roja
• 103 - Bomberos

¿Necesitas información sobre algo más?`,

    'protección de datos': `🔒 **Ley Orgánica de Protección de Datos Personales:**

• Derecho a la privacidad y protección de datos personales
• Consentimiento para tratamiento de datos
• Derecho de acceso, rectificación y eliminación
• Deber de confidencialidad
• Sanciones por uso indebido de datos

En SecureReport garantizamos el anonimato total mediante cifrado de extremo a extremo y no almacenamos datos personales identificables.

¿Tienes alguna pregunta específica?`,

    'defensa del consumidor': `🛡️ **Ley Orgánica de Defensa del Consumidor:**

• Derecho a productos y servicios de calidad
• Derecho a la información veraz
• Derecho a la reparación o devolución
• Prohibición de publicidad engañosa
• Protección contra precios abusivos
• Derecho a presentar reclamos y denuncias

Puedes usar SecureReport para denunciar:
✓ Precios abusivos
✓ Mala calidad de productos
✓ Mal servicio al cliente
✓ Publicidad engañosa

¿Quieres saber cómo hacer una denuncia?`,

    'cómo hacer denuncia': `📝 **Cómo hacer una denuncia en SecureReport:**

1. Selecciona la categoría del problema
2. Completa el formulario guiado
3. Adjunta fotos o videos (opcional)
4. La ubicación se detecta automáticamente
5. Envía de forma anónima

Tu identidad está 100% protegida. No rastreamos:
• Dirección IP
• Datos personales
• Información del dispositivo

¿Necesitas ayuda con algo más?`,

    'categorías': `📋 **Categorías de denuncias:**

• Precios abusivos
• Mala calidad de productos
• Mal servicio al cliente
• Publicidad engañosa
• Incumplimiento de garantías
• Falta de información
• Otras irregularidades

¿Sobre qué categoría quieres información?`,

    anonimato: `🔐 **Garantía de Anonimato:**

SecureReport protege tu identidad mediante:

• Cifrado de extremo a extremo
• No registro de datos personales
• Sin rastreo de IP o ubicación exacta
• Comunicación segura
• Almacenamiento temporal de reportes

Tu seguridad es nuestra prioridad.

¿Tienes más preguntas sobre privacidad?`,

    ayuda: `💡 **Temas en los que puedo ayudarte:**

• Números de emergencia
• Protección de datos personales
• Defensa del consumidor
• Cómo hacer una denuncia
• Categorías de denuncias
• Garantía de anonimato
• Derechos del consumidor

Escribe sobre cualquier tema o pregunta específica.`,
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Buscar coincidencias en la base de conocimientos
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Palabras clave alternativas
    if (
      lowerMessage.includes('emergencia') ||
      lowerMessage.includes('llamar') ||
      lowerMessage.includes('teléfono')
    ) {
      return botResponses['números de emergencia'];
    }

    if (
      lowerMessage.includes('dato') ||
      lowerMessage.includes('privacidad') ||
      lowerMessage.includes('información personal')
    ) {
      return botResponses['protección de datos'];
    }

    if (
      lowerMessage.includes('consumidor') ||
      lowerMessage.includes('derecho') ||
      lowerMessage.includes('reclamo')
    ) {
      return botResponses['defensa del consumidor'];
    }

    if (lowerMessage.includes('denunc') || lowerMessage.includes('report')) {
      return botResponses['cómo hacer denuncia'];
    }

    if (lowerMessage.includes('categoría') || lowerMessage.includes('tipo')) {
      return botResponses['categorías'];
    }

    if (
      lowerMessage.includes('anónimo') ||
      lowerMessage.includes('segur') ||
      lowerMessage.includes('proteg')
    ) {
      return botResponses['anonimato'];
    }

    // Respuesta por defecto
    return `Puedo ayudarte con información sobre:

• 📞 Números de emergencia
• 🔒 Protección de datos
• 🛡️ Defensa del consumidor
• 📝 Cómo hacer denuncias

Escribe sobre cualquiera de estos temas o pregunta algo específico.`;
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simular respuesta del bot después de un breve delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date().toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const sendQuickReply = (text: string) => {
    setInputText(text);
    setTimeout(() => sendMessage(), 100);
  };

  useEffect(() => {
    // Auto scroll al final cuando hay nuevos mensajes
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top notch area with blue background */}
      <View 
        className="bg-blue-900" 
        style={{ height: insets.top, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}
      />
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View className="flex-row items-center bg-blue-900 px-6 py-4 shadow-sm">
          <Image
            source={{
              uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png',
            }}
            className="mr-3 h-12 w-12 rounded-full"
            resizeMode="contain"
          />
          <View className="flex-1">
            <Text className="text-xl font-semibold text-white">
              Asistente Virtual
            </Text>
            <Text className="text-xs text-white/90">
              Siempre disponible para ayudarte
            </Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-green-400" />
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 bg-slate-50 px-4"
          contentContainerStyle={{ paddingVertical: 16 }}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 ${message.isBot ? 'items-start' : 'items-end'}`}
            >
              <View
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.isBot
                    ? 'rounded-tl-sm bg-white'
                    : 'rounded-tr-sm bg-blue-900'
                }`}
              >
                <Text
                  className={`text-sm leading-5 ${message.isBot ? 'text-slate-800' : 'text-white'}`}
                >
                  {message.text}
                </Text>
              </View>
              <Text className="mt-1 px-1 text-xs text-slate-400">
                {message.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Quick Replies - Solo mostrar si es el primer mensaje */}
        {messages.length === 1 && (
          <View className="border-t border-slate-200 bg-white px-4 py-3">
            <Text className="mb-2 text-xs font-medium text-slate-600">
              Respuestas rápidas:
            </Text>
            <View className="flex-row flex-wrap gap-2">
              <TouchableOpacity
                onPress={() => sendQuickReply('Números de emergencia')}
                className="rounded-full border border-blue-900 bg-white px-4 py-2"
              >
                <Text className="text-sm text-blue-900">📞 Emergencias</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendQuickReply('Protección de datos')}
                className="rounded-full border border-blue-900 bg-white px-4 py-2"
              >
                <Text className="text-sm text-blue-900">🔒 Privacidad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendQuickReply('Defensa del consumidor')}
                className="rounded-full border border-blue-900 bg-white px-4 py-2"
              >
                <Text className="text-sm text-blue-900">🛡️ Derechos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendQuickReply('Cómo hacer denuncia')}
                className="rounded-full border border-blue-900 bg-white px-4 py-2"
              >
                <Text className="text-sm text-blue-900">📝 Denunciar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Input */}
        <View className="flex-row items-center border-t border-slate-200 bg-white px-4 py-3">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escribe tu pregunta..."
            placeholderTextColor="#94a3b8"
            className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-slate-800"
            onSubmitEditing={sendMessage}
            multiline
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
            className={`ml-2 h-12 w-12 items-center justify-center rounded-full ${
              inputText.trim() === '' ? 'bg-slate-300' : 'bg-blue-900'
            }`}
          >
            <Text className="text-xl text-white">⬆</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Bar */}
        <View className="bg-white border-t border-slate-200 py-3">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setActiveTab('inicio')}
              className="flex-1 items-center ml-2"
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/twxd10f7_expires_30_days.png' }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text className={`text-xs ${
                activeTab === 'inicio' ? 'text-indigo-900 font-bold' : 'text-slate-500'
              }`}>
                Inicio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('reportar')}
              className="flex-1 items-center"
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/211j0lmf_expires_30_days.png' }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text className={`text-xs ${
                activeTab === 'reportar' ? 'text-indigo-900 font-bold' : 'text-slate-500'
              }`}>
                Reportar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('reportes')}
              className="flex-1 items-center"
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/jvjhvsz2_expires_30_days.png' }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text className={`text-xs ${
                activeTab === 'reportes' ? 'text-indigo-900 font-bold' : 'text-slate-500'
              }`}>
                Reportes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('chat')}
              className={`flex-1 items-center rounded-2xl mr-4 py-2 ${
                activeTab === 'chat' ? 'bg-indigo-200' : 'bg-indigo-100'
              }`}
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png' }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text className="text-indigo-900 text-xs font-bold">Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('perfil')}
              className="mr-5 items-center"
            >
              <Image
                source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/7992ct08_expires_30_days.png' }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text className={`text-xs ${
                activeTab === 'perfil' ? 'text-indigo-900 font-bold' : 'text-slate-500'
              }`}>
                Perfil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
