import React, { useState, useEffect } from 'react';

const SingularPluralGame = () => {
  const words = [
    { singular: 'כלב', plural: 'כלבים' },
    { singular: 'חתול', plural: 'חתולים' },
    { singular: 'ספר', plural: 'ספרים' },
    { singular: 'עפרון', plural: 'עפרונות' },
    { singular: 'כדור', plural: 'כדורים' },
    { singular: 'פרח', plural: 'פרחים' },
    { singular: 'עץ', plural: 'עצים' },
    { singular: 'ילד', plural: 'ילדים' },
    { singular: 'ילדה', plural: 'ילדות' },
    { singular: 'כוכב', plural: 'כוכבים' },
    { singular: 'דג', plural: 'דגים' },
    { singular: 'ציפור', plural: 'ציפורים' },
    { singular: 'בית', plural: 'בתים' },
    { singular: 'שולחן', plural: 'שולחנות' },
    { singular: 'כיסא', plural: 'כיסאות' }
  ];

  const [score, setScore] = useState(0);
  const [floatingWords, setFloatingWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [draggedWord, setDraggedWord] = useState(null);
  const [singularWords, setSingularWords] = useState([]);
  const [pluralWords, setPluralWords] = useState([]);

  useEffect(() => {
    if (gameStarted) {
      generateFloatingWords();
    }
  }, [gameStarted]);

  const generateFloatingWords = () => {
    const newWords = [];
    for (let i = 0; i < 12; i++) {
      const wordPair = words[Math.floor(Math.random() * words.length)];
      const isSingular = Math.random() > 0.5;
      newWords.push({
        id: i,
        text: isSingular ? wordPair.singular : wordPair.plural,
        type: isSingular ? 'singular' : 'plural',
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10
      });
    }
    setFloatingWords(newWords);
    setSingularWords([]);
    setPluralWords([]);
  };

  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropSingular = (e) => {
    e.preventDefault();
    if (draggedWord && draggedWord.type === 'singular') {
      setSingularWords(prev => [...prev, draggedWord]);
      setFloatingWords(prev => prev.filter(w => w.id !== draggedWord.id));
      setScore(prev => prev + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 500);
    }
    setDraggedWord(null);
  };

  const handleDropPlural = (e) => {
    e.preventDefault();
    if (draggedWord && draggedWord.type === 'plural') {
      setPluralWords(prev => [...prev, draggedWord]);
      setFloatingWords(prev => prev.filter(w => w.id !== draggedWord.id));
      setScore(prev => prev + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 500);
    }
    setDraggedWord(null);
  };

  const resetGame = () => {
    setScore(0);
    generateFloatingWords();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl">
          <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="#fbbf24" />
            <circle cx="75" cy="85" r="12" fill="#1f2937" />
            <circle cx="125" cy="85" r="12" fill="#1f2937" />
            <path d="M 70 120 Q 100 145 130 120" stroke="#1f2937" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
          <h1 className="text-5xl font-bold text-purple-600 mb-4">משחק יחיד ורבים! 🎉</h1>
          <p className="text-2xl text-gray-700 mb-8">גררו את המילים לתור הנכון!</p>
          <button 
            onClick={() => setGameStarted(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-3xl px-12 py-6 rounded-full font-bold hover:scale-110 transform transition shadow-lg"
          >
            בואו נתחיל! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 p-6 relative overflow-hidden">
      {/* Background decorations */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <circle cx="10%" cy="15%" r="40" fill="#fbbf24" />
        <circle cx="90%" cy="20%" r="30" fill="#ec4899" />
        <circle cx="85%" cy="80%" r="50" fill="#8b5cf6" />
        <circle cx="15%" cy="85%" r="35" fill="#3b82f6" />
        <polygon points="50,10 60,30 40,30" fill="#10b981" />
        <polygon points="150,180 165,200 135,200" fill="#f59e0b" />
        <star cx="30%" cy="50%" r="20" fill="#f472b6" />
      </svg>

      {/* Score */}
      <div className="absolute top-6 right-6 bg-white rounded-full px-8 py-4 shadow-lg z-10">
        <p className="text-3xl font-bold text-purple-600">ניקוד: {score} ⭐</p>
      </div>

      {/* Celebration */}
      {showCelebration && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce z-50">
          🎉
        </div>
      )}

      {/* Game containers */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Singular container */}
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDropSingular}
            className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl p-8 shadow-xl border-4 border-orange-400 min-h-[200px] transition-all hover:border-orange-500 hover:shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-orange-700 mb-4 text-center">יחיד 👤</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {singularWords.map(word => (
                <div key={word.id} className="bg-white px-6 py-3 rounded-full shadow-md text-2xl font-bold text-orange-600">
                  {word.text}
                </div>
              ))}
            </div>
          </div>

          {/* Plural container */}
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDropPlural}
            className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl p-8 shadow-xl border-4 border-purple-400 min-h-[200px] transition-all hover:border-purple-500 hover:shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-purple-700 mb-4 text-center">רבים 👥</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {pluralWords.map(word => (
                <div key={word.id} className="bg-white px-6 py-3 rounded-full shadow-md text-2xl font-bold text-purple-600">
                  {word.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating words area */}
        <div className="relative bg-white bg-opacity-30 rounded-3xl p-8 min-h-[400px] border-4 border-white shadow-xl">
          <h3 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">גררו את המילים! 👇</h3>
          {floatingWords.map(word => (
            <div
              key={word.id}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              style={{
                position: 'absolute',
                left: `${word.x}%`,
                top: `${word.y}%`,
              }}
              className={`px-6 py-3 rounded-full text-2xl font-bold shadow-lg transform hover:scale-110 transition cursor-move ${
                word.type === 'singular' 
                  ? 'bg-gradient-to-r from-yellow-300 to-orange-300 text-orange-700 hover:from-yellow-400 hover:to-orange-400' 
                  : 'bg-gradient-to-r from-blue-300 to-purple-300 text-purple-700 hover:from-blue-400 hover:to-purple-400'
              }`}
            >
              {word.text}
            </div>
          ))}
        </div>

        {/* Reset button */}
        <div className="text-center mt-8">
          <button 
            onClick={resetGame}
            className="bg-gradient-to-r from-green-400 to-teal-400 text-white text-2xl px-10 py-4 rounded-full font-bold hover:scale-110 transform transition shadow-lg"
          >
            משחק חדש! 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingularPluralGame;