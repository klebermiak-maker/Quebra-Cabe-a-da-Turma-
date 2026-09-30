import { Check, Copy, Crown, MessageSquare, Send, Sparkles, Trophy, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, GameMode, Player } from '../types/game';
import { playReactionSound } from '../utils/audio';

interface MultiplayerSidebarProps {
  roomId: string;
  mode: GameMode;
  players: Player[];
  currentPlayerId: string | null;
  messages: ChatMessage[];
  onSendMessage: (text: string, type?: 'chat' | 'reaction') => void;
  onLeaveRoom: () => void;
}

const QUICK_REACTIONS = [
  { emoji: '👏', label: 'Boa!' },
  { emoji: '🎉', label: 'Parabéns!' },
  { emoji: '💡', label: 'Achei uma!' },
  { emoji: '🚀', label: 'Vamos nessa!' },
  { emoji: '⭐', label: 'Demais!' },
  { emoji: '🤝', label: 'Trabalho em equipe!' },
];

export const MultiplayerSidebar: React.FC<MultiplayerSidebarProps> = ({
  roomId,
  mode,
  players,
  currentPlayerId,
  messages,
  onSendMessage,
  onLeaveRoom,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), 'chat');
    setInputText('');
  };

  const handleReaction = (item: { emoji: string; label: string }) => {
    playReactionSound();
    onSendMessage(`${item.emoji} ${item.label}`, 'reaction');
  };

  const copyRoomLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('room', roomId);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Sort players for leaderboard (in race mode by raceProgress/time, in coop by score)
  const sortedPlayers = [...players].sort((a, b) => {
    if (mode === 'race') {
      if (a.isFinished && b.isFinished) return (a.finishTime || 0) - (b.finishTime || 0);
      if (a.isFinished) return -1;
      if (b.isFinished) return 1;
      return b.raceProgress - a.raceProgress;
    }
    return b.score - a.score;
  });

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Room Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-3.5 bg-slate-50/80">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Sala da Turma</span>
            <span className="font-mono text-xs font-black tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
              {roomId}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {mode === 'coop' ? '🤝 Modo Cooperativo' : '🏁 Modo Corrida'} · {players.length}{' '}
            {players.length === 1 ? 'aluno conectado' : 'alunos conectados'}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={copyRoomLink}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors shadow-2xs"
            title="Copiar link da sala para a turma"
          >
            {copiedLink ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
            {copiedLink ? 'Copiado!' : 'Link'}
          </button>
          <button
            onClick={onLeaveRoom}
            className="rounded-lg px-2 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Players Progress / Scoreboard */}
      <div className="flex flex-col gap-2 p-3.5 border-b border-slate-100 max-h-56 overflow-y-auto bg-slate-50/30">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
          {mode === 'race' ? 'Classificação ao Vivo' : 'Colaboradores da Turma'}
        </span>

        <div className="flex flex-col gap-2">
          {sortedPlayers.map((player, idx) => {
            const isMe = player.id === currentPlayerId;
            return (
              <div
                key={player.id}
                className={`flex flex-col gap-1 rounded-xl p-2 border transition-all ${
                  isMe
                    ? 'border-amber-300 bg-amber-50/70 shadow-2xs'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm">{player.avatar}</span>
                    <span className="font-bold text-slate-800 truncate max-w-[120px]">
                      {player.name}
                      {isMe && <span className="ml-1 text-[10px] text-amber-700 font-semibold">(Você)</span>}
                    </span>
                    {player.isHost && (
                      <span title="Criador da sala" className="inline-flex">
                        <Crown className="h-3 w-3 text-amber-500 shrink-0" />
                      </span>
                    )}
                  </div>

                  {mode === 'race' ? (
                    <div className="flex items-center gap-1">
                      {player.isFinished ? (
                        <span className="font-bold text-emerald-600 text-[11px]">
                          🏆 {idx === 0 ? '1º Lugar!' : `${idx + 1}º Lugar`}
                        </span>
                      ) : (
                        <span className="font-semibold text-slate-600 text-[11px]">
                          {player.raceProgress}%
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="font-semibold text-slate-600 text-[11px]">
                      {player.score} {player.score === 1 ? 'peça' : 'peças'}
                    </span>
                  )}
                </div>

                {/* Progress bar in race mode */}
                {mode === 'race' && (
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        player.isFinished
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}
                      style={{ width: `${player.raceProgress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Classroom Reactions */}
      <div className="p-2 border-b border-slate-100 bg-slate-50/40">
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span className="text-[11px] font-bold text-slate-500">Reações Rápidas</span>
          <Sparkles className="h-3 w-3 text-amber-500" />
        </div>
        <div className="flex flex-wrap gap-1">
          {QUICK_REACTIONS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleReaction(item)}
              className="flex items-center gap-1 rounded-lg border border-slate-200/80 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all shadow-2xs"
            >
              <span>{item.emoji}</span>
              <span className="hidden sm:inline text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatScrollRef}
        className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto text-xs min-h-[160px]"
      >
        {messages.length === 0 ? (
          <p className="text-center text-slate-400 text-xs py-4">Nenhuma mensagem ainda.</p>
        ) : (
          messages.map((m) => {
            const isMe = m.senderId === currentPlayerId;
            const isSys = m.type === 'system';

            if (isSys) {
              return (
                <div
                  key={m.id}
                  className="rounded-lg bg-amber-50/60 border border-amber-200/40 p-2 text-center text-[11px] text-amber-900 font-medium leading-tight"
                >
                  <span className="mr-1">{m.senderAvatar}</span>
                  {m.text}
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-0.5">
                  {m.senderAvatar} {m.senderName}
                </span>
                <div
                  className={`rounded-xl px-3 py-1.5 max-w-[85%] leading-relaxed ${
                    m.type === 'reaction'
                      ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                      : isMe
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="flex items-center gap-1.5 p-2.5 border-t border-slate-100 bg-slate-50">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enviar mensagem para a turma..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-hidden"
          maxLength={100}
        />
        <button
          type="submit"
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-2xs"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
};
