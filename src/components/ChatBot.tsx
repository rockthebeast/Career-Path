import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, ImagePlus, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-chat`;

const suggestedQuestions = [
  "Which career suits me?",
  "Best careers after 12th Science?",
  "What skills should I learn?",
  "Government job options?",
];

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

export function ChatBot() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVoiceResult = useCallback((transcript: string) => {
    setInput((prev) => prev + (prev ? " " : "") + transcript);
  }, []);

  const handleVoiceError = useCallback((error: string) => {
    if (error === "not-allowed") {
      toast.error("Microphone access denied. Please enable it in your browser settings.");
    } else if (error === "no-speech") {
      toast.info("No speech detected. Please try again.");
    }
  }, []);

  const {
    isListening,
    isSupported: isSpeechSupported,
    toggleListening,
  } = useSpeechRecognition({
    language: i18n.language,
    onResult: handleVoiceResult,
    onError: handleVoiceError,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[], imageData?: string) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: userMessages.map((m) => ({ role: m.role, content: m.content })),
        image: imageData,
        language: i18n.language,
      }),
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image too large. Please select an image under 4MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const sendMessage = async (messageText: string) => {
    if ((!messageText.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: messageText.trim() || (selectedImage ? "Please analyze this image." : ""),
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const imageToSend = selectedImage;
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    try {
      await streamChat([...messages, userMsg], imageToSend || undefined);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg",
          "bg-gradient-primary hover:opacity-90 transition-all duration-300",
          isOpen && "rotate-90"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] animate-scale-in">
          <div className="bg-background border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[70vh]">
            {/* Header */}
            <div className="bg-gradient-primary p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">Career Guide AI</h3>
                <p className="text-xs text-primary-foreground/80">Voice & image support enabled!</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Hi! 👋 I'm your career guidance assistant. Ask me anything via text, voice, or upload an image!
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Try asking:</p>
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full text-left text-sm p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-2",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        )}
                      >
                        {msg.image && (
                          <img
                            src={msg.image}
                            alt="Uploaded"
                            className="max-w-full rounded-lg mb-2 max-h-32 object-cover"
                          />
                        )}
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Image Preview */}
            {imagePreview && (
              <div className="px-4 pb-2">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-lg border"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
              <div className="flex gap-2 items-center">
                {/* Image Upload Button */}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="flex-shrink-0"
                  title="Upload image"
                >
                  <ImagePlus className="h-5 w-5 text-muted-foreground" />
                </Button>

                {/* Voice Button */}
                {isSpeechSupported && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={toggleListening}
                    disabled={isLoading}
                    className={cn(
                      "flex-shrink-0 transition-colors",
                      isListening && "bg-destructive/10 text-destructive"
                    )}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? (
                      <MicOff className="h-5 w-5 animate-pulse" />
                    ) : (
                      <Mic className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                )}

                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask about careers..."}
                  disabled={isLoading}
                  className={cn("flex-1", isListening && "border-destructive")}
                />

                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || (!input.trim() && !selectedImage)}
                  className="flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Voice indicator */}
              {isListening && (
                <p className="text-xs text-destructive mt-2 text-center animate-pulse">
                  🎤 Listening... Speak now
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
