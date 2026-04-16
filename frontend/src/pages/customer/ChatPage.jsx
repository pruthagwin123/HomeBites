import { useState } from 'react';
import SectionTitle from '../../components/common/SectionTitle';
import ChatWindow from '../../components/common/ChatWindow';
import { useAppStore } from '../../app/store/useAppStore';

function ChatPage() {
  const [chefId, setChefId] = useState('chef-1');
  const messages = useAppStore((state) => state.getChatMessages(chefId));
  const sendChatMessage = useAppStore((state) => state.sendChatMessage);
  const chefProfiles = useAppStore((state) => state.chefProfiles);

  return (
    <main className="space-y-6">
      <SectionTitle
        eyebrow="Live Chat"
        title="Chat directly with your chef"
        subtitle="Ask about spice level, delivery timing, or ingredient preferences."
      />

      <section className="rounded-2xl border border-orange-100 bg-white p-4">
        <label className="text-sm font-semibold text-slate-700">Select chef</label>
        <select
          value={chefId}
          onChange={(event) => setChefId(event.target.value)}
          className="mt-2 w-full rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none sm:max-w-sm"
        >
          {Object.values(chefProfiles).map((chef) => (
            <option key={chef.id} value={chef.id}>
              {chef.name} · {chef.kitchenName}
            </option>
          ))}
        </select>
      </section>

      <ChatWindow messages={messages} onSend={(text) => sendChatMessage({ chefId, senderRole: 'customer', text })} />
    </main>
  );
}

export default ChatPage;
