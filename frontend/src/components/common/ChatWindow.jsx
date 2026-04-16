import { useState } from 'react';

function ChatWindow({ messages, onSend }) {
  const [text, setText] = useState('');

  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
      <div className="mb-3 h-72 space-y-2 overflow-y-auto rounded-xl bg-orange-50/40 p-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.senderRole === 'customer' ? 'justify-end' : 'justify-start'}`}>
            <p
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                message.senderRole === 'customer' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>

      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!text.trim()) {
            return;
          }
          onSend(text);
          setText('');
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type your message"
          className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
        />
        <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}

export default ChatWindow;
