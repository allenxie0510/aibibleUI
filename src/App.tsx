import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  User,
  ChevronDown,
  X,
  Send,
  Sparkles,
  Copy,
  Flame,
  Apple,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  Mic,
  Globe,
  Smile,
  ArrowUp,
  BookMarked,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- Types ---
type Screen = "login" | "read" | "profile" | "daily-verse";

// --- Mock Data ---
const BIBLE_TEXT = [
  { id: 14, text: "Just as Moses lifted up the snake in the wilderness, so the Son of Man must be lifted up," },
  { id: 15, text: "that everyone who believes may have eternal life in him.\"" },
  { id: 16, text: "For God so loved the world that he gave his one and only Son, that" },
  { id: 17, text: "For God did not send his Son into the world to condemn the world, but to save the world through him.", highlighted: true },
  { id: 18, text: "Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son." },
  { id: 19, text: "This is the verdict: Light has come into the world, but people loved darkness instead of light because their deeds were evil.", highlighted: true },
  { id: 20, text: "Everyone who does evil hates the light, and will not come into the light for fear that their deeds will be exposed." },
  { id: 21, text: "But whoever lives by the truth comes into the light, so that it may be seen plainly that what they have done has been done in the sight of God." }
];

const VERSES_OF_THE_DAY = [
  {
    id: 1,
    text: "Whoever believes in him is not condemned...",
    reference: "Exodus 16:1-36",
    color: "bg-gradient-to-br from-orange-100 to-rose-200"
  },
  {
    id: 2,
    text: "I am poor and needy; come quickly to me, O God. You ...",
    reference: "Psalms 70:5",
    color: "bg-gradient-to-br from-purple-100 to-rose-200"
  }
];

// --- Components ---

const BottomNav = ({ current, setScreen }: { current: Screen, setScreen: (s: Screen) => void }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t bg-white/90 px-6 pb-4 backdrop-blur-md">
    <button
      onClick={() => setScreen("read")}
      className={`flex flex-col items-center gap-1 transition-colors ${current === "read" ? "text-zinc-900" : "text-zinc-400"}`}
    >
      <div className={`rounded-2xl px-6 py-2 transition-all ${current === "read" ? "bg-zinc-100" : ""}`}>
        <BookOpen className="h-6 w-6" />
      </div>
      <span className="text-xs font-medium">Read</span>
    </button>
    <button
      onClick={() => setScreen("profile")}
      className={`flex flex-col items-center gap-1 transition-colors ${current === "profile" ? "text-zinc-900" : "text-zinc-400"}`}
    >
      <div className={`rounded-2xl px-6 py-2 transition-all ${current === "profile" ? "bg-zinc-100" : ""}`}>
        <User className="h-6 w-6" />
      </div>
      <span className="text-xs font-medium">Profile</span>
    </button>
  </div>
);

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-orange-50 to-white px-8">
    <div className="mb-12 text-center">
      <h1 className="mb-2 font-serif text-5xl font-bold text-rose-400">AI Faith</h1>
      <p className="text-zinc-500">Your AI faith companion</p>
    </div>

    <div className="relative mb-12">
      {/* Heart Character Placeholder */}
      <div className="flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl">
        <div className="text-6xl">💜</div>
      </div>
    </div>

    <Card className="w-full max-w-sm border-none bg-white/80 p-8 shadow-2xl backdrop-blur-xl rounded-[40px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-600">Your Email Address</label>
          <Input
            placeholder="name@example.com"
            className="h-14 rounded-2xl border-zinc-100 bg-zinc-50 px-4 text-lg focus-visible:ring-rose-200"
          />
        </div>

        <Button
          onClick={onLogin}
          className="h-14 w-full rounded-full bg-[#0F172A] text-lg font-semibold hover:bg-zinc-800"
        >
          Continue with Email
        </Button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-zinc-100"></div>
          <span className="mx-4 flex-shrink text-xs font-medium uppercase tracking-widest text-zinc-400">
            Or connect with
          </span>
          <div className="flex-grow border-t border-zinc-100"></div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="h-14 w-full rounded-full border-zinc-100 bg-white text-lg font-medium shadow-sm">
            <Apple className="mr-2 h-5 w-5" /> Apple
          </Button>
          <Button variant="outline" className="h-14 w-full rounded-full border-zinc-100 bg-white text-lg font-medium shadow-sm">
            <img src="https://www.google.com/favicon.ico" className="mr-2 h-5 w-5" alt="Google" /> Google
          </Button>
        </div>

        <div className="pt-4 text-center text-sm">
          <span className="text-zinc-400">New to The Sanctuary? </span>
          <button className="font-semibold text-zinc-900">Create an account</button>
        </div>
      </div>
    </Card>
  </div>
);

