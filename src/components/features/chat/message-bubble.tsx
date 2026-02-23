import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/api/chat";

export function MessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div
      className={cn(
        "flex",
        msg.sender === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          msg.sender === "user"
            ? "bg-coral text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 shadow-[var(--shadow-soft)] rounded-bl-md"
        )}
      >
        <p>{msg.text}</p>
        <p
          className={cn(
            "text-[10px] mt-1",
            msg.sender === "user" ? "text-white/70" : "text-gray-400"
          )}
        >
          {msg.time}
        </p>
      </div>
    </div>
  );
}