const ReadingScreen = ({ 
  onOpenChat, 
  onOpenSelector,
  currentBook,
  currentChapter
}: { 
  onOpenChat: () => void, 
  onOpenSelector: () => void,
  currentBook: string,
  currentChapter: number
}) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-40">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/80 px-6 backdrop-blur-md">
        <div className="w-10" />
        <button
          onClick={onOpenSelector}
          className="flex items-center gap-1 text-xl font-bold text-zinc-900"
        >
          {currentBook} {currentChapter} <ChevronDown className="h-5 w-5" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100">
          <Menu className="h-6 w-6 text-zinc-400" />
        </button>
      </header>

      {/* Bible Content */}
      <div className="container mx-auto max-w-2xl px-6 py-8">
        <div className="space-y-6 leading-relaxed">
          {BIBLE_TEXT.map((verse) => (
            <p
              key={verse.id}
              className={`relative text-xl font-medium text-zinc-800 ${verse.highlighted ? "border-b-2 border-dotted border-blue-400" : ""}`}
              onClick={() => verse.highlighted && setShowContextMenu(!showContextMenu)}
            >
              <span className="mr-3 text-sm font-bold text-zinc-300">{verse.id}</span>
              {verse.text}

              {verse.highlighted && showContextMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white p-1 shadow-2xl ring-1 ring-zinc-100"
                >
                  <Button variant="ghost" size="sm" className="rounded-full px-4 font-semibold">
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                  <div className="h-4 w-px bg-zinc-200" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full px-4 font-semibold text-rose-500"
                    onClick={onOpenChat}
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> AI Insight
                  </Button>
                </motion.div>
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Floating Chat Input */}
      <div className="fixed bottom-24 left-6 right-6 z-40">
        <div className="flex items-center gap-3 rounded-[32px] bg-white p-2 shadow-2xl ring-1 ring-zinc-100">
          <div className="flex h-10 w-10 items-center justify-center text-rose-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <Input
            placeholder="Ask a question ..."
            className="border-none bg-transparent text-lg shadow-none focus-visible:ring-0"
          />
          <Button size="icon" className="h-12 w-12 rounded-2xl bg-zinc-900">
            <ArrowUp className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-40 left-6 right-6 flex justify-between pointer-events-none">
        <Button size="icon" variant="outline" className="h-14 w-14 rounded-full bg-white/80 shadow-lg pointer-events-auto">
          <ChevronLeft className="h-8 w-8 text-zinc-400" />
        </Button>
        <Button size="icon" variant="outline" className="h-14 w-14 rounded-full bg-white/80 shadow-lg pointer-events-auto">
          <ChevronRight className="h-8 w-8 text-zinc-400" />
        </Button>
      </div>
    </div>
  );
};

const ChapterSelector = ({ 
  open, 
  onOpenChange,
  onSelectChapter
}: { 
  open: boolean, 
  onOpenChange: (o: boolean) => void,
  onSelectChapter: (book: string, chapter: number) => void
}) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent side="bottom" className="h-[85vh] rounded-t-[40px] border-none bg-zinc-50 p-0">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-6 py-6">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-200">
            <Menu className="h-6 w-6 text-zinc-400" />
          </button>
          <h2 className="text-2xl font-bold">Books</h2>
          <button onClick={() => onOpenChange(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-200">
            <X className="h-6 w-6 text-zinc-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"].map((book, bookIdx) => (
              <AccordionItem
                key={book}
                value={`item-${bookIdx}`}
                className="rounded-3xl border-none bg-white px-6 shadow-sm"
              >
                <AccordionTrigger className="py-6 text-xl font-bold hover:no-underline">
                  {book}
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Select Chapter</span>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => {
                            onSelectChapter(book, chapter);
                            onOpenChange(false);
                          }}
                          className={`flex aspect-square items-center justify-center rounded-xl text-lg font-semibold transition-all bg-zinc-100 text-zinc-900 hover:bg-zinc-200`}
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const AIChatModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your Bible AI assistant. How can I help you explore the Word today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are a helpful and insightful Bible assistant. Provide spiritual guidance, historical context, and encouragement based on the Bible. Keep responses concise and warm.",
        },
      });

      const aiResponse = response.text || "I'm sorry, I couldn't generate a response right now.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to my spiritual wisdom right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-[40px] border-none bg-zinc-50 p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-200">
              <Menu className="h-6 w-6 text-zinc-400" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-400" />
              <h2 className="text-2xl font-bold">AI Insight</h2>
            </div>
            <button onClick={() => onOpenChange(false)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-200">
              <X className="h-6 w-6 text-zinc-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-[32px] px-6 py-4 shadow-sm ${
                  msg.role === "user" 
                    ? "bg-zinc-900 text-white" 
                    : "bg-rose-50 text-zinc-800"
                }`}>
                  <p className="text-lg leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-[32px] bg-rose-50 px-6 py-4 text-zinc-500 italic shadow-sm">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Area */}
          <div className="bg-white p-6 pb-12">
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button 
                variant="outline" 
                className="rounded-2xl border-zinc-100 px-6 py-6 text-base font-semibold whitespace-nowrap"
                onClick={() => setInput("Can you explain this verse?")}
              >
                <BookMarked className="mr-2 h-5 w-5 text-zinc-400" /> Interpretation
              </Button>
              <Button 
                variant="outline" 
                className="rounded-2xl border-zinc-100 px-6 py-6 text-base font-semibold whitespace-nowrap"
                onClick={() => setInput("Please pray for me.")}
              >
                <Heart className="mr-2 h-5 w-5 text-zinc-400" /> Pray for you
              </Button>
            </div>
            <div className="flex items-center gap-3 rounded-[32px] bg-zinc-50 p-2 ring-1 ring-zinc-100">
              <Input
                placeholder="Ask a question ..."
                className="border-none bg-transparent text-lg shadow-none focus-visible:ring-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button 
                size="icon" 
                className="h-12 w-12 rounded-2xl bg-zinc-900"
                onClick={handleSend}
                disabled={isLoading}
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ProfileScreen = ({ onOpenVerse }: { onOpenVerse: () => void }) => (
  <div className="min-h-screen bg-zinc-50 pb-32">
    <div className="flex flex-col items-center pt-20 pb-12">
      <div className="relative mb-6">
        <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop" />
          <AvatarFallback>ET</AvatarFallback>
        </Avatar>
        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-zinc-100">
          <Copy className="h-4 w-4 text-zinc-400" />
        </button>
      </div>
      <h2 className="mb-2 text-4xl font-bold text-zinc-900">Elias Thorne</h2>
      <Badge variant="secondary" className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-bold text-zinc-900">
        <Flame className="mr-2 h-4 w-4 text-orange-500" /> 14 Day Streak
      </Badge>
    </div>

    <div className="px-6 space-y-6">
      {VERSES_OF_THE_DAY.map((verse) => (
        <Card
          key={verse.id}
          className="overflow-hidden border-none shadow-sm rounded-[32px] cursor-pointer active:scale-[0.98] transition-transform"
          onClick={onOpenVerse}
        >
          <div className={`h-40 p-8 ${verse.color}`}>
            <div className="flex justify-between items-start mb-4">
              <BookOpen className="h-6 w-6 text-zinc-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Verse of the Day</span>
            </div>
            <p className="text-2xl font-serif font-medium leading-tight text-zinc-800 line-clamp-2">
              {verse.text}
            </p>
          </div>
          <CardContent className="bg-white p-6">
            <span className="text-lg font-medium text-zinc-400">{verse.reference}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const DailyVerseScreen = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white p-6"
  >
    <button
      onClick={onClose}
      className="absolute top-12 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400"
    >
      <X className="h-6 w-6" />
    </button>

    <div className="w-full max-w-lg aspect-[3/4] rounded-[48px] bg-gradient-to-b from-rose-50 via-orange-50 to-rose-200 p-12 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl">
      {/* Decorative Flame Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10">
        <Flame className="h-64 w-64 text-orange-500" />
      </div>

      <div className="w-full flex justify-between items-center z-10">
        <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Fri Mar 27</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Verse of the Day</span>
      </div>

      <div className="z-10 space-y-6">
        <p className="text-4xl font-serif font-medium leading-tight text-zinc-800 italic">
          Whoever <span className="text-orange-400">believes in him</span> is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.
        </p>
      </div>

      <div className="z-10 flex flex-col items-center gap-4">
        <div className="h-24 w-24 flex items-center justify-center opacity-20">
          <Flame className="h-full w-full text-orange-500" />
        </div>
        <span className="text-xl font-medium text-zinc-400">Exodus 16:1-36</span>
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState("John");
  const [currentChapter, setCurrentChapter] = useState(3);

  const handleLogin = () => setScreen("read");

  return (
    <div className="relative mx-auto max-w-md overflow-hidden bg-zinc-50 shadow-2xl">
      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        )}

        {screen === "read" && (
          <motion.div
            key="read"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReadingScreen
              onOpenChat={() => setIsChatOpen(true)}
              onOpenSelector={() => setIsSelectorOpen(true)}
              currentBook={currentBook}
              currentChapter={currentChapter}
            />
            <BottomNav current="read" setScreen={setScreen} />
          </motion.div>
        )}

        {screen === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileScreen onOpenVerse={() => setScreen("daily-verse")} />
            <BottomNav current="profile" setScreen={setScreen} />
          </motion.div>
        )}

        {screen === "daily-verse" && (
          <motion.div
            key="daily-verse"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <DailyVerseScreen onClose={() => setScreen("profile")} />
          </motion.div>
        )}
      </AnimatePresence>

      <ChapterSelector 
        open={isSelectorOpen} 
        onOpenChange={setIsSelectorOpen}
        onSelectChapter={(book, chapter) => {
          setCurrentBook(book);
          setCurrentChapter(chapter);
        }}
      />
      <AIChatModal open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}
